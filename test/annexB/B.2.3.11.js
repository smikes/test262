// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.11
 ---*/

assert.sameValue('_'.small(), '<small>_</small>');
assert.sameValue('<'.small(), '<small><</small>');
assert.sameValue(String.prototype.small.call(0x2A), '<small>42</small>');
assert.throws(TypeError, function() {
  String.prototype.small.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.small.call(null);
});
assert.sameValue(String.prototype.small.length, 0);
