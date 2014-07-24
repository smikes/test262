/// Copyright 2014 Ecma International. All rights reserved.

/**
 * Promises/A+ 2.1.2.1 When fulfilled, a promise must not transition to any other state
 *
 * @description already-fulfilled promise does not transition
 * @author Sam Mikes
 */ 

$INCLUDE('promises-aplus.js');

var fulfilledCount = 0;

function additionalAssertions() {
    if (fulfilledCount !== 1) {
        $ERROR("Expected fulfilledCount === 1, actually " + fulfilledCount);
    }
}

var a = makePromiseTestArray(2, $DONE);

a[0].then(function () {
    // already-fulfilled
    a[1].resolve();

    a[1].then(function expectFulfilled() {
        fulfilledCount += 1;
        if (fulfilledCount !== 1) {
            $ERROR("Unexpected: promise fulfilled more than once");
        }
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);
});

a[0].resolve();

