const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const writeFileAs = util.promisify(fs.writeFile)

const render = require("./lib/htmlRenderer");

const employees = [];

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's your managers name?",
      },
      {
        type: "input",
        name: "id",
        message: "What's is your managers id?",
      },
      {
        type: "input",
        name: "email",
        message: "What's your managers email?",
      },
      {
        type: "input",
        name: "office",
        message: "What's your managers office number?",
      },
    ])
    .then(function (answers) {
      const manager = new Manager(
        answers.name,
        parseInt(answers.id),
        answers.email,
        parseInt(answers.office)
      );
      employees.push(manager);
      addMember();
    });
}

function addMember() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "type",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members",
        ],
      },
    ])
    .then(function (answer) {
      if (answer.type === "Engineer") {
        createEngineer();
      } else if (answer.type === "Intern") {
        createIntern();
      } else {
        console.log(employees);
        const html = render(employees);
        return writeFileAsync("./output/team.html", html);
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's your engineers name?",
      },
      {
        type: "input",
        name: "id",
        message: "What's your engineers id?",
      },
      {
        type: "input",
        name: "email",
        message: "What's your engineers email?",
      },
      {
        type: "input",
        name: "github",
        message: "What's your engineers github?",
      },
    ])
    .then(function (answers) {
      const engineer = new Engineer(
        answers.name,
        parseInt(answers.id),
        answers.email,
        answers.github
      );
      employees.push(engineer);
      addMember();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What's your interns name?",
      },
      {
        type: "input",
        name: "id",
        message: "What's your interns id?",
      },
      {
        type: "input",
        name: "email",
        message: "What's your interns email?",
      },
      {
        type: "input",
        name: "school",
        message: "What's your interns school?",
      },
    ])
    .then(function (answers) {
      const intern = new Intern(
        answers.name,
        parseInt(answers.id),
        answers.email,
        answers.school
      );
      employees.push(intern);
      addMember();
    });
}
createManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
