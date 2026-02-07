# 📋 Todo List Application

A modern web application for managing tasks and projects with an intuitive user interface.

## ✨ Key Features

### 📝 Task Management
- **Add tasks** with name, description, due date/time
- **Edit** existing tasks
- **Delete** tasks
- **Priority tracking**: 🔴 High, 🟡 Medium, 🟢 Low
- **Tags** for categorization and quick search
- **Overdue warnings** for tasks past their due date

### 📁 Project Management
- Create new projects
- Delete projects
- Add tasks to projects
- View tasks by project

### 🔍 Search and Filter
Find tasks by:
- **Name**
- **Words in description**
- **Tags** (single or multiple)
- **Priority**

### 📅 Date Filtering
View tasks for:
- **Today** (by day)
- **Current week** (by week)
- **Current month** (by month)
- **All tasks**

## 🛠️ Tech Stack

- **Vite** - Build tool
- **React 19** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **date-fns** - Date utility library
- **uuid** - Unique ID generator
- **Lucide React** - Icon library

## 📦 Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Start development server**:
```bash
npm run dev
```

3. **Open in browser**: http://localhost:5173

## 🚀 Available Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Lint code with ESLint
```

## 📖 Quick Start

1. Add a new task with name, description, and priority
2. Organize tasks into projects
3. Search and filter tasks by name, description, or tags
4. View tasks for specific time periods (day, week, month)
5. All data is automatically saved to browser storage

## 📁 Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx          # Task creation/editing
│   ├── TaskCard.jsx          # Individual task display
│   ├── TaskList.jsx          # Task list view
│   ├── SearchBar.jsx         # Search & filtering
│   ├── DateFilter.jsx        # Date filtering
│   └── ProjectManager.jsx    # Project management
├── App.jsx                   # Main component
├── App.css                   # App styles
├── main.jsx                  # Entry point
└── index.css                 # Global styles
```

## 💾 Data Storage

All tasks and projects are automatically saved in browser's local storage.

---

**Built with ❤️ using Vite + React**
