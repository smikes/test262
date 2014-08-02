// Copyright 2011 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
es5id: 15.2.4.7_A13
description: >
    Let O be the result of calling ToObject passing the this value as
    the argument.
negative: TypeError
---*/

Object.prototype.propertyIsEnumerable.call(null, 'foo');
