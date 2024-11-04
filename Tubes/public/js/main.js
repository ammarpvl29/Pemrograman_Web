// main.js
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyAssynJdOq-sZQSYZkd1C098wmQBqMP65Q",
  authDomain: "to-doit-3b6be.firebaseapp.com",
  databaseURL: "https://to-doit-3b6be-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "to-doit-3b6be",
  storageBucket: "to-doit-3b6be.firebasestorage.app",
  messagingSenderId: "259148851304",
  appId: "1:259148851304:web:e466d78545a72048b3f3dd",
  measurementId: "G-Q294ND2QS6"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Abstract class TodoItemFormatter
class TodoItemFormatter {
  formatTask(task) {
    return task.length > 14 ? task.slice(0, 14) + "..." : task;
  }

  formatDueDate(dueDate) {
    return dueDate || "No due date";
  }

  formatStatus(completed) {
    return completed ? "Completed" : "Pending";
  }
}

// Class untuk manage item ToDO
class TodoManager {
  constructor(todoItemFormatter) {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.todoItemFormatter = todoItemFormatter;
  }

  addTodo(task, dueDate) {
    const newTodo = {
      id: this.getRandomId(),
      task: this.todoItemFormatter.formatTask(task),
      dueDate: this.todoItemFormatter.formatDueDate(dueDate),
      completed: false,
      status: "pending",
    };
    this.todos.push(newTodo);
    this.saveToLocalStorage();
    return newTodo;
  }

  editTodo(id, updatedTask) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.task = updatedTask;
        this.saveToLocalStorage();
      }
      return todo;
    }
  
    deleteTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.saveToLocalStorage();
    }
  
    toggleTodoStatus(id) {
      const todo = this.todos.find((t) => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.saveToLocalStorage();
      }
    }
  
    clearAllTodos() {
      if (this.todos.length > 0) {
        this.todos = [];
        this.saveToLocalStorage();
      }
    }
  
    filterTodos(status) {
      switch (status) {
        case "all":
          return this.todos;
        case "pending":
          return this.todos.filter((todo) => !todo.completed);
        case "completed":
          return this.todos.filter((todo) => todo.completed);
        default:
          return [];
      }
    }
  
    getRandomId() {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    }
  
    saveToLocalStorage() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    }
}

