import {
  createTask,
  deleteTask,
  findTaskById,
  getTaskStats,
  filterTasks,
  sortTasks,
} from "./tasks.js";
import { renderTasks } from "./ui.js";
import { saveTasks, loadTasks } from "./storage.js";

// DOM ELEMENTS
//task
const input = document.querySelector('[data-input="task"]');
const addBtn = document.querySelector('[data-action="add-task"]');
const tasksList = document.querySelector('[data-list="tasks"]');
const prioritySelect = document.querySelector('[data-input="priority"]');
const deadlineInput = document.querySelector('[data-input="deadline"]');

//updateStats
const totalTasks = document.querySelector('[data-stats="total"]');
const activeTasks = document.querySelector('[data-stats="active"]');
const completedTasks = document.querySelector('[data-stats="completed"]');

//modal
const editModal = document.querySelector('[data-modal="edit"]');
const editTextInput = document.querySelector('[data-edit="text"]');
const editPrioritySelect = document.querySelector('[data-edit="priority"]');
const editDeadlineInput = document.querySelector('[data-edit="deadline"]');
const saveModalBtn = document.querySelector('[data-edit="save"]');
const cancelModalBtn = document.querySelector('[data-edit="cancel"]');

//sort
const filterSelect = document.querySelector(".filter");
const sortSelect = document.querySelector(".sort");

let tasks = loadTasks();

function addNewTask() {
  const text = input.value.trim();
  const priority = prioritySelect.value;
  const deadline = deadlineInput.value;

  if (!text) {
    alert("Enter the task");
    return; //Нужно уведомления что ошибка
  }

  const newTask = createTask(text, priority, deadline);
  tasks.push(newTask);

  updateUI();

  clearForm();
}

function clearForm() {
  input.value = "";
  prioritySelect.value = "low";
  deadlineInput.value = "";
}

function removeTask(event) {
  if (!event.target.classList.contains("delete-btn")) return;

  const taskId = Number(event.target.dataset.id);

  const isConfirmed = confirm("Delete this task?");

  if (!isConfirmed) return;

  tasks = deleteTask(tasks, taskId);

  updateUI();
}

function checkBoxChange(event) {
  if (!event.target.classList.contains("checkbox-btn")) return;

  const taskId = Number(event.target.dataset.id);

  const task = findTaskById(tasks, taskId);

  if (task) {
    task.completed = event.target.checked;
  }

  updateUI();
}

function updateStats() {
  const stats = getTaskStats(tasks);

  totalTasks.textContent = `Всего: ${stats.total}`;
  activeTasks.textContent = `Активных: ${stats.active}`;
  completedTasks.textContent = `Выполненных: ${stats.completed}`;
}

// ====================
// MODAL
// ====================
let currentEditingTask = null;

function openModal(event) {
  if (!event.target.classList.contains("edit-btn")) return;

  const taskId = Number(event.target.dataset.id);

  const currentObj = findTaskById(tasks, taskId);

  if (!currentObj) return;

  currentEditingTask = currentObj;

  editTextInput.value = currentObj.text;
  editPrioritySelect.value = currentObj.priority;
  editDeadlineInput.value = currentObj.deadline;

  editModal.classList.remove("hidden");
}

function saveEditedTask() {
  if (!currentEditingTask) return;

  currentEditingTask.text = editTextInput.value.trim();
  currentEditingTask.priority = editPrioritySelect.value;
  currentEditingTask.deadline = editDeadlineInput.value;

  updateUI();

  closeModal();
}

function closeModal() {
  editTextInput.value = "";
  editPrioritySelect.value = "low";
  editDeadlineInput.value = "";

  currentEditingTask = null;

  editModal.classList.add("hidden");
}

// UI
function updateUI() {
  let result = filterTasks(tasks, filterSelect.value);

  result = sortTasks(result, sortSelect.value);

  renderTasks(result, tasksList);

  updateStats();
  saveTasks(tasks);
}

// EVENT LISTENERS
addBtn.addEventListener("click", addNewTask);

tasksList.addEventListener("click", removeTask);

tasksList.addEventListener("change", checkBoxChange);

tasksList.addEventListener("click", openModal);

cancelModalBtn.addEventListener("click", closeModal);

saveModalBtn.addEventListener("click", saveEditedTask);

filterSelect.addEventListener("change", updateUI);

sortSelect.addEventListener("change", updateUI);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addNewTask();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (editModal.classList.contains("hidden")) return;

  closeModal();
});

updateUI();
