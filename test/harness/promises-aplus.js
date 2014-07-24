/*global $ERROR, $DONE, Promise*/
function makeDeferred() {
    var a,
        p = new Promise(function (r1, r2) { a = [r1, r2]; });
    p.resolve = a[0];
    p.reject = a[1];

    return p;
}

function makePromiseTestArray(n, done) {
    var i = 0,
        a = [];

    for (i = 0; i < n; i += 1) {
        a[i] = makeDeferred();
    }
    a.all = Promise.all(a);

    if (done) {
        setupAllAssertions(a.all, done);
    }

    return a;
}

var additionalAssertions;

function makeError(r) {
    if (r instanceof Error) {
        throw r;
    }

    $ERROR("Error: " + r);
}

function identity(x) { 
    return x; 
}

function checkAllResolutions(resolutions) {
    resolutions.filter(identity).forEach(makeError);
    
    if (additionalAssertions) {
        additionalAssertions();
    }
}

function setupAllAssertions(all, done) {
    all.then(checkAllResolutions).catch(makeError).then(done, done);
}
