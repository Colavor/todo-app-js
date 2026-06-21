export function renderTasks(tasks, container) {
  container.innerHTML = "";

  tasks.forEach((task) => {
    //createTask(LI)
    const li = document.createElement("li");
    li.dataset.id = task.id;

    //createCheckbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = task.completed;
    checkBox.classList.add("checkbox-btn");
    checkBox.dataset.id = task.id;

    //createTextforTask
    const text = document.createElement("span");
    text.textContent = task.text;

    //createEditButton
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.dataset.id = task.id;

    //createDeleteButton
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.dataset.id = task.id;

    //createTaskInfo
    const taskInfo = document.createElement("span");

    if (task.deadline) {
      taskInfo.textContent = ` | Deadline: ${task.deadline}`;
    } else {
      taskInfo.textContent = " | None";
    }

    li.append(text, checkBox, deleteBtn, editBtn, taskInfo);

    container.append(li);
  });
}
