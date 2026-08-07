// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 8
// =============================================================================
//
// TASK: Student Record Management System
//
// Build a console-based program that stores and manages student information.
// Each student is represented as a JavaScript object containing:
//
//   - name   : the student's full name  (string)
//   - id     : a unique student ID number (number, e.g. 20240001)
//   - scores : an array of scores from multiple assessments (e.g. [75, 88, 90])
//
// Example object:
//   { name: "Alice Mensah", id: 20240001, scores: [78, 85, 90] }
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_08_student_records.js
//
// -----------------------------------------------------------------------------
// FEATURES YOUR PROGRAM MUST SUPPORT
// -----------------------------------------------------------------------------
//
//   1. Add a Student
//      - Ask the user to enter the student's name and ID.
//      - Ask how many scores to enter, then collect each score one by one.
//      - Save the student object and confirm it was added.
//
//   2. Display All Students
//      - Print a formatted table showing every student's:
//          Name, ID, individual scores, and their average score.
//      - If no students have been added yet, print a message saying so.
//
//   3. Calculate Average Score for a Specific Student
//      - Ask the user to enter a student ID.
//      - Find the student and print their average score.
//      - If the ID is not found, print an error message.
//
//   4. Quit
//
// -----------------------------------------------------------------------------
// HOW THE MENU SHOULD LOOK
// -----------------------------------------------------------------------------
//
//   ================================
//      STUDENT RECORD SYSTEM MENU
//   ================================
//   1. Add student
//   2. Display all students
//   3. Calculate average score
//   4. Quit
//   Enter your choice (1-4):
//
// -----------------------------------------------------------------------------
// EXPECTED INTERACTION EXAMPLE
// -----------------------------------------------------------------------------
//
//   Enter your choice (1-4): 1
//   Student name: Alice Mensah
//   Student ID: 20240001
//   How many scores? 3
//   Enter score 1: 78
//   Enter score 2: 85
//   Enter score 3: 90
//   Student "Alice Mensah" added successfully.
//
//   Enter your choice (1-4): 3
//   Enter student ID: 20240001
//   Alice Mensah's average score: 84.33
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Store all student records in an array of objects.
// - Average scores must be displayed to 2 decimal places (use .toFixed(2)).
// - Each feature MUST be in its own function (see scaffold below).
// - Handle invalid menu choices and missing student IDs gracefully.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require("readline-sync");

// All student records live here: { name, id, scores: [] }
let students = [];

// -----------------------------------------------------------------------------
// 1. Add a Student
// -----------------------------------------------------------------------------
function addStudent() {
  const name = readlineSync.question("Student name: ").trim();
  const id = Number(readlineSync.question("Student ID: ").trim());

  if (!name || Number.isNaN(id)) {
    console.log("Invalid name or ID. Student not added.\n");
    return;
  }

  if (students.some((s) => s.id === id)) {
    console.log(`A student with ID ${id} already exists. Student not added.\n`);
    return;
  }

  const numScores = parseInt(readlineSync.question("How many scores? "), 10);
  if (Number.isNaN(numScores) || numScores <= 0) {
    console.log("Invalid number of scores. Student not added.\n");
    return;
  }

  const scores = [];
  for (let i = 1; i <= numScores; i++) {
    const score = Number(readlineSync.question(`Enter score ${i}: `));
    scores.push(Number.isNaN(score) ? 0 : score);
  }

  students.push({ name, id, scores });
  console.log(`Student "${name}" added successfully.\n`);
}

// -----------------------------------------------------------------------------
// Helper: average of a scores array
// -----------------------------------------------------------------------------
function average(scores) {
  if (scores.length === 0) return 0;
  const sum = scores.reduce((total, s) => total + s, 0);
  return sum / scores.length;
}

// -----------------------------------------------------------------------------
// 2. Display All Students
// -----------------------------------------------------------------------------
function displayAllStudents() {
  if (students.length === 0) {
    console.log("No students have been added yet.\n");
    return;
  }

  console.log("\n" + "=".repeat(60));
  console.log("NAME".padEnd(20) + "ID".padEnd(15) + "SCORES".padEnd(20) + "AVG");
  console.log("=".repeat(60));

  students.forEach((s) => {
    const avg = average(s.scores).toFixed(2);
    console.log(
      s.name.padEnd(20) +
        String(s.id).padEnd(15) +
        s.scores.join(", ").padEnd(20) +
        avg
    );
  });

  console.log("=".repeat(60) + "\n");
}

// -----------------------------------------------------------------------------
// 3. Calculate Average Score for a Specific Student
// -----------------------------------------------------------------------------
function calculateAverageById() {
  const id = Number(readlineSync.question("Enter student ID: ").trim());
  const student = students.find((s) => s.id === id);

  if (!student) {
    console.log(`No student found with ID ${id}.\n`);
    return;
  }

  console.log(`${student.name}'s average score: ${average(student.scores).toFixed(2)}\n`);
}

// -----------------------------------------------------------------------------
// Menu
// -----------------------------------------------------------------------------
function showMenu() {
  console.log("================================");
  console.log("   STUDENT RECORD SYSTEM MENU");
  console.log("================================");
  console.log("1. Add student");
  console.log("2. Display all students");
  console.log("3. Calculate average score");
  console.log("4. Quit");
}

function main() {
  let running = true;

  while (running) {
    showMenu();
    const choice = readlineSync.question("Enter your choice (1-4): ").trim();

    switch (choice) {
      case "1":
        addStudent();
        break;
      case "2":
        displayAllStudents();
        break;
      case "3":
        calculateAverageById();
        break;
      case "4":
        console.log("Goodbye!");
        running = false;
        break;
      default:
        console.log("Invalid choice. Please enter a number between 1 and 4.\n");
    }
  }
}

main();
