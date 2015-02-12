// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.14
 ---*/

assert.sameValue('_'.sup(), '<sup>_</sup>');
assert.sameValue('<'.sup(), '<sup><</sup>');
assert.sameValue(String.prototype.sup.call(0x2A), '<sup>42</sup>');
assert.throws(TypeError, function() {
  String.prototype.sup.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.sup.call(null);
});
assert.sameValue(String.prototype.sup.length, 0);
