# Promises/A+ tests for Test262

Version: 0.0.0 (2014-Jul-24)

The [Promises/A+ spec](https://github.com/promises-aplus/promises-spec) is a standard for JavaScript promises.  Although Promises/A+ is not formally part of ECMA-262 version 6.0, Promises/A+ informed the development of the Promises portion of ECMAScript 6.0, and a conformant ECMAScript 6.0 `Promise` implementation objects should conform to Promises/A+.

This directory contains a version of the [Promises/A+ test suite](https://github.com/promises-aplus/promises-tests) ported to the test framework used in the ECMA's Test262 project.

```
    promise.then(function expectFulfilled() {
        fulfilledCount += 1;
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);
```


## Difficulties

#### Cannot Use `setTimeout()` for Delay or Timeout

The Promises/A+ test suite uses the `setTimeout` function in two ways: sometimes to delay an operation, and sometimes as a timeout. In Test262, `setTimeout` is not available. Delays must be established using Promises, and timeouts are handled by the test runner.

#### No Assertion Libraries, Limited Test Helpers 

The Promises/A+ test suite runs in a node.js environment and makes use of several core node or npm-published modules: assert, sinon, mocha.  These are not available to Test262.

The Promises/A+ test suite uses three helper files: `testThreeCases`, `thenables`, `reasons` to generate many of its tests.  In Test262, using helpers is discouraged.  The goal for this translation is to have only one helper.

#### Assertion-swallowing

Exceptions thrown within `onFulfilled` and `onRejected` handlers are converted into rejections which are passed along the promise chain.  It is important to ensure that any code which could throw or which runs a test assertion is able to put the exception into a promise chain that leads to Test262's `$DONE` function.

#### Test Generation

The Promises/A+ test suite contains 872 tests, many generated at runtime.  Test262 requires each test to be defined in a separate file.

## Approach

My initial approach is to try to solve the setTimeout and assertion problems manually.  Once I have an adequate manual solution for translating tests from Promises/A+ to the Test262 idiom, then I will tackle generating Test262 tests for each generated Promises/A+ test.

### Deferred

Promises/A+ does not test the full ES6 promise behavior, but rather provides strict requirements on `promise` and `thenable` objects that conform to its specification.  The Promises/A+ tests expect that the implementation under test will provide [an adapter](https://github.com/promises-aplus/promises-tests#adapters) that will return `promise` objects to test.  In particular, the adapter must provide a function named `deferred` that returns an object:

```js
{
   promise: p, // a new promise in the pending state
   resolve: function (value) { // resolves the promise with <b>value</b> },
   reject:  function (reason) { // rejects the promise with **reason** }
}
```

To simplify translation of the tests, I have created a helper file `promises-aplus.js` containing a [`deferred()` function](https://github.com/smikes/test262/blob/promises-aplus-tests-1/test/harness/promises-aplus.js#L3) that returns an object conforming to this interface.

The object returned by the Test262 version of `deferred` also has a `then` method which delegates to the promise's `then` method.  Thus in the Test262 harness, the return value of `deferred()` is also a `thenable`.  This is for convenience;  the returned object can be used in place of the promise wherever a `thenable` is required.

```
var d = deferred();

// these two are equivalent
d.then(func);
d.promise.then(func);
```

### Sequence-Point Promises

In order to support sequencing of operations in the absence of `setTimeout`, I use an array of "sequence-point" promises.  For example, in order to ensure that `funcA` is asynchronously called after `funcB`, I could use the following code:

```
// 'a' is an array of sequence-point promises
var a = [deferred(), deferred()];

// call funcA, then resolve a[1] ..
a[0].then(function () {
    funcA();
    a[1].resolve();
});

// .. which will then call funcB
a[1].then(function () {
    funcB();
});

// kick off the whole sequence
a[0].resolve();

```

There are, of course, many ways that this could be arranged, but this one provides a reasonable amount of flexibility while still being simple to implement.

### Completing the Async Test

In order to ensure that all sequence points of a test have been hit, I create another promise (the `All` promise) by calling `Promise.all` on the array of sequence-point promises.  The Test262 `$DONE` function will be called from the `then` of the `All` promise.

In addition, I require that all sequence-point promises settle by calling `resolve` with a falsy value.  If one of the sequence-point promises settles with `reject`, the `All` promise will reject, and the test case will fail immediately.  

If one of the sequence-point promises settles with `resolve` and a truthy value, the test case will fail eventually.  In the `then` handler of the `All` promise, the truthy value will be converted into an exception, and the `All` promise will call `$DONE` with the exception, causing the test case to fail.

Since the sequence-point promises and the `All` promise have strict requirements about how they are resolved,
they are not suitable for testing.  Tests should be written about other promises generated with the `deferred()` function.  The convention I have adopted is that sequence-point promises are stored in an array named `a` and promises whose properties are being tested are named `promise` or `promise1`, `promise2` etc.

### Assertions

Although assertions and test failures can be signaled by rejecting a sequence-point promise, it is also desirable to call an assertion function before ending the test.  There is a hook in the `All` promise's resolution function for calling a test-specific assertion function.  The assertion function is called after checking the sequence-point resolutions array.  To signal test failure, this function should throw an exception, for example by calling the Test262 `$ERROR` function.  The return value of the assertion function is ignored.

### Helper Function `makeSequenceArray`

There is a helper function which creates an array of sequence points, sets up the `All` promise, and installs the test-specific assertion function.  It is currently called [`makeSequenceArray`](https://github.com/smikes/test262/blob/promises-aplus-tests-1/test/harness/promises-aplus.js#L44):

```
/***
 * @param {Number} n Number of sequence-point promises to create
 * @param {Function} done(arg) Function to call on completion
 * @param arg Argument to done function; if truthy, test fails
 * @param {Function} additionalAssertions (optional) function to call after all sequence points
 */
function makeSequenceArray(n, done, additionalAssertions) {
```

This function creates an array of sequence-point promises containing `n` deferreds.  It creates an `All` promise by calling `Promise.all` on the array.  When resolved, the `All` Promise will check all sequence-point promise resolutions, call the `additionalAssertions` function (if supplied), and finally call the `done` function.  If the `All` promise is rejected, the `done` function will be called immediately to signal failure.

An example of using `makeSequenceArray` can be found is used in the A+ tests that have been manually created, e.g., [`Aplus_2.1.2.1_A1.1_T6`](https://github.com/smikes/test262/blob/promises-aplus-tests-1/test/suite/promises-aplus/2.1.2.1/Aplus_2.1.2.1_A1.1_T5.js#L23)  

### Full Example Test

```
/// Copyright 2014 Ecma International. All rights reserved.

/**
 * Promises/A+ 2.1.2.1 When fulfilled, a promise must not transition to any other state
 *
 * @description delayed fulfilled-then-rejected promise does not transition
 * @author Sam Mikes
 */

/*global $INCLUDE, $ERROR, $DONE, makeSequenceArray, Test262Error*/
$INCLUDE('promises-aplus.js');

var fulfilledCount = 0;

function fulfilledOnce() {
    if (fulfilledCount !== 1) {
        $ERROR("Expected fulfilledCount === 1, actually " + fulfilledCount);
    }
}

var promise = deferred();

var a = makeSequenceArray(1, $DONE, fulfilledOnce);

a[0].then(function () {
    promise.then(function expectFulfilled() {
        fulfilledCount += 1;
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);

}).then(function () {
    // deferred resolve-reject
    promise.resolve();
    promise.reject(new Test262Error('Unexpected rejection'));
});

a[0].resolve();

```

## Overview of Promises/A+ Tests

There are 872 Promises/A+ tests covering the Promises/A+ spec. The section numbers of the tests correspond to the spec as follows:

 -  2.1 Promise States
 -  2.2 The `then` Method
 -  2.3 The Promise Resolution Procedure

Thus the tests in section 2.2.1 cover point 1. of the Promises/A+ spec section ["The `then` method"](https://github.com/promises-aplus/promises-spec#the-then-method). 

In the `Notes` column of the table below, I identify places where tests are generated by the interaction of two (or three) lists of criteria.  

For example, the Promises/A+ helper function `testFulfilled` generates three tests.  In section 2.2.6.1, five cases are each passed through `testFullfilled` for a total of 5 x 3 = 15 tests.

In section 2.3.3.3.1c, 392 tests are generated through the interaction of three lists, (7 x 14 x 4 = 392).  This accounts for nearly half of the Promises/A+ test suite. 

### Table of Tests By Section

Section | Subsection | Tests | Notes
--------|------------|-------|-------
2.1.2 |-| 6 |
2.1.3 |-| 6 |
2.2.1 |-| 20 | non-functions (5) x cases (4)
2.2.2 |-| 11 |
-|2.2.2.1 | 3 | {already,immediately,eventually} (3)
-|2.2.2.2 | 2 | {delay,never} (2)
-|2.2.2.3 | 6 | cases(6)
2.2.3 |-| 11 |
-|2.2.3.1 | 3 | {already,immediately,eventually} (3)
-|2.2.3.2 | 2 | {delay,never} (2)
-|2.2.3.3 | 6 | cases(6)
2.2.4 |-| 16 |
-|2.2.4a | 6 | (testFulfilled (3) + testRejected(3))
-|2.2.4b | 5 | cases(5)
-|2.2.4c | 5 | cases(5)
2.2.5 |-| 4 |
2.2.6 |-| 30 |
-|2.2.6.1 | 15 | cases (5) x testFulfilled (3)
-|2.2.6.1 | 15 | cases (5) x testFulfilled (3)
2.2.7 |-| 104 |
-| 2.2.7.0 | 1 
-| 2.2.7.1 | 1
-| 2.2.7.2 | 66 | reasons (11) x (testFullfilled (3) + testRejected (3))
-| 2.2.7.3 | 18 | nonFunctions (6) x testFulfilled (3)
-| 2.2.7.4 | 18 | nonFunctions (6) x testRejected (3)
2.3.1 |-| 2 |
2.3.2 |-| 10  |
-| 2.3.2.1 | 2 |
-| 2.3.2.2 | 4 | {already,eventually} (2) x {fulfilled, rejected} (2)
-| 2.3.2.3 | 4 | {already,eventually} (2) x {fulfilled, rejected} (2)
2.3.3 |-| 610 | whole section total (2.3.3)
-| 2.3.3.1 | 6 | testPromiseResolution (2) x cases (3)
-| 2.3.3.2 | 22 | testPromiseResolution (2) x reasons (11)
-| 2.3.3.3 | 4 | testPromiseResolution (2) x cases (2)
-| 2.3.3.3.1 | 472 | subsection subtotal (2.3.3.1)
-| 2.3.3.3.1a | 24 | testCallingResolvePromiseFulfillsWith (4) x objects (6)
-| 2.3.3.3.1b | 56 | testCallingResolvePromiseFulfillsWith (4) x thenables (14)
-| 2.3.3.3.1c | 392 | thenables-fulfilled (7) x thenables (14) x testCallingResolvePromise{Fulfills,Rejects}With (4)
-| 2.3.3.3.2 | 44 | reasons (11) x testCallingRejectPromiseRejectsWith (4)
-| 2.3.3.3.3 | 34 | 17 cases (17) x testPromiseResolution(2)
-| 2.3.3.3.4.1 | 12 | 6 cases (6) x testPromiseResolution(2)
-| 2.3.3.3.4.2 | 6 |  3 cases (3) x testPromiseResolution(2)
-| 2.3.3.4 | 10 | testPromiseResolution (2) x nonFunctions (5)
2.3.4 | - | 42 | 7 cases (7) x (testFulfilled (3) + testRejected (3))
Total || 872 |

## Versions

This document references [version 1.1.1 of the Promises/A+ spec](https://github.com/promises-aplus/promises-spec/commit/669f6a6bb56bf45bf99cb97e742d07b8f0d60d93) and [version 2.0.4 of the Promises/A+ test suite](https://github.com/promises-aplus/promises-tests/commit/b4be92c227edb14285a1470156e6fcacafc41032)

## References

