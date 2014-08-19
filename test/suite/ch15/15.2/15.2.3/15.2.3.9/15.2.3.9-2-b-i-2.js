// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.9-2-b-i-2
description: >
    Object.freeze - The [[Wrtiable]] attribute of all own data
    property of 'O' is set to false while other attributes are
    unchanged
includes: [propertyHelper.js]
---*/

function testcase() {
        var obj = {};

        Object.defineProperty(obj, "foo1", {
            value: 10,
            writable: false,
            enumerable: true,
            configurable: false
        });

        Object.defineProperty(obj, "foo2", {
            value: 20,
            writable: true,
            enumerable: false,
            configurable: false
        });

        Object.freeze(obj);

        var desc1 = Object.getOwnPropertyDescriptor(obj, "foo1");
        var desc2 = Object.getOwnPropertyDescriptor(obj, "foo2");

        return dataPropertyAttributesAreCorrect(obj, "foo1", 10, false, true, false) &&
            dataPropertyAttributesAreCorrect(obj, "foo2", 20, false, false, false) &&
            desc1.configurable === false && desc1.writable === false &&
            desc2.configurable === false && desc2.writable === false;
    }
runTestCase(testcase);