// Class untuk handle UI dan event listener
class UIManager {
  checkAuth() {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        // Redirect ke login page jika user tidak terautentikasi
        window.location.href = 'index.html';
      }
    });
  }
  initializeProfile() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDisplay = document.getElementById('userDisplay');
        const emailDisplay = document.getElementById('emailDisplay');
  
        if (userDisplay) {
          userDisplay.textContent = user.displayName || 'User';
        }
        if (emailDisplay) {
          emailDisplay.textContent = user.email;
        }
      }
    });
  }
  constructor(todoManager, todoItemFormatter) {
    // Check autentikasi dulu
    this.checkAuth();

    // Inisialisasi properti
    this.todoManager = todoManager;
    this.todoItemFormatter = todoItemFormatter;
    
    // Update selector dan tambah null checks
    this.taskInput = document.querySelector("input[type='text']"); // More specific selector
    this.dateInput = document.querySelector("input[type='date']");
    this.addBtn = document.querySelector(".btn-secondary"); // Match HTML class
    this.todosListBody = document.querySelector(".todos-list-body");
    this.alertMessage = document.querySelector(".alert-message");
    this.deleteAllBtn = document.querySelector(".delete-all-btn");
    this.signOutBtn = document.getElementById('signOutBtn');

    // Validasi elemen
    if (!this.taskInput || !this.addBtn || !this.todosListBody) {
      console.error('Required UI elements not found');
      return;
    }

    this.addEventListeners();
    this.showAllTodos();
    this.initializeProfile();
  }

  addEventListeners() {
    // Add null checks sebelum adding listeners
    if (this.addBtn) {
      this.addBtn.addEventListener("click", () => {
        this.handleAddTodo();
      });
    }

    if (this.taskInput) {
      this.taskInput.addEventListener("keyup", (e) => {
        if (e.keyCode === 13 && this.taskInput.value.length > 0) {
          this.handleAddTodo();
        }
      });
    }

    if (this.deleteAllBtn) {
      this.deleteAllBtn.addEventListener("click", () => {
        this.handleClearAllTodos();
      });
    }

    if (this.signOutBtn) {
      this.signOutBtn.addEventListener('click', async () => {
        try {
          await signOut(auth);
          window.location.href = 'index.html';
        } catch (error) {
          this.showAlertMessage('Failed to sign out', 'error');
        }
      });
    }

    // Filter buttons dengan null check
    const filterButtons = document.querySelectorAll(".todos-filter li");
    if (filterButtons.length > 0) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
          const status = button.textContent.toLowerCase();
          this.handleFilterTodos(status);
        });
      });
    }
  }

  handleAddTodo() {
    const task = this.taskInput.value;
    const dueDate = this.dateInput.value;
    if (task === "") {
      this.showAlertMessage("Please enter a task", "error");
    } else {
      const newTodo = this.todoManager.addTodo(task, dueDate);
      this.showAllTodos();
      this.taskInput.value = "";
      this.dateInput.value = "";
      this.showAlertMessage("Task added successfully", "success");
    }
  }

  handleClearAllTodos() {
    this.todoManager.clearAllTodos();
    this.showAllTodos();
    this.showAlertMessage("All todos cleared successfully", "success");
  }

  showAllTodos() {
    const todos = this.todoManager.filterTodos("all");
    this.displayTodos(todos);
  }

  displayTodos(todos) {
    this.todosListBody.innerHTML = "";
    
    if (todos.length === 0) {
      this.todosListBody.innerHTML = `<tr><td colspan="5" class="text-center">No task found</td></tr>`;
      return;
    }
      
    todos.forEach((todo) => {
      this.todosListBody.innerHTML += `
        <tr class="todo-item" data-id="${todo.id}">
          <td>${this.todoItemFormatter.formatTask(todo.task)}</td>
          <td>${this.todoItemFormatter.formatDueDate(todo.dueDate)}</td>
          <td>${this.todoItemFormatter.formatStatus(todo.completed)}</td>
          <td>
            <button class="btn btn-warning btn-sm edit-btn">
              <i class="bx bx-edit-alt bx-bx-xs"></i>    
            </button>
            <button class="btn btn-success btn-sm toggle-btn">
              <i class="bx bx-check bx-xs"></i>
            </button>
            <button class="btn btn-error btn-sm delete-btn">
              <i class="bx bx-trash bx-xs"></i>
            </button>
          </td>
        </tr>
      `;
    });
  
    // Tambah event listeners ke buttons
    this.todosListBody.querySelectorAll('.todo-item').forEach(item => {
      const id = item.dataset.id;
      item.querySelector('.edit-btn').addEventListener('click', () => this.handleEditTodo(id));
      item.querySelector('.toggle-btn').addEventListener('click', () => this.handleToggleStatus(id));
      item.querySelector('.delete-btn').addEventListener('click', () => this.handleDeleteTodo(id));
    });
  }
    

  
  handleEditTodo(id) {
    const todo = this.todoManager.todos.find((t) => t.id === id);
    if (todo) {
      this.taskInput.value = todo.task;
      this.todoManager.deleteTodo(id);

      const handleUpdate = () => {
        this.addBtn.innerHTML = "<i class='bx bx-plus bx-sm'></i>";
        this.showAlertMessage("Todo updated successfully", "success");
        this.showAllTodos();
        this.addBtn.removeEventListener("click", handleUpdate);
      };

      this.addBtn.innerHTML = "<i class='bx bx-check bx-sm'></i>";
      this.addBtn.addEventListener("click", handleUpdate);
    }
  }


  handleToggleStatus(id) {
  this.todoManager.toggleTodoStatus(id);
  this.showAllTodos();
  }

  handleDeleteTodo(id) {
  this.todoManager.deleteTodo(id);
  this.showAlertMessage("Todo deleted successfully", "success");
  this.showAllTodos();
  }


  handleFilterTodos(status) {
    const filteredTodos = this.todoManager.filterTodos(status);
    this.displayTodos(filteredTodos);
  }


  showAlertMessage(message, type) {
    const alertBox = `
      <div class="alert alert-${type} shadow-lg mb-5 w-full">
        <div>
          <span>${message}</span>
        </div>
      </div>
    `;
    this.alertMessage.innerHTML = alertBox;
    this.alertMessage.classList.remove("hide");
    this.alertMessage.classList.add("show");
    setTimeout(() => {
        this.alertMessage.classList.remove("show");
        this.alertMessage.classList.add("hide");
      }, 3000);
    }
}

// Class untuk mengganti theme (belum diimplementasikan)
class ThemeSwitcher {
constructor(themes, html) {
  this.themes = themes;
  this.html = html;
  this.init();
}

init() {
  const theme = this.getThemeFromLocalStorage();
  if (theme) {
    this.setTheme(theme);
  }

  this.addThemeEventListeners();
}

addThemeEventListeners() {
  this.themes.forEach((theme) => {
    theme.addEventListener("click", () => {
      const themeName = theme.getAttribute("theme");
      this.setTheme(themeName);
      this.saveThemeToLocalStorage(themeName);
    });
  });
}

setTheme(themeName) {
  this.html.setAttribute("data-theme", themeName);
}

saveThemeToLocalStorage(themeName) {
  localStorage.setItem("theme", themeName);
}

getThemeFromLocalStorage() {
  return localStorage.getItem("theme");
}
}



// At the bottom of main.js, modifikasi inisialisasi UIManager:
document.addEventListener('DOMContentLoaded', () => {
  const todoItemFormatter = new TodoItemFormatter();
  const todoManager = new TodoManager(todoItemFormatter);
  // uiManager global
  window.uiManager = new UIManager(todoManager, todoItemFormatter);
});