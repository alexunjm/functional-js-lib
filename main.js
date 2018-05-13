const _arr = initArr => ({
  min: () => Math.min(...initArr),
  max: () => Math.max(...initArr),
  reverse: () => [...initArr].reverse(),
  push: newElm => {
    const newArr = [...initArr];
    newArr.push(newElm);
    return newArr;
  },
  each: fn => {
    for (let index = 0; index < initArr.length; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  eachFrom: (index, fn) => {
    for (; index < initArr.length; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  eachTo: (toIndex, fn) => {
    for (let index = 0; index < toIndex; index++) {
      fn(initArr[index], index, initArr);
    }
  },
  map: fn => {
    const newArr = [];
    _arr(initArr).each((elm, index, initArr) =>
      newArr.push(fn(elm, index, initArr))
    );
    return newArr;
  },
  map2: fn =>
    _arr(initArr).reduce(
      (acc, elm, index, initArr) => _arr(acc).push(fn(elm, index, initArr)),
      []
    ),
  joinMap: fn => {
    const newArr = [];
    _arr(initArr).eachFrom(1, (elm, index, initArr) => {
      newArr.push(fn(initArr[index - 1], elm, index, initArr));
    });
    return newArr;
  },
  joinMap2: fn =>
    _arr(initArr).reduce(
      (acc, elm, index, initArr) =>
        index > 0 ? _arr(acc).push(fn(initArr[index - 1], elm, index, initArr)): acc,
      []
    ),
  reduce: (fn, initialValue) => {
    let acc = initialValue || 0;
    _arr(initArr).each((elm, index, initArr) => {
      acc = fn(acc, elm, index, initArr);
    });
    return acc;
  },
  flatMap: fn =>
    _arr(initArr).reduce(
      (acc, x, index, arr) => acc.concat(fn(x, index, arr)),
      []
    ),
  sum: () => _arr(initArr).reduce((prev, curr) => prev + curr, 0),
  avg: () => _arr(initArr).sum() / initArr.length,
  contains: (elms, fn) =>
    elms.every(testElm =>
      initArr.some(srcElm => (fn ? fn(srcElm, testElm) : srcElm === testElm))
    )
});
/* 
let arr = [5, 4, 2, 1, 3];

console.log("min", _arr(arr).min());
console.log("max", _arr(arr).max());
console.log("reverse", _arr(arr).reverse());
_arr(arr).each(console.log);
console.log("map", _arr(arr).map(elm => elm * 2));
console.log("map2", _arr(arr).map2(elm => elm * 3));
console.log("reduce", _arr(arr).reduce((acc, elm) => acc + elm));
console.log("reduce +5", _arr(arr).reduce((acc, elm) => acc + elm, 5));
console.log("map", _arr(arr).map((x, i, arr) => arr));
console.log("flatMap", _arr(arr).flatMap((x, i, arr) => _arr(arr).reverse()));
console.log("sum", _arr(arr).sum());
console.log("avg", _arr(arr).avg());
console.log("contains", _arr(arr).contains([1, 4]));
console.log(
  "contains with condFunction",
  _arr(arr).contains([1, 4, 5], (srcElm, testElm) => srcElm === testElm + 1)
);
 */

const hasProperty = (p, property) => {
  if (!p.hasOwnProperty(property))
    throw new Error(
      JSON.stringify({
        p,
        message: `"La propiedad p.${property} no existe"`
      })
    );
  return true;
}

const _obj = initObj => ({
  entries: () => Object.entries(initObj),
  keys: () => _arr(_obj(initObj).entries()).map(keyVal => keyVal[0]),
  values: () => _arr(_obj(initObj).entries()).map(keyVal => keyVal[1]),
  distanceTo: p => {
    hasProperty(initObj, "x");
    hasProperty(initObj, "y");
    hasProperty(p, "x");
    hasProperty(p, "y");
    
    const xLen = initObj.x - p.x;
    const yLen = initObj.y - p.y;
    return Math.sqrt((xLen * xLen) + (yLen * yLen));
  }
});

const obj = { nombre: "alex", apellido: "jaramillo" };
const p1 = { x: 0, y: 0 };
const p2 = { x: 1, y: 0 };
const p3 = { x: 1, y: 1 };

console.log("objToArr", obj, _obj(obj).entries());
console.log("objToArrKeys", obj, _obj(obj).keys());
console.log("objToArrValues", obj, _obj(obj).values());
console.log(p1, p2, p3);

console.log("P1distanceToP2", _obj(p1).distanceTo(p2));
console.log(
  "joinMap (distancias entre puntos)",
  _arr([p1, p2, p3, p1]).joinMap((prev, curr) => _obj(prev).distanceTo(curr))
);
const distances = _arr([p1, p2, p3, p1]).joinMap2((prev, curr) => _obj(prev).distanceTo(curr))
console.log("joinMap2", distances);
console.log("joinMap2 -AVG", _arr(distances).avg());
