Hi, Everyone,👋

# Todo App

## Project Description

Todo App is designed for managing daily tasks in a simple and creative manner, making them achievable with high visibility for task priority and categories, ensuring productivity in daily life.

## Features
1. **Create Task Form:** A simple and user-friendly form for creating tasks.
2. **Kanban View:** Organizes tasks into boards with columns like Added, Started, Completed.
3. **Drag and Drop:** Allows users to easily move tasks between boards using drag-and-drop functionality.
4. **Visual Appeal:** Provides a visually appealing UI & UX for a pleasant user experience.
5. **User Interaction:** Engages users with interactive elements and ensures proper input.
6. **Redux State Management:** Implements Redux for unidirectional state management.

## Additional Features

- **Subtasks:** Tasks can have subtasks for breaking down complex tasks into manageable parts.
- **Task Ownership:** Assign ownership of tasks to specific users for better accountability.
- **Task Priority:** Set task priority levels (high, medium, low) to manage workload efficiently.

## Installation

1. Clone the Repository:
   ```bash
   git clone https://github.com/rohity0/todo-app.git
   ```

### Installation

1. Clone the Repository -
2. cd task-management
3. npm install
4. There you go

## Run Command

1. Required two terminal in vs code
2. npm run start -\*\*1st command to start the react
3. json-server --watch db.json --port 5000 -\*\* 2nd Command - to start json-server

### Folder Structure

```bash
todo-app/
│
├── src/
│   ├── components/
│   │   └── TaskCards.jsx
│
├── Modals/
│   └── CreateTask.js
│
├── Pages/
│   └── Homepage.jsx
│   └── MainRoues.jsx
│
├── Redux/
│   └── AppReducer/
│       ├── action.js
│       ├── actionType.js
│       └── reducer.js
│   └── store.js
│
├── public/
│   └── index.html
│
├── package.json
├── README.md
└── ...
```

### Technologies Used

1. React
2. JavaScript
3. CSS
4. External Library (react-beautiful-dnd)
5. Chakra UI Library
