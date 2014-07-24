/// Copyright 2014 Ecma International. All rights reserved.

/**
 * Promises/A+ 2.1.2.1 When fulfilled, a promise must not transition to any other state
 *
 * @description fulfilled-immediately then delay-rejected promise does not transition
 * @author Sam Mikes
 */

/*global $INCLUDE, $ERROR, $DONE, makePromiseTestArray, Test262Error*/
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

var p = deferred();

var a = makePromiseTestArray(2, $DONE, fulfilledOnce);

a[0].then(function () {
    p.then(function expectFulfilled() {
        fulfilledCount += 1;
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE).then(function () {
        p.reject(new Test262Error('Unexpected rejection'));
        triedRejection = true;
    }).then(function () {
        a[1].resolve();
    });

    p.resolve();
});

a[0].resolve();


