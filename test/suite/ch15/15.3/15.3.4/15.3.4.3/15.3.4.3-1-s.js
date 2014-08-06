// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.3.4.3-1-s
description: >
    Strict Mode - 'this' value is a string which cannot be converted
    to wrapper objects when the function is called with an array of
    arguments
flags: [onlyStrict]
includes: [runTestCase.js]
---*/

function testcase() {
        "use strict";

        function fun() {
            return (this instanceof String);
        }
        return !fun.apply("", Array);
    }
runTestCase(testcase);
