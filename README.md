# 📝 Task Tracker CLI

a simple command-line task manager written in Node.js. add, update, delete, and list tasks right from your terminal with persistent JSON storage. you can mark tasks as todo, in-progress or done.

## 📦 Installation
```
git clone https://github.com/trenter39/tasktracker.git
cd tasktracker
npm install -g
```
now you can use `task-cli` from anywhere in your terminal.

## 🛠️ Usage

### Add a task
```
task-cli add Wash the dishes
```

### Update a task
```
task-cli update 1  Wash the dishes and dry them
```

### Delete a task
```
task-cli delete 1
```

### Mark task as done / in progress / todo
```
task-cli mark-done 2
task-cli mark-in-progress 3
task-cli mark-todo 4
```

### List tasks
```
task-cli list
task-cli list done
task-cli list todo
task-cli list in-progress
```

### Help
```
task-cli help
```

## 📂 Task Format

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