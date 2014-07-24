/// Copyright 2014 Ecma International. All rights reserved.

/**
 * Promises/A+ 2.1.2.1 When fulfilled, a promise must not transition to any other state
 *
 * @description fulfilled-immediately then delay-rejected promise does not transition
 * @author Sam Mikes
 */

/*global $INCLUDE, $ERROR, $DONE, makeSequenceArray, Test262Error*/
$INCLUDE('promises-aplus.js');

var fulfilledCount = 0,
    triedRejection = false;

function fulfilledOnce() {
    if (fulfilledCount !== 1) {
        $ERROR("Expected fulfilledCount === 1, actually " + fulfilledCount);
    }

    // ensure that delayed reject is actually called
    if (!triedRejection) {
        $ERROR("Expected triedRejection to be true, actually " + triedRejection);
    }
}

var promise = deferred();

var a = makeSequenceArray(2, $DONE, fulfilledOnce);

a[0].then(function () {
    promise.then(function expectFulfilled() {
        fulfilledCount += 1;
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);

    a[1].then(function () {
        promise.reject(new Test262Error('Unexpected rejection'));
        triedRejection = true;
    });

    a[1].resolve();
    promise.resolve();
});

a[0].resolve();


