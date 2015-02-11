// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.link('b'), '<a href="b">_</a>');
assertEquals('<'.link('<'), '<a href="<"><</a>');
assertEquals('_'.link(0x2A), '<a href="42">_</a>');
assertEquals('_'.link('\x22'), '<a href="&quot;">_</a>');
assertEquals(String.prototype.link.call(0x2A, 0x2A), '<a href="42">42</a>');
assertThrows(function() {
  String.prototype.link.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.link.call(null);
}, TypeError);
assertEquals(String.prototype.link.length, 1);
