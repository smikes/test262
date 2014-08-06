// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.7-6-a-63
description: >
    Object.defineProperties - both desc.configurable and
    P.configurable are boolean values with the same value (8.12.9 step
    6)
includes:
    - runTestCase.js
    - dataPropertyAttributesAreCorrect.js
---*/

function testcase() {

        var obj = {};

        Object.defineProperty(obj, "foo", { 
            value: 10, 
            configurable: false 
        });

        Object.defineProperties(obj, {
            foo: {
                configurable: false
            }
        });
        return dataPropertyAttributesAreCorrect(obj, "foo", 10, false, false, false);
    }
runTestCase(testcase);
