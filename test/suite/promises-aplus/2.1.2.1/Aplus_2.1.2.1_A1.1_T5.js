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

var d = deferred();

var a = makeSequenceArray(1, $DONE, fulfilledOnce);

a[0].promise.then(function () {
    d.promise.then(function expectFulfilled() {
        fulfilledCount += 1;
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);

}).then(function () {
    // deferred resolve-reject
    d.resolve();
    d.reject(new Test262Error('Unexpected rejection'));
});

a[0].resolve();
