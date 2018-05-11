const _ = initArr => ({
  min: () => Math.min(...initArr),
  max: () => Math.max(...initArr),
  reverse: () => [...initArr].reverse(),
  push: (newElm) => {
    const newArr = [...initArr];
    newArr.push(newElm);
    return newArr;
  },
  each: fn => {
    for (let index = 0; index < initArr.length; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  map: fn => {
    const newArr = [];
    _(initArr).each((elm, index, initArr) =>
      newArr.push(fn(elm, index, initArr))
    );
    return newArr;
  },
  map2: fn =>
    _(initArr).reduce(
      (acc, elm, index, initArr) => _(acc).push(fn(elm, index, initArr)),
      []
    ),
  reduce: (fn, initialValue) => {
    let acc = initialValue || 0;
    _(initArr).each((elm, index, initArr) => {
      acc = fn(acc, elm, index, initArr);
    });
    return acc;
  },
  flatMap: fn =>
    _(initArr).reduce(
      (acc, x, index, arr) => acc.concat(fn(x, index, arr)),
      []
    ),
  sum: () => _(initArr).reduce((prev, curr) => prev + curr, 0),
  avg: () => _(initArr).sum() / initArr.length,
  contains: (elms, fn) =>
    elms.every(testElm =>
      initArr.some(srcElm => (fn ? fn(srcElm, testElm) : srcElm === testElm))
    )
});

let arr = [5, 4, 2, 1, 3];

console.log("min", _(arr).min());
console.log("max", _(arr).max());
console.log("reverse", _(arr).reverse());
_(arr).each(console.log);
console.log("map", _(arr).map(elm => elm * 2));
console.log("map2", _(arr).map2(elm => elm * 3));
console.log("reduce", _(arr).reduce((acc, elm) => acc + elm));
console.log("reduce +5", _(arr).reduce((acc, elm) => acc + elm, 5));
console.log("map", _(arr).map((x, i, arr) => arr));
console.log("flatMap", _(arr).flatMap((x, i, arr) => _(arr).reverse()));
console.log("sum", _(arr).sum());
console.log("avg", _(arr).avg());
console.log("contains", _(arr).contains([1, 4]));
console.log(
  "contains with condFunction",
  _(arr).contains([1, 4, 5], (srcElm, testElm) => srcElm === testElm + 1)
);
