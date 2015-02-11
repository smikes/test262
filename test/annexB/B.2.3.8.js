// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.fontsize('b'), '<font size="b">_</font>');
assertEquals('<'.fontsize('<'), '<font size="<"><</font>');
assertEquals('_'.fontsize(0x2A), '<font size="42">_</font>');
assertEquals('_'.fontsize('\x22'), '<font size="&quot;">_</font>');
assertEquals(String.prototype.fontsize.call(0x2A, 0x2A),
  '<font size="42">42</font>');
assertThrows(function() {
  String.prototype.fontsize.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.fontsize.call(null);
}, TypeError);
assertEquals(String.prototype.fontsize.length, 1);
