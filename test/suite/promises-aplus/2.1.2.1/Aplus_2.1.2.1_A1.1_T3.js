$INCLUDE('promises-aplus.js');

var fulfilledCount = 0;

function additionalAssertions() {
    if (fulfilledCount !== 1) {
        $ERROR("Expected fulfilledCount === 1, actually " + fulfilledCount);
    }
}

var a = makePromiseTestArray(2);

a.all.then(checkAllResolutions).then($DONE, $DONE);

a[0].then(function () {
    a[1].then(function expectFulfilled(arg) {
        fulfilledCount += 1;
        if (fulfilledCount !== 1) {
            $ERROR("Unexpected: promise fulfilled more than once");
        }
    }, function shouldNotReject(arg) {
        $ERROR("Unexpected: promise should not reject " + arg);
    }).catch($DONE);
}).then(function () {
    a[1].resolve();
});

a[0].resolve();
