// Copyright (c) 2012 Ecma International.  All rights reserved.
// Ecma International makes this code available under the terms and conditions set
// forth on http://hg.ecmascript.org/tests/test262/raw-file/tip/LICENSE (the
// "Use Terms").   Any redistribution of this code must retain the above
// copyright and this notice and otherwise comply with the Use Terms.

/*---
es5id: 15.4.4.22-7-11
description: Array.prototype.reduceRight - 'initialValue' is not present
includes: [runTestCase.js]
---*/

function testcase() {

        var str = "initialValue is not present";
        return str === [str].reduceRight(function () { });
    }
runTestCase(testcase);
