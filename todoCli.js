const { Command } = require('commander');
const program = new Command();
const fs = require('fs');


let todoList = [];

try {
    const data = fs.readFileSync('todo.json');
    todoList = JSON.parse(data);
} catch (err) {
    console.log(err);
}

program
    .name('todo') 
    .description('CLI for todo app')
    .version('0.8.0');

program.command('add <task>')
    .description('Add a task to your todo list')
    .action((task) => {
        todoList.push({ todoName: task, completeStatus: false });
        fs.writeFileSync('todo.json', JSON.stringify(todoList));
        console.log(`Added task: "${task}"`);
    });

program.command('list')
    .description('List all tasks')
    .action(() => {
        if (todoList.length === 0) {
            console.log('Your todo list is empty.');
        } else {
            todoList.forEach((task, index) => {
                const status = task.completeStatus ? '[x]' : '[ ]';
                console.log(`${index + 1}. ${status} ${task.todoName}`);
            });
        }
    });


program.command('complete <taskIndex>')
    .description('Complete a particular task')
    .action((taskIndex) => {
        const index = parseInt(taskIndex) -1 ;
        if (index< 0 || index > todoList.length) {
            console.log('Your are targetting a task that do not exist');
        } else {   
                    todoList[index].completeStatus = true;
                    fs.writeFileSync('todo.json', JSON.stringify(todoList));
                    console.log(`Task ${todoList[index].todoName} has been marked as completed`)
            }
        });


 program.command('delete <taskIndex>')
        .description('Delete a particular task')
        .action((taskIndex) => {
            const index = parseInt(taskIndex) -1 ;
            if (index< 0 || index > todoList.length) {
                console.log('Your are targetting a task that do not exist');
            } else {   
                        todoList.splice(index, 1)[0];
                        fs.writeFileSync('todo.json', JSON.stringify(todoList));
                        console.log(`Task  has been deleted`)
                }
            });


program.parse();

