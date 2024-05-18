export function arraysAreEqual(array1: any, array2: any) {
  // Check if arrays have the same length
  if (array1.length !== array2.length) {
    return false;
  }

  // Check each element of the arrays
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  // If all checks pass, arrays are equal
  return true;
}

export function objectsAreEqual(obj1: any, obj2: any) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
      if (obj1[key].length !== obj2[key].length) {
        return false;
      }

      for (let i = 0; i < obj1[key].length; i++) {
        if (obj1[key][i] !== obj2[key][i]) {
          return false;
        }
      }
    } else {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
  }

  return true;
}
