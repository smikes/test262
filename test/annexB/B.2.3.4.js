// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.4
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.blink(), '<blink>_</blink>');
assertEquals('<'.blink(), '<blink><</blink>');
assertEquals(String.prototype.blink.call(0x2A), '<blink>42</blink>');
assertThrows(function() {
  String.prototype.blink.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.blink.call(null);
}, TypeError);
assertEquals(String.prototype.blink.length, 0);
