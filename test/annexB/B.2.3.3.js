// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.3
 ---*/

assert.sameValue('_'.big(), '<big>_</big>');
assert.sameValue('<'.big(), '<big><</big>');
assert.sameValue(String.prototype.big.call(0x2A), '<big>42</big>');
assert.throws(TypeError, function() {
  String.prototype.big.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.big.call(null);
});
assert.sameValue(String.prototype.big.length, 0);
