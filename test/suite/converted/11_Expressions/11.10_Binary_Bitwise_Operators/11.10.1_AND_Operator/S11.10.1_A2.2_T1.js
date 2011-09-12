// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x & y uses [[Default Value]]
 *
 * @section 11.10.1, 8.6.2.6
 * @path 11_Expressions/11.10_Binary_Bitwise_Operators/11.10.1_AND_Operator/S11.10.1_A2.2_T1.js
 * @description If Type(value) is Object, evaluate ToPrimitive(value, Number)
 */

//CHECK#1
if (({valueOf: function() {return 1}} & 1) !== 1) {
  $ERROR('#1: ({valueOf: function() {return 1}} & 1) === 1. Actual: ' + (({valueOf: function() {return 1}} & 1)));
}

//CHECK#2
if (({valueOf: function() {return 1}, toString: function() {return 0}} & 1) !== 1) {
  $ERROR('#2: ({valueOf: function() {return 1}, toString: function() {return 0}} & 1) === 1. Actual: ' + (({valueOf: function() {return 1}, toString: function() {return 0}} & 1)));
}

//CHECK#3
if (({valueOf: function() {return 1}, toString: function() {return {}}} & 1) !== 1) {
  $ERROR('#3: ({valueOf: function() {return 1}, toString: function() {return {}}} & 1) === 1. Actual: ' + (({valueOf: function() {return 1}, toString: function() {return {}}} & 1)));
}

//CHECK#4
try {
  if (({valueOf: function() {return 1}, toString: function() {throw "error"}} & 1) !== 1) {
    $ERROR('#4.1: ({valueOf: function() {return 1}, toString: function() {throw "error"}} & 1) === 1. Actual: ' + (({valueOf: function() {return 1}, toString: function() {throw "error"}} & 1)));
  }
}
catch (e) {
  if (e === "error") {
    $ERROR('#4.2: ({valueOf: function() {return 1}, toString: function() {throw "error"}} & 1) not throw "error"');
  } else {
    $ERROR('#4.3: ({valueOf: function() {return 1}, toString: function() {throw "error"}} & 1) not throw Error. Actual: ' + (e));
  }
}

//CHECK#5
if ((1 & {toString: function() {return 1}}) !== 1) {
  $ERROR('#5.1: (1 & {toString: function() {return 1}}) === 1. Actual: ' + ((1 & {toString: function() {return 1}})));
}

//CHECK#6
if ((1 & {valueOf: function() {return {}}, toString: function() {return 1}}) !== 1) {
  $ERROR('#6: (1 & {valueOf: function() {return {}}, toString: function() {return 1}}) === 1. Actual: ' + ((1 & {valueOf: function() {return {}}, toString: function() {return 1}})));
}

//CHECK#7
try {
  1 & {valueOf: function() {throw "error"}, toString: function() {return 1}};
  $ERROR('#7.1: 1 & {valueOf: function() {throw "error"}, toString: function() {return 1}} throw "error". Actual: ' + (1 & {valueOf: function() {throw "error"}, toString: function() {return 1}}));
}  
catch (e) {
  if (e !== "error") {
    $ERROR('#7.2: 1 & {valueOf: function() {throw "error"}, toString: function() {return 1}} throw "error". Actual: ' + (e));
  } 
}

//CHECK#8
try {
  1 & {valueOf: function() {return {}}, toString: function() {return {}}};
  $ERROR('#8.1: 1 & {valueOf: function() {return {}}, toString: function() {return {}}} throw TypeError. Actual: ' + (1 & {valueOf: function() {return {}}, toString: function() {return {}}}));
}  
catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#8.2: 1 & {valueOf: function() {return {}}, toString: function() {return {}}} throw TypeError. Actual: ' + (e));
  } 
}
