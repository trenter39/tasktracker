# Task Tracker

a command-line task manager, where you can add, update, delete, and list tasks right from your terminal with persistent JSON storage. also you can mark tasks as todo, in-progress or done.

## Installation
```
git clone https://github.com/trenter39/tasktracker.git
cd tasktracker
npm install -g
```
now you can use `task-cli` from anywhere in your terminal.

## Task Format

each task is saved in `tasks.json` with this structure:
```
{
    "id": 1,
    "description": "Example task",
    "status": "todo",
    "createdAt": "2025-06-21T17:53:23.481Z",
    "updatedAt": "2025-06-21T17:53:23.481Z"
}
```

![task tracker preview](https://github.com/trenter39/tasktracker/blob/master/preview.png)