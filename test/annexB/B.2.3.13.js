// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.sub(), '<sub>_</sub>');
assertEquals('<'.sub(), '<sub><</sub>');
assertEquals(String.prototype.sub.call(0x2A), '<sub>42</sub>');
assertThrows(function() {
  String.prototype.sub.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.sub.call(null);
}, TypeError);
assertEquals(String.prototype.sub.length, 0);
