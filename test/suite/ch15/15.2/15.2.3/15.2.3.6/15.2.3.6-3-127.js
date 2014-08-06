// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.6-3-127
description: >
    Object.defineProperty - 'value' property in 'Attributes' is not
    present  (8.10.5 step 5)
includes: [runTestCase.js]
---*/

function testcase() {
        var obj = { };

        var attr = {
            writable: true
        };

        Object.defineProperty(obj, "property", attr);

        return obj.hasOwnProperty("property") && typeof (obj.property) === "undefined";
    }
runTestCase(testcase);
