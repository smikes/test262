// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.7-6-a-104
description: >
    Object.defineProperties - 'P' is accessor property, both
    properties.[[Set]] and P.[[Set]] are two different values (8.12.9
    step 12)
includes: [propertyHelper.js]
---*/


var obj = {};

function get_func() {
    return 10;
}

function set_func() {
    return 10;
}

Object.defineProperty(obj, "foo", {
    get: get_func,
    set: set_func,
    enumerable: true,
    configurable: true
});

function set_func2(value) {
    obj.setVerifyHelpProp = value;
}

Object.defineProperties(obj, {
    foo: {
        set: set_func2
    }
});
accessorPropertyAttributesAreCorrect(obj, "foo", get_func, set_func2, "setVerifyHelpProp", true, true);
