// Write a function that takes an array of arrays and a function as inputs.
// Sub-arrays are of the same size

const sumArrays = (arr, fn) => {
  // todo: implement

  // const arrLen = arr[0].length;
  // console.log({ arrLen });

  const out = [];

  while (arr[0].length > 0) {
    // const vars = arr.reduce((accum, inner) => {
    //   return accum.concat(inner.shift());
    // }, []);

    const result = arr.reduce((accum, inner) => {
      return fn(accum, inner.shift());
    }, 0);

    // console.log({ result });
    out.push(result);
  }

  return out;
};

const sum = (a, b) => a + b;
console.log(
  sumArrays(
    [
      [1, 2, 3],
      [10, 20, 30],
      [100, 200, 300],
    ],
    sum
  )
); //[111, 222, 333]
