// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.12
 ---*/

assert.sameValue('_'.strike(), '<strike>_</strike>');
assert.sameValue('<'.strike(), '<strike><</strike>');
assert.sameValue(String.prototype.strike.call(0x2A), '<strike>42</strike>');
assert.throws(TypeError, function() {
  String.prototype.strike.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.strike.call(null);
});
assert.sameValue(String.prototype.strike.length, 0);
