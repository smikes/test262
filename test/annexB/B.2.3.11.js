// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.11
 includes: [v8-mjsunit.js]
 ---*/

assertEquals('_'.small(), '<small>_</small>');
assertEquals('<'.small(), '<small><</small>');
assertEquals(String.prototype.small.call(0x2A), '<small>42</small>');
assertThrows(function() {
  String.prototype.small.call(undefined);
}, TypeError);
assertThrows(function() {
  String.prototype.small.call(null);
}, TypeError);
assertEquals(String.prototype.small.length, 0);
