// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: The length property of isFinite has the attribute DontDelete
es5id: 15.1.2.5_A2.2
description: Checking use hasOwnProperty, delete
flags: [noStrict]
includes: [$FAIL.js]
---*/

//CHECK#1
if (isFinite.hasOwnProperty('length') !== true) {
  $FAIL('#1: isFinite.hasOwnProperty(\'length\') === true. Actual: ' + (isFinite.hasOwnProperty('length')));
}

delete isFinite.length;

//CHECK#2
if (isFinite.hasOwnProperty('length') !== true) {
  $ERROR('#2: delete isFinite.length; isFinite.hasOwnProperty(\'length\') === true. Actual: ' + (isFinite.hasOwnProperty('length')));
}

//CHECK#3
if (isFinite.length === undefined) {
  $ERROR('#3: delete isFinite.length; isFinite.length !== undefined');
}
