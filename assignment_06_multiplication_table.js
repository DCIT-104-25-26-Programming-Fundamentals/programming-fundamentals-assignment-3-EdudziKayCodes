// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 6
// =============================================================================
//
// TASK: Multiplication Table Generator
//
// Write a JavaScript program that generates multiplication tables using loops
// and functions.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_06_multiplication_table.js
//
// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// - Ask the user to enter a number.
// - Print the multiplication table for that number from 1 to 12.
//
// Expected output (if user enters 5):
//
//   Multiplication Table for 5:
//   5  x  1  =  5
//   5  x  2  =  10
//   5  x  3  =  15
//   ...
//   5  x  12 =  60
//
// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// - Ask the user to enter a number N.
// - Print the full multiplication table for every number from 1 to N.
// - Add a separator line (e.g. "---") between each table.
//
// Expected output (if user enters 3):
//
//   Multiplication Table for 1:
//   1  x  1  =  1
//   ...
//   1  x  12 =  12
//   ---------------------------
//   Multiplication Table for 2:
//   2  x  1  =  2
//   ...
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - N must be a positive integer. If the user enters an invalid value,
//   print an error message and stop.
// - Each part must be in its own function (see scaffold below).
// - Complete Part A before attempting Part B.

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

// -----------------------------------------------------------------------------
// Helper: validate that a value is a positive integer
// -----------------------------------------------------------------------------
function isPositiveInteger(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}

// -----------------------------------------------------------------------------
// PART A — Single Table
// -----------------------------------------------------------------------------
// Prints the multiplication table for a single number, from 1 to 12.
function printTable(number) {
  console.log(`Multiplication Table for ${number}:`);
  for (let i = 1; i <= 12; i++) {
    const result = number * i;
    // Pad the multiplier and result so columns line up neatly.
    const multiplier = String(i).padEnd(2);
    console.log(`${number}  x  ${multiplier} =  ${result}`);
  }
}

function runPartA() {
  const input = readlineSync.question("Enter a number: ");

  if (!isPositiveInteger(input)) {
    console.log("Error: please enter a positive integer.");
    return;
  }

  const number = Number(input);
  printTable(number);
}

// -----------------------------------------------------------------------------
// PART B — Bonus: Tables from 1 to N
// -----------------------------------------------------------------------------
// Prints multiplication tables for every number from 1 to N,
// separated by a line of dashes.
function printTablesUpTo(n) {
  for (let num = 1; num <= n; num++) {
    printTable(num);
    if (num < n) {
      console.log("---------------------------");
    }
  }
}

function runPartB() {
  const input = readlineSync.question("Enter a number N: ");

  if (!isPositiveInteger(input)) {
    console.log("Error: please enter a positive integer.");
    return;
  }

  const n = Number(input);
  printTablesUpTo(n);
}

// -----------------------------------------------------------------------------
// MAIN — run Part A, then optionally Part B
// -----------------------------------------------------------------------------
function main() {
  console.log("=== Part A: Single Table ===");
  runPartA();

  console.log("\n=== Part B: Tables from 1 to N ===");
  runPartB();
}

main();
