# Promises/A+ tests for Test262

The [Promises/A+ spec](https://github.com/promises-aplus/promises-spec) is a standard for JavaScript promises.  Although Promises/A+ is not formally part of ECMA-262 version 6.0, Promises/A+ informed the development of the Promises portion of ECMAScript 6.0.  ECMAScript 6.0 `Promise` objects should conform to Promises/A+.  

This directory contains a version of the [Promises/A+ test suite](https://github.com/promises-aplus/promises-tests) ported to the test framework used in the ECMA's Test262 project.

# Difficulties

## Cannot use setTimeout() for delay

The Promises/A+ test suite sometimes uses the `setTimeout` function to delay an operation.  In Test262 `setTimeout` is not available, and delays must be established using Promises.

## Cannot use setTimeout() for timeout

The Promises/A+ test suite sometimes uses the `setTimeout` function as a timeout.  In Test262 `setTimeout` is not available, and timeouts are handled by the test runner.

## Cannot use assertion libraries 

  The Promises/A+ test suite runs in a node.js environment and makes use of several core node or npm-published modules: assert, sinon, mocha.  These are not available to Test262.

## Test Generation

The Promises/A+ test suite contains 872 tests, many generated at runtime.  Test262 requires each test to be defined in a separate file.

## Test Helpers

The Promises/A+ test suite uses three helper files: `testThreeCases`, `thenables`, `reasons` to generate many of its tests.  In Test262, using helpers is discouraged.

## Assertion-swallowing

Because promise-related code often runs asynchronously on a clean stack, thrown exceptions are converted into rejections which are passed along the promise chain.  It is important to ensure that any code which could throw or which runs a test assertion is able to put that assertion into a promise chain that leads to Test262's `$DONE` function.

# Approach

My initial approach is to try to solve the setTimeout and assertion problems manually.  Once I have an adequate manual solution for translating tests from Promises/A+ to the Test262 idiom, then I will tackle generating Test262 tests.

## Deferred

Promises/A+ does not test the full ES6 promise behavior, but rather provides strict requirements on `promise` and `thenable` objects that conform to its specification.  The Promises/Aplus tests expect that the implementation under test will provide [an adapter](https://github.com/promises-aplus/promises-tests#adapters) that will return `promise` objects to test.  In particular, the adapter must provide a function named `deferred` that returns an object:

```js
{
   promise: p, // a new promise in the pending state
   resolve: function (value) { // resolves the promise with <b>value</b> },
   reject:  function (reason) { // rejects the promise with **reason** }
}
```

To simplify translation of the tests, I have created a helper file `promises-aplus.js` containing a [`deferred()` function](https://github.com/smikes/test262/blob/promises-aplus-tests-1/test/harness/promises-aplus.js#L3) that returns an object conforming to this interface.

The Test262 version of `deferred` also has a `then` method which delegates to `p.then`.  Thus in the Test262 harness, the return value of `deferred()` is also a `thenable`.  This is for convenience;  the returned object can be used in place of the promise whever a `thenable` is required.


## Sequencing



# Overview of Promises/Aplus Tests


Section | Subsection | Tests | Notes
--------|------------|-------|-------
2.1.2 | 6 ||
2.1.3 | 6 ||
2.2.1 | 20 || non-functions (5) x cases (4)
2.2.2 || 11 |
-|2.2.2.1 | 3 | {already,immediately,eventually} (3)
-|2.2.2.2 | 2 | {delay,never} (2)
-|2.2.2.3 | 6 | cases(6)
2.2.3 || 11 |
-|2.2.3.1 | 3 | {already,immediately,eventually} (3)
-|2.2.3.2 | 2 | {delay,never} (2)
-|2.2.3.3 | 6 | cases(6)
2.2.4 || 16 |
-|2.2.4a | 6 | (testFulfilled (3) + testRejected(3))
-|2.2.4b | 5 | cases(5)
-|2.2.4c | 5 | cases(5)
2.2.5 || 4 |
2.2.6 || 30 |
-|2.2.6.1 | 15 | cases (5) x testFulfilled (3)
-|2.2.6.1 | 15 | cases (5) x testFulfilled (3)
2.2.7 || 104 |
-|| 1 | no subsection
-| 2.2.7.1 | 1
-| 2.2.7.2 | 66 | reasons (11) x (testFullfilled (3) + testRejected (3))
-| 2.2.7.3 | 18 | nonFunctions (6) x testFulfilled (3)
-| 2.2.7.4 | 18 | nonFunctions (6) x testRejected (3)
2.3.1 || 2 |
2.3.2 || 10  |
-| 2.3.2.1 | 2 |
-| 2.3.2.2 | 4 | {already,eventually} (2) x {fulfilled, rejected} (2)
-| 2.3.2.3 | 4 | {already,eventually} (2) x {fulfilled, rejected} (2)
2.3.3 || 610 | whole section total (2.3.3)
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
2.3.4 | 42 || 7 cases (7) x (testFulfilled (3) + testRejected (3))
Total | 872 ||
