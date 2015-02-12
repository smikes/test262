// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 es6id: B.2.3.7
 ---*/

assert.sameValue('_'.fontcolor('b'), '<font color="b">_</font>');
assert.sameValue('<'.fontcolor('<'), '<font color="<"><</font>');
assert.sameValue('_'.fontcolor(0x2A), '<font color="42">_</font>');
assert.sameValue('_'.fontcolor('\x22'), '<font color="&quot;">_</font>');
assert.sameValue(String.prototype.fontcolor.call(0x2A, 0x2A),
  '<font color="42">42</font>');
assert.throws(TypeError, function() {
  String.prototype.fontcolor.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.fontcolor.call(null);
});
assert.sameValue(String.prototype.fontcolor.length, 1);
