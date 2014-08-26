// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.6-4-190
description: >
    Object.defineProperty - 'O' is an Array, 'name' is an array index
    named property, 'name' is own data property, test TypeError is
    thrown on updating the configurable attribute from false to true
    (15.4.5.1 step 4.c)
includes: [propertyHelper.js]
negative: TypeError
---*/

var arrObj = [];

Object.defineProperty(arrObj, 0, {
    value: "ownDataProperty",
    configurable: false
});

try {
    Object.defineProperty(arrObj, 0, {
        configurable: true
    });
} catch (e) {
    dataPropertyAttributesAreCorrect(arrObj, "0", "ownDataProperty", false, false, false);
    throw e;
}
