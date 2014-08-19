// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.2.3.7-6-a-90
description: >
    Object.defineProperties will not throw TypeError when
    P.configurable is false, both properties.[[Get]] and P.[[Get]] are
    two objects which refer to the same object (8.12.9 step 11.a.ii)
includes: [propertyHelper.js]
---*/

function testcase() {

        var obj = {};

        function set_func(value) {
            obj.setVerifyHelpProp = value;
        }
        function get_func() {
            return 10;
        }

        Object.defineProperty(obj, "foo", {
            get: get_func,
            set: set_func,
            enumerable: false,
            configurable: false
        });

        Object.defineProperties(obj, {
            foo: {
                get: get_func
            }
        });
        return accessorPropertyAttributesAreCorrect(obj, "foo", get_func, set_func, "setVerifyHelpProp", false, false);
    }
runTestCase(testcase);
