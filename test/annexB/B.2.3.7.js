// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.fontcolor('b'), '<font color="b">_</font>');
assertEquals('<'.fontcolor('<'), '<font color="<"><</font>');
assertEquals('_'.fontcolor(0x2A), '<font color="42">_</font>');
assertEquals('_'.fontcolor('\x22'), '<font color="&quot;">_</font>');
assertEquals(String.prototype.fontcolor.call(0x2A, 0x2A),
  '<font color="42">42</font>');
assertThrows(function() {
  String.prototype.fontcolor.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.fontcolor.call(null);
}, TypeError);
assertEquals(String.prototype.fontcolor.length, 1);
