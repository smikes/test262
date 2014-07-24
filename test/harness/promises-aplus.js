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
    // if it's already an error, just throw it
    if (r instanceof Error) {
        throw r;
    }

    // otherwise, make it into an error
    $ERROR("Error: " + r);
}

function checkAllResolutions(resolutions) {
    'use strict';
    // turn any truthy resolution into an error
    resolutions.filter(function identity(x) { return x; }).forEach(makeError);
}

/***
 * @param {Number} n Number of sequence-point promises to create
 * @param {Function} done(arg) Function to call on completion
 * @param arg Argument to done function; if truthy, test fails
 * @param {Function} additionalAssertions function to all after all sequence points
 */
function makeSequenceArray(n, done, additionalAssertions) {
    'use strict';
    var i = 0,
        array = [];

    if (!(typeof done === 'function')) {
        $ERROR("expect done to be a function, got: " + done);
    }

    for (i = 0; i < n; i += 1) {
        array[i] = deferred();
    }
    array.all = Promise.all(array);

    array.all.then(function (resolutions) {
        checkAllResolutions(resolutions);

        if (additionalAssertions) {
            additionalAssertions();
        }
    }).catch(makeError).then(done, done);

    return array;
}
