// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.6-4-333-8
description: >
    Object.defineProperty will update [[Value]] attribute of indexed
    property 'P'successfully when [[Configurable]] attribute is false,
    [[Writable]] attribute is true and 'O' is an Arguments object
    (8.12.9 - step 10)
includes: [propertyHelper.js]
---*/

function testcase() {

        var obj = (function () {
            return arguments;
        }());

        Object.defineProperty(obj, "0", {
            value: 1001,
            writable: true,
            configurable: false
        });

        Object.defineProperty(obj, "0", {
            value: 1002
        });

        return dataPropertyAttributesAreCorrect(obj, "0", 1002, true, false, false);
    }
runTestCase(testcase);
