// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charCodeAt(pos)
 *
 * @path 15_Native/15.5_String_Objects/15.5.4_Properties_of_the_String_Prototype_Object/15.5.4.5_String.prototype.charCodeAt/S15.5.4.5_A1_T7.js
 * @description Call charCodeAt() function with undefined argument of string object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToInteger(undefined) evaluates to 0 charCodeAt() evaluates to charCodeAt(0)
if (String("lego").charCodeAt(undefined) !== 0x6C) {
  $ERROR('#1: String("lego").charCodeAt(undefined) === 0x6C. Actual: String("lego").charCodeAt(undefined) ==='+String("lego").charCodeAt(undefined) ); 
}
//
//////////////////////////////////////////////////////////////////////////////
