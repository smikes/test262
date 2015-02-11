// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.italics(), '<i>_</i>');
assertEquals('<'.italics(), '<i><</i>');
assertEquals(String.prototype.italics.call(0x2A), '<i>42</i>');
assertThrows(function() {
  String.prototype.italics.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.italics.call(null);
}, TypeError);
assertEquals(String.prototype.italics.length, 0);
