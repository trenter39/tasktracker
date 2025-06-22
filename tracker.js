#!/usr/bin/env node
import process, { argv } from 'node:process';
import fs from 'fs';

const tasks = loadTasks();
let taskIdCounter = getNextTaskId();

const args = process.argv.slice(2);
const command = args[0];
const payload = args.slice(1).join(' ');

switch (command) {
    case 'add':
        addCommand();
        break;

    case 'update':
        updateCommand();
        break;

    case 'delete':
        deleteCommand();
        break;

    case 'mark-in-progress':
        markInProgressCommand();
        break;

    case 'mark-todo':
        markToDoCommand();
        break;

    case 'mark-done':
        markDoneCommand();
        break;

    case 'list':
        listCommand();
        break;

    case 'help':
        showHelp();
        break;

    default:
        console.log('Unknown command. See help for more information.');
        break;
}

function loadTasks() {
    try {
        const data = fs.readFileSync('tasks.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function getNextTaskId() {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(task => task.id)) + 1;
}

function addCommand() {
    const task = payload.trim();
    if (task) addTask(task);
    else console.log('Invalid format. add Cook');
}

function updateCommand() {
    const match = payload.trim().match(/^(\d+)\s+(.+)$/);
    if (match) {
        const id = Number(match[1]);
        const newDescription = match[2];
        updateTask(id, newDescription);
    }
    else console.log('Invalid format. update 1 Wash');

}

function deleteCommand() {
    const idStr = payload.trim();
    const match = idStr.match(/^\d+$/);
    if (match) deleteTask(Number(idStr));
    else console.log('Invalid format. delete 1');
}

function markInProgressCommand() {
    const idStr = payload.trim();
    const match = payload.match(/^\d+$/);
    if (match) changeTaskStatus(Number(idStr), 'in-progress');
    else console.log('Invalid format. mark-in-progress 1');
}

function markToDoCommand() {
    const idStr = payload.trim();
    const match = payload.match(/^\d+$/);
    if (match) changeTaskStatus(Number(idStr), 'todo');
    else console.log('Invalid format. mark-todo 1');
}

function markDoneCommand() {
    const idStr = payload.trim();
    const match = payload.match(/^\d+$/);
    if (match) changeTaskStatus(Number(idStr), 'done');
    else console.log('Invalid format. mark-done 1');
}

function listCommand() {
    if (!payload) {
        showFullTaskList();
    } else {
        const match = payload.match(/^(done|todo|in-progress)$/);
        if (match) {
            const status = payload;
            switch (status) {
                case 'done': showDoneTaskList(); break;
                case 'todo': showToDoTaskList(); break;
                case 'in-progress': showInProgressTaskList(); break;
            }
        } else {
            console.log('Invalid list command. Use list [done|todo|in-progress]');
        }
    }
}

function addTask(description) {
    const now = new Date();
    const task = {
        id: taskIdCounter++,
        description: description,
        status: 'todo',
        createdAt: now.toISOString(),
        updatedAt: now.toISOString()
    };
    tasks.push(task);
    writeToFile();
    console.log(`Task "${description}" (ID: ${taskIdCounter - 1}) added successfully!`);
}

function updateTask(id, description) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        const taskToUpdate = tasks[index];
        taskToUpdate.description = description;
        taskToUpdate.updatedAt = new Date().toISOString();
        tasks.splice(index, 1, taskToUpdate);
        writeToFile();
    } else {
        console.log(`Task with ID ${id} not found!`);
    }
}

function deleteTask(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index !== -1) {
        const removedTask = tasks.splice(index, 1)[0];
        writeToFile();
        console.log(`Task "${removedTask.description}" (ID: ${removedTask.id}) deleted successfully!`);
    } else {
        console.log(`Task with ID ${id} not found!`);
    }
}

function changeTaskStatus(id, status) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.status = status;
        task.updatedAt = new Date().toISOString();
        writeToFile();
        console.log(`Task "${task.description}" (ID: ${task.id}) marked as ${status}`);
    } else {
        console.log(`Task with ID ${id} not found!`);
    }
}

function showFullTaskList() {
    console.log("Here's the full list of tasks:");
    console.log("ID Description [Status]")
    tasks.forEach(task =>
        console.log(`${task.id}. ${task.description} [${task.status}]`));
}

function showDoneTaskList() {
    const doneTaskList = tasks.filter(task => task.status === 'done');
    console.log("Here's the list of done tasks:");
    console.log("ID Description")
    doneTaskList.forEach(task =>
        console.log(`${task.id}. ${task.description}`));
}

function showToDoTaskList() {
    const toDoTaskList = tasks.filter(task => task.status === 'todo');
    console.log("Here's the list of todo tasks:");
    console.log("ID Description")
    toDoTaskList.forEach(task =>
        console.log(`${task.id}. ${task.description}`));
}

function showInProgressTaskList() {
    const inProgressTaskList = tasks.filter(task => task.status === 'in-progress');
    console.log("Here's the list of in progress tasks:");
    console.log("ID Description")
    inProgressTaskList.forEach(task =>
        console.log(`${task.id}. ${task.description}`));
}

function writeToFile() {
    try {
        fs.writeFileSync('tasks.json', JSON.stringify(tasks, null, 2), 'utf8');
    } catch (err) {
        console.error('Error writing to tasks.json:', err);
    }
}

function showHelp() {
    console.log(`Task tracker CLI supports following commands:
  Command with description:                       Use case:
    add - Add a new task                            add Cook
    update - Update task                            update 1 Wash
    delete - Delete task                            delete 1
    mark-done - Mark task as done                   mark-done 1
    mark-todo - Mark task as todo                   mark-todo 1
    mark-in-progress - Mark task as in progress     mark-in-progress 1
    list - List all the current tasks               list
    list done - List done tasks                     list done
    list todo - List todo tasks                     list todo
    list in-progress - List in progress tasks       list in-progress`);
}