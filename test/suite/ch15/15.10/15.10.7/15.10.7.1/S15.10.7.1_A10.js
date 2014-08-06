// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: The RegExp instance source property has the attribute ReadOnly
es5id: 15.10.7.1_A10
description: Checking if varying the source property fails
includes: [$FAIL.js]
---*/

__re = /./;

//CHECK#1
if (__re.hasOwnProperty('source') !== true) {
  $FAIL('#1: __re = /./; __re.hasOwnProperty(\'source\') === true');
}

__obj = __re.source;

__re.source = "shifted";

//CHECK#2
if (__re.source !== __obj) {
  $ERROR('#2: __re = /./; __obj = __re.source; __re.source = "shifted"; __re.source === __obj. Actual: ' + (__re.source));
}
