/// Copyright 2014 Ecma International. All rights reserved.

/**
 * Promises/A+ 2.1.2.1 When fulfilled, a promise must not transition to any other state
 *
 * @description eventually-fulfilled promise does not transition
 * @author Sam Mikes
 */

/*global $INCLUDE, $ERROR, $DONE, makePromiseTestArray*/
$INCLUDE('promises-aplus.js');

var fulfilledCount = 0;

function fulfilledOnce() {
    if (fulfilledCount !== 1) {
        $ERROR("Expected fulfilledCount === 1, actually " + fulfilledCount);
    }
}

var p = deferred();

var a = makePromiseTestArray(1, $DONE, fulfilledOnce);

a[0].then(function () {

    p.then(function expectFulfilled() {
        fulfilledCount += 1;
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);

}).then(function () {
    // eventually-fulfilled
    p.resolve();
});

a[0].resolve();

