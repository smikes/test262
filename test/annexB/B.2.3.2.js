/*---
 includes: [v8-mjsunit.js]
 ---*/
// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

assertEquals('_'.anchor('b'), '<a name="b">_</a>');
assertEquals('<'.anchor('<'), '<a name="<"><</a>');
assertEquals('_'.anchor(0x2A), '<a name="42">_</a>');
assertEquals('_'.anchor('\x22'), '<a name="&quot;">_</a>');
assertEquals(String.prototype.anchor.call(0x2A, 0x2A), '<a name="42">42</a>');
assertThrows(function() {
  String.prototype.anchor.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.anchor.call(null);
}, TypeError);
assertEquals(String.prototype.anchor.length, 1);

