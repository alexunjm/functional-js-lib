const lib = initialArray => ({
  min: () => Math.min(...initialArray),
  max: () => Math.max(...initialArray),
  each: fn => {
    for (let index = 0; index < initialArray.length; index++) {
      const element = initialArray[index];
      fn(element, index, initialArray);
    }
  },
  map: fn => {
    const newArray = [];
    lib(initialArray).each((element, index, initialArray) =>
      newArray.push(fn(element, index, initialArray))
    );
    return newArray;
  },
  reduce: (fn, initialValue) => {
    if (!initialValue) initialValue = 0;
    /* initialArray = [...initialArray].reverse(); */
    lib(initialArray).each((element, index, initialArray) => {
      initialValue = fn(initialValue, element, index, initialArray);
    });
    return initialValue;
  },
  avg: () => lib(initialArray).reduce((prev, curr) => prev + curr, 0) / initialArray.length,
});

let arr = [5, 4, 2, 1, 3];

console.log(lib(arr).min());
console.log(lib(arr).max());
lib(arr).each(console.log);
console.log(lib(arr).map(elm => elm * 2));
console.log(lib(arr).reduce((prev, elm) => prev + elm, 0));
console.log(lib(arr).avg());
