// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.7-6-a-30
description: >
    Object.defineProperties - 'P' doesn't exist in 'O', test
    [[Configurable]] of 'P' is set as false value if absent in data
    descriptor 'desc' (8.12.9 step 4.a.i)
includes: [propertyHelper.js]
---*/

var obj = {};


Object.defineProperties(obj, {
    prop: { value: 1001 }
});

if (isConfigurable(obj, "prop")) {
    $ERROR("Expected obj[prop] to not be configurable if not specified.");
}

if (!obj.hasOwnProperty("prop")) {
    $ERROR('Expected obj.hasOwnProperty("prop") to be true, actually ' + obj.hasOwnProperty("prop"));
}

if (obj.prop !== 1001) {
    $ERROR('Expected obj.prop === 1001, actually ' + obj.prop);
}

