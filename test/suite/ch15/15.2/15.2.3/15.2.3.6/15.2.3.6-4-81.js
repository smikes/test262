// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.6-4-81
description: >
    Object.defineProperty - both desc.configurable and
    name.configurable are booleans with the same value (8.12.9 step 6)
includes: [propertyHelper.js]
---*/

function testcase() {
    
        var obj = {};

        Object.defineProperty(obj, "foo", { configurable: false });

        Object.defineProperty(obj, "foo", { configurable: false });
        return dataPropertyAttributesAreCorrect(obj, "foo", undefined, false, false, false);
    }
runTestCase(testcase);
