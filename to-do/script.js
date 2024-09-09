const prompt = require('prompt-sync')({
  sigint: true
});
/*
note for Veronica

so i set up the messages (both the successful and the not successful)
in an object to make it easier and to try and implement what we did in the last lesson.
I'm not entire sure if that is the best way to do it.

there might be some inconsistencies in how i handled the validation of the input in some of the fuctions but i realized later on that i should add it 
to avoid users breaking everything.
it was a bit of a pain to refactor everything. I had to break things a couple of times before it actually worked

i thought about doing a function dedicated for the validation of the inputs and i tried it but i didn't have enough time to implement it and test it.

I had to take a look at the solution for the removal with the splice. That has been a pain
to implement and i spent almost 2 hours working on that before admitting defeat and checking the solution.
i will probably ask Wes to go through it again, at least once.

I added an option to modify the task ( option number 5) and weirdly enough,
it was easier to set it up than it was to set up the splice for the removal

I tried to comment on everything but if something is a bit messed up, let me know, please.

Any advice on how it could and should be improved or fixed is very welcome.

*/

//define the welcome message
const welcomeMessage = `
Welcome to yet another to-do list (this one's free though)
It might work, it might not, but at the end of the day, Who cares about your silly little tasks anyway?

Choose an option before the server gets bored and self-destructs:
1. View your really unimportant tasks (that nobody cares about)
2. Add a silly task (that you will not complete)
3. Complete a task (finally)
4. Delete a task (out of sight, out of mind)
5. Modify a task (and by modifying, i mean making it easier)
6. Run away from your job and move to another country
`;
//tried to set up the error messages using what we did in the last lesson. 
//Not entirely sure that it's best practice, or even an acceptable scenario
const messages = {
  errorNoTask: " WRONG! There are no tasks in the list. Either you add them (option 2) or you beat it (option 6 )",
  errorInvalid: " WRONG! View the task list with option 1 and choose a valid task in the Index. ",
  complete: " Task completed successfully!",
  alreadyCompleted: " This task is already completed. Are you trying to cheat the system? ",
  remove: " Task removed successfully! ",
  add: " Task added successfully! ",
  modify: " Task modified successfully! ",
  thanks: " thanks for using our product, this time is free, next time we need payment. Either money or beers ",
  prompt: "<>: ",
  invalidChoice: `
   WRONG! make a choice and input a number from 1 to 6 
  
Let's try again with the possible options 
Choose an option before the server gets bored and self-destructs:
1. View your really unimportant tasks (that nobody cares about)
2. Add a silly task (that you will not complete)
3. Complete a task (finally)
4. Delete a task (out of sight, out of mind)
5. Modify a task (and by modifying, i mean making it easier)
6. Run away from your job and move to another country
`,
  noChoice: `
 Let's try again and this time push a button on your keyboard.

Choose an option before the server gets bored and self-destructs:
1. View your really unimportant tasks (that nobody cares about)
2. Add a silly task (that you will not complete)
3. Complete a task (finally)
4. Delete a task (out of sight, out of mind)
5. Modify a task (and by modifying, i mean making it easier)
6. Run away from your job and move to another country
`,
};
//set up the empty arrays
const tasks = [];
const completed = [];
//print the welcome message
console.log(welcomeMessage);
//set up the function for the view task
//it has to show a list of all the the indexes in the array, and for each one set the status as to be completed.
// If the value is also in the array completed then it set the status as completed
function viewTasks() {
  console.log(" Tasks: ");
  if(tasks.length === 0) {
    console.log(messages.errorNoTask);
  } else {
    tasks.forEach((task, index) => {
      let status = "[To be Completed]";
      if(completed[index]) {
        status = "[Completed]";
      }
      console.log(`${index}. ${task} ${status} `);
    });
  }
}
//set up the fucntion for adding a new task
function addTask() {
  let newTask = "";
  while(newTask === "") {
    newTask = prompt(" Enter a new task: ");
    if(newTask === "") {
      console.log(" The task cannot be empty. Are you planning on doing nothing? ");
    }
  }
  tasks.push(newTask);
  completed.push(false);
  console.log(messages.add);
}
//set up the function to complete the task
function completeTask() {
  if(tasks.length === 0) {
    console.log(messages.errorNoTask);
    return;
  }
  const completeIndex = parseInt(prompt(" Enter the index of the task that you want to complete: "));
  if(isNaN(completeIndex) || completeIndex < 0 || completeIndex >= tasks.length) {
    console.log(messages.errorInvalid);
  } else if(completed[completeIndex]) {
    console.log(messages.alreadyCompleted);
  } else {
    completed[completeIndex] = true;
    console.log(messages.complete);
  }
}
//set the function to remove the task
function removeTask() {
  if(tasks.length === 0) {
    console.log(messages.errorNoTask);
    return;
  }
  const removeIndex = parseInt(prompt(" Enter the index of the task to remove: "));
  if(removeIndex === "") {
    console.log(" Input cannot be empty. Please enter a valid index. ");
    return;
  }
  if(isNaN(removeIndex) || removeIndex < 0 || removeIndex >= tasks.length) {
    console.log(messages.errorInvalid);
    return;
  }
  tasks.splice(removeIndex, 1);
  completed.splice(removeIndex, 1);
  console.log(messages.remove);
}
//function to modify the task.
function modifyTask() {
  if(tasks.length === 0) { //checks if there are tasks in the array and if not will throw an error
    console.log(messages.errorNoTask);
    return;
  }
  const modifyIndex = parseInt(prompt(" Enter the index of the task to modify: ")); //prompt the user for the index and tranforms it into an integer
  if(isNaN(modifyIndex) || modifyIndex < 0 || modifyIndex >= tasks.length) {
    console.log(messages.errorInvalid);
  } else {
    const currentTask = tasks[modifyIndex];
    console.log(`current task: ${currentTask}`); //outputs the current task in the index that the user has chosen
    let newTask = "";
    while(newTask === "") {
      newTask = prompt(" Enter the modified task: "); //asks for the new task and if it's empty it will throw an error
      if(newTask === "") {
        console.log("Task cannot be empty. Please enter a valid task.");
      }
    }
    tasks[modifyIndex] = newTask; //modifies the array
    console.log(messages.modify);
  }
}
//set up the loop. It will continue until the user inputs a 5 or an exit
//and will throw an error in case of invalid input 
while(true) {
  console.log("\n");
  const choice = prompt(messages.prompt);
  switch(choice) {
    case "":
      console.log(messages.noChoice);
      break;
    case "1":
      viewTasks();
      break;
    case "2":
      addTask();
      break;
    case "3":
      completeTask();
      break;
    case "4":
      removeTask();
      break;
    case "5":
      modifyTask();
      break;
    case "6":
      console.log(messages.thanks);
      return;
    case "exit":
      console.log(messages.thanks);
      return;
    default:
      console.log(messages.invalidChoice);
  }
}
