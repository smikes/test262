/*global $ERROR, Promise*/

function deferred() {
    'use strict';
    var resolve,
        reject,
        promise = new Promise(function (res, rej) {
            resolve = res;
            reject = rej;
        }),
        then = promise.then.bind(promise);

    return {
        promise: promise,
        resolve: resolve,
        reject: reject,
        then: then
    };
}

function makeError(r) {
    'use strict';
    if (r instanceof Error) {
        throw r;
    }

    $ERROR("Error: " + r);
}

function checkAllResolutions(resolutions) {
    'use strict';
    // turn any truthy resolution into an error
    resolutions.filter(function identity(x) { return x; }).forEach(makeError);
}

function setupAllAssertions(all, done, additionalAssertions) {
    'use strict';
    all.then(function (resolutions) {
        checkAllResolutions(resolutions);

        if (additionalAssertions) {
            additionalAssertions();
        }
    }).catch(makeError).then(done, done);
}

function makePromiseTestArray(n, done, additionalAssertions) {
    'use strict';
    var i = 0,
        array = [];

    for (i = 0; i < n; i += 1) {
        array[i] = deferred();
    }
    array.all = Promise.all(array);

    if (done) {
        setupAllAssertions(array.all, done, additionalAssertions);
    }

    return array;
}
