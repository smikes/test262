/*---
 includes: [v8-mjsunit.js]
 ---*/
// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

assertEquals('_'.sup(), '<sup>_</sup>');
assertEquals('<'.sup(), '<sup><</sup>');
assertEquals(String.prototype.sup.call(0x2A), '<sup>42</sup>');
assertThrows(function() {
  String.prototype.sup.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.sup.call(null);
}, TypeError);
assertEquals(String.prototype.sup.length, 0);
