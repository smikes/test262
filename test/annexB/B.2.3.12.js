// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.strike(), '<strike>_</strike>');
assertEquals('<'.strike(), '<strike><</strike>');
assertEquals(String.prototype.strike.call(0x2A), '<strike>42</strike>');
assertThrows(function() {
  String.prototype.strike.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.strike.call(null);
}, TypeError);
assertEquals(String.prototype.strike.length, 0);
