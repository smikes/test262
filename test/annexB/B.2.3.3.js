/*---
 includes: [v8-mjsunit.js]
 ---*/
// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

assertEquals('_'.big(), '<big>_</big>');
assertEquals('<'.big(), '<big><</big>');
assertEquals(String.prototype.big.call(0x2A), '<big>42</big>');
assertThrows(function() {
  String.prototype.big.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.big.call(null);
}, TypeError);
assertEquals(String.prototype.big.length, 0);
