/// Copyright 2014 Ecma International. All rights reserved.

/*---
 info: Promises/A+ 2.1.2.1 When fulfilled, a promise must not transition to any other state
 description: eventually-fulfilled promise does not transition
 author: Sam Mikes
 includes: [promises-aplus.js]
---*/

/*global $ERROR, $DONE, makeSequenceArray*/

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
    // eventually-fulfilled
    d.resolve();
});

a[0].resolve();

