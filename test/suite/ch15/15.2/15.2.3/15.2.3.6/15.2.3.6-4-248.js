// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.6-4-248
description: >
    Object.defineProperty - 'O' is an Array, 'name' is an array index
    named property, 'name' is data property and 'desc' is data
    descriptor, and the [[Configurable]] attribute value of 'name' is
    false, test TypeError is thrown if the [[Writable]] attribute
    value of 'name' is false, and the [[Value]] field of 'desc' and
    the [[Value]] attribute value of 'name' are two numbers with
    different vaules (15.4.5.1 step 4.c)
includes: [propertyHelper.js]
---*/

function testcase() {
        var arrObj = [];

        Object.defineProperty(arrObj, "1", {
            value: 12
        });

        try {
            Object.defineProperty(arrObj, "1", {
                value: 15
            });
            return false;
        } catch (e) {
            return e instanceof TypeError && dataPropertyAttributesAreCorrect(arrObj, "1", 12, false, false, false);
        }
    }
runTestCase(testcase);
