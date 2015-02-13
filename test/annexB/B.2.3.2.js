// Copyright 2014 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE.v8 file.

// Tests taken from:
// http://mathias.html5.org/tests/javascript/string/

/*---
 description: >
     String.prototype.anchor returns a string of HTML describing a single HTML
     anchor element. The element's content is the `this` value of the function
     invocation, coerced to a string. If specified, the first argument will be
     coerced to a string, escaped, and set as the element's `name` attribute.
 es6id: B.2.3.2
 ---*/

assert.sameValue('_'.anchor('b'), '<a name="b">_</a>');
assert.sameValue('<'.anchor('<'), '<a name="<"><</a>');
assert.sameValue('_'.anchor(0x2A), '<a name="42">_</a>');
assert.sameValue('_'.anchor('\x22'), '<a name="&quot;">_</a>');
assert.sameValue(String.prototype.anchor.call(0x2A, 0x2A), '<a name="42">42</a>');
assert.throws(TypeError, function() {
  String.prototype.anchor.call(undefined);
});
assert.throws(TypeError, function() {
  String.prototype.anchor.call(null);
});
assert.sameValue(String.prototype.anchor.length, 1);
