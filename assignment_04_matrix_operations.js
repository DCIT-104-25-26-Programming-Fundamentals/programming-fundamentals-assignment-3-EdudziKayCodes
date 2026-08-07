// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.

const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// HELPER: Read a matrix of given size from the user
// -----------------------------------------------------------------------------
function readMatrix(rows, cols, label) {
  const matrix = [];
  console.log(`\nEnter ${label} (${rows} rows, ${cols} columns).`);
  console.log(`Type each row as ${cols} numbers separated by spaces.`);

  for (let i = 0; i < rows; i++) {
    let row;
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1}: `);
      row = line.trim().split(/\s+/).map(Number);

      if (row.length !== cols || row.some(isNaN)) {
        console.log(`  -> Please enter exactly ${cols} valid numbers.`);
        continue;
      }
      break;
    }
    matrix.push(row);
  }
  return matrix;
}

// -----------------------------------------------------------------------------
// HELPER: Read a positive integer from the user
// -----------------------------------------------------------------------------
function readPositiveInt(prompt) {
  let value;
  while (true) {
    value = parseInt(readlineSync.question(prompt), 10);
    if (!isNaN(value) && value > 0) break;
    console.log('  -> Please enter a positive whole number.');
  }
  return value;
}

// -----------------------------------------------------------------------------
// HELPER: Display a matrix in a neat, aligned grid
// -----------------------------------------------------------------------------
function printMatrix(matrix, title) {
  console.log(`\n${title}`);

  // Find the widest number so all columns line up
  let maxWidth = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      maxWidth = Math.max(maxWidth, String(matrix[i][j]).length);
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j++) {
      line += String(matrix[i][j]).padStart(maxWidth + 2, ' ');
    }
    console.log(line);
  }
}

// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
function multiplyMatrices(a, b) {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

// -----------------------------------------------------------------------------
// PART A — Run
// -----------------------------------------------------------------------------
function runPartA() {
  console.log('\n=== PART A: Transpose a Matrix ===');

  const rows = readPositiveInt('Enter number of rows: ');
  const cols = readPositiveInt('Enter number of columns: ');
  const matrix = readMatrix(rows, cols, 'the matrix');

  const transposed = transposeMatrix(matrix);

  printMatrix(matrix, 'Original Matrix:');
  printMatrix(transposed, 'Transposed Matrix:');
}

// -----------------------------------------------------------------------------
// PART B — Run
// -----------------------------------------------------------------------------
function runPartB() {
  console.log('\n=== PART B: Add Two Matrices ===');

  const rows = readPositiveInt('Enter number of rows (same for both matrices): ');
  const cols = readPositiveInt('Enter number of columns (same for both matrices): ');

  const matrixA = readMatrix(rows, cols, 'Matrix A');
  const matrixB = readMatrix(rows, cols, 'Matrix B');

  const sum = addMatrices(matrixA, matrixB);

  printMatrix(matrixA, 'Matrix A:');
  printMatrix(matrixB, 'Matrix B:');
  printMatrix(sum, 'A + B:');
}

// -----------------------------------------------------------------------------
// PART C — Run
// -----------------------------------------------------------------------------
function runPartC() {
  console.log('\n=== PART C: Multiply Two Matrices ===');
  console.log('(Columns of A must equal rows of B)');

  const rowsA = readPositiveInt('Enter number of rows for Matrix A: ');
  const colsA = readPositiveInt('Enter number of columns for Matrix A (= rows of B): ');
  const colsB = readPositiveInt('Enter number of columns for Matrix B: ');

  const matrixA = readMatrix(rowsA, colsA, 'Matrix A');
  const matrixB = readMatrix(colsA, colsB, 'Matrix B');

  const product = multiplyMatrices(matrixA, matrixB);

  printMatrix(matrixA, 'Matrix A:');
  printMatrix(matrixB, 'Matrix B:');
  printMatrix(product, 'A x B:');
}

// -----------------------------------------------------------------------------
// MAIN PROGRAM
// -----------------------------------------------------------------------------
function main() {
  console.log('MATRIX OPERATIONS PROGRAM');
  console.log('==========================');

  runPartA();
  runPartB();
  runPartC();

  console.log('\nDone!');
}

main();

