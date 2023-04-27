/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('agh');

// Insert a few documents into the students collection.
// db.getCollection('students').insertMany([
//   { firstName: 'Jakub', lastName: 'Szaredko', faculty: 'WIEiT' },
//   { firstName: 'Jan', lastName: 'Błachowicz', faculty: 'WMS' },
//   { firstName: 'Jan', lastName: 'Miśkowiec', faculty: 'WIMiIP' },
//   { firstName: 'Joanna', lastName: 'Żądło', faculty: 'WIEiT' },
//   { firstName: 'Agnieszka', lastName: 'Brokuła', faculty: 'WMS' },
//   { firstName: 'Robert', lastName: 'Mnich', faculty: 'WIEiT' },
//   { firstName: 'Alicja', lastName: 'Truta', faculty: 'WIEiT' }
// ]);

// Run a find command to view students
const wieitStudents = db.getCollection('students').find({
  faculty: 'WIEiT'
});

// Print a message to the output window.
console.log(`WIEiT students`, students);