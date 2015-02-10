/*---
 includes: [v8-mjsunit.js]
 ---*/
// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

assertEquals('_'.fixed(), '<tt>_</tt>');
assertEquals('<'.fixed(), '<tt><</tt>');
assertEquals(String.prototype.fixed.call(0x2A), '<tt>42</tt>');
assertThrows(function() {
  String.prototype.fixed.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.fixed.call(null);
}, TypeError);
assertEquals(String.prototype.fixed.length, 0);
