// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.6-4-223
description: >
    Object.defineProperty - 'O' is an Array, 'name' is an array index
    property, test TypeError is thrown  when the [[Value]] field of
    'desc' and the [[Value]] attribute value of 'name' are two strings
    with different values (15.4.5.1 step 4.c)
includes: [propertyHelper.js]
---*/

var arrObj = [];

Object.defineProperty(arrObj, 0, {
    value: "abcd",
    writable: false,
    configurable: false
});

try {
    Object.defineProperty(arrObj, "0", { value: "fghj" });
    $ERROR("Should not reach: expected exception.");
} catch (e) {
    if (!e instanceof TypeError) {
        $ERROR("Expected e instanceof TypeError, actually " + e);
    }
    dataPropertyAttributesAreCorrect(arrObj, "0", "abcd", false, false, false);
}
