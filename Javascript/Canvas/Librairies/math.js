function makePermutationIterator(l) {
  let nextIndex;
  function next() {
    let result;

  }
}

function range(start=0, end=Infinity, step=1) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function() {
      let result;
      if (nextIndex < end) {
        result = {
          value: nextIndex,
          done: false
        }
        nextIndex += step;
        iterationCount++;
        return result;
      }
      return {
        value: iterationCount,
        done: true
      }
    }
  };
  return rangeIterator;
}


function permuted(permutation) {
  var length = permutation.length,
      result = [permutation.slice()],
      c = new Array(length).fill(0),
      i = 1, k, p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }
  return result;
}


function permute(input) {
    var permArr = [],
        usedChars = [];
    return (function main() {
        for (var i = 0; i < input.length; i++) {
            var ch = input.splice(i, 1)[0];
            usedChars.push(ch);
            if (input.length == 0) {
                permArr.push(usedChars.slice());
            }
            main();
            input.splice(i, 0, ch);
            usedChars.pop();
        }
        return permArr;
    })();
}

console.log(permute(['a', 'b', 'c']));
