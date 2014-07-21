// Copyright (c) 2014 Hank Yates. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @description Testing Array#fill
 * @author Hank Yates (hankyates@gmail.com)
 */

runTestCase(function () {
  var testArr = new Array('testString', 'anotherTestString', 3),
      updatedArr = testArr.fill('newValue', 1, 3);

  if (updatedArr[3] !== 'newValue') {
    return false;
  }

  if (updatedArr[2] !== 'newValue') {
    return false;
  }

  if (updatedArr[0] !== 'testString') {
    return false;
  }

  if (updatedArr.length !== 4) {
    return false;
  }

  return true;

});
