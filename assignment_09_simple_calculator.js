// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 9
// =============================================================================
//
// TASK: Console-Based Simple Calculator
//
// Build a calculator program that runs in the console and performs basic
// arithmetic operations based on the user's input.
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_09_simple_calculator.js
//
// -----------------------------------------------------------------------------
// OPERATIONS YOUR CALCULATOR MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Addition          ( + )    e.g.  10 + 3  =  13
//   2. Subtraction       ( - )    e.g.  10 - 3  =  7
//   3. Multiplication    ( * )    e.g.  10 * 3  =  30
//   4. Division          ( / )    e.g.  10 / 3  =  3.33
//   5. Modulus           ( % )    e.g.  10 % 3  =  1  (remainder)
//   6. Exponentiation    ( ** )   e.g.  2 ** 8  =  256
//   7. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ============================
//        SIMPLE CALCULATOR
//   ============================
//   1. Addition
//   2. Subtraction
//   3. Multiplication
//   4. Division
//   5. Modulus
//   6. Exponentiation
//   7. Quit
//   Select an operation (1-7):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Select an operation (1-7): 4
//   Enter first number : 10
//   Enter second number: 3
//   Result: 10 / 3 = 3.33
//
//   Select an operation (1-7): 4
//   Enter first number : 5
//   Enter second number: 0
//   Error: Cannot divide by zero.
//
//   Select an operation (1-7): 7
//   Goodbye!
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Each arithmetic operation MUST be written as its own function.
// - Use a loop so the calculator keeps running until the user selects Quit.
// - Division by zero must be caught and handled with a clear error message
//   (do NOT let the program crash).
// - Display results to 2 decimal places using .toFixed(2).
// - Handle invalid menu choices gracefully.
//

//
// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

// -----------------------------------------------------------------------------
// ARITHMETIC FUNCTIONS — each operation is its own function
// -----------------------------------------------------------------------------

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a / b;
}

function modulus(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }
  return a % b;
}

function exponentiate(a, b) {
  return a ** b;
}

// -----------------------------------------------------------------------------
// HELPER: print the menu
// -----------------------------------------------------------------------------

function printMenu() {
  console.log('============================');
  console.log('     SIMPLE CALCULATOR');
  console.log('============================');
  console.log('1. Addition');
  console.log('2. Subtraction');
  console.log('3. Multiplication');
  console.log('4. Division');
  console.log('5. Modulus');
  console.log('6. Exponentiation');
  console.log('7. Quit');
}

// -----------------------------------------------------------------------------
// HELPER: get two valid numbers from the user
// Returns null if input is invalid (not a number)
// -----------------------------------------------------------------------------

function getNumbers() {
  const firstInput = readlineSync.question('Enter first number : ');
  const secondInput = readlineSync.question('Enter second number: ');

  const first = parseFloat(firstInput);
  const second = parseFloat(secondInput);

  if (isNaN(first) || isNaN(second)) {
    console.log('Error: Please enter valid numbers.');
    return null;
  }

  return { first, second };
}

// -----------------------------------------------------------------------------
// MAIN PROGRAM LOOP
// -----------------------------------------------------------------------------

function main() {
  const symbols = {
    '1': '+',
    '2': '-',
    '3': '*',
    '4': '/',
    '5': '%',
    '6': '**',
  };

  let running = true;

  while (running) {
    printMenu();
    const choice = readlineSync.question('Select an operation (1-7): ').trim();

    switch (choice) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6': {
        const numbers = getNumbers();
        if (numbers === null) {
          break;
        }
        const { first, second } = numbers;
        const symbol = symbols[choice];

        try {
          let result;

          switch (choice) {
            case '1':
              result = add(first, second);
              break;
            case '2':
              result = subtract(first, second);
              break;
            case '3':
              result = multiply(first, second);
              break;
            case '4':
              result = divide(first, second);
              break;
            case '5':
              result = modulus(first, second);
              break;
            case '6':
              result = exponentiate(first, second);
              break;
          }

          console.log(`Result: ${first} ${symbol} ${second} = ${result.toFixed(2)}`);
        } catch (err) {
          console.log(`Error: ${err.message}`);
        }
        break;
      }

      case '7':
        console.log('Goodbye!');
        running = false;
        break;

      default:
        console.log('Error: Invalid choice. Please select a number between 1 and 7.');
        break;
    }

    console.log(''); // blank line for readability between rounds
  }
}

main();
