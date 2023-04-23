function replaceZeros(arr) {
  const size = arr.length;
  const sudokuSize = Math.sqrt(size);

  const usedInRow = (row, num) => {
    for (let col = 0; col < size; col++) {
      if (arr[row][col] === num) {
        return true;
      }
    }
    return false;
  };

  const usedInCol = (col, num) => {
    for (let row = 0; row < size; row++) {
      if (arr[row][col] === num) {
        return true;
      }
    }
    return false;
  };

  const usedInBox = (startRow, startCol, num) => {
    for (let row = 0; row < sudokuSize; row++) {
      for (let col = 0; col < sudokuSize; col++) {
        if (arr[row + startRow][col + startCol] === num) {
          return true;
        }
      }
    }
    return false;
  };

  const isSafe = (row, col, num) => {
    return (
      !usedInRow(row, num) &&
      !usedInCol(col, num) &&
      !usedInBox(row - (row % sudokuSize), col - (col % sudokuSize), num)
    );
  };

  const solve = () => {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        if (arr[row][col] === 0) {
          for (let num = 1; num <= size; num++) {
            if (isSafe(row, col, num)) {
              arr[row][col] = num;
              if (solve()) {
                return true;
              }
              arr[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  solve();

  return arr;
}

const array = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

console.log(replaceZeros(array));
