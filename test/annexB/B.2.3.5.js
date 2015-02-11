// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.5
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.bold(), '<b>_</b>');
assertEquals('<'.bold(), '<b><</b>');
assertEquals(String.prototype.bold.call(0x2A), '<b>42</b>');
assertThrows(function() {
  String.prototype.bold.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.bold.call(null);
}, TypeError);
assertEquals(String.prototype.bold.length, 0);
