// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.4
 ---*/

assert.sameValue('_'.blink(), '<blink>_</blink>');
assert.sameValue('<'.blink(), '<blink><</blink>');
assert.sameValue(String.prototype.blink.call(0x2A), '<blink>42</blink>');
assert.throws(TypeError, function() {
  String.prototype.blink.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.blink.call(null);
});
assert.sameValue(String.prototype.blink.length, 0);
