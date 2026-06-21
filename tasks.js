export function createTask(text, priority = "low", deadline = null) {
  return {
    id: Date.now(),
    text,
    completed: false,
    createdAt: Date.now(),
    priority,
    deadline,
  };
}

export function deleteTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

export function findTaskById(tasks, taskId) {
  return tasks.find((task) => task.id === taskId);
}

export function getTaskStats(tasks) {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const active = total - completed;

  return {
    total,
    active,
    completed,
  };
}

export function filterTasks(tasks, filter) {
  if (filter === "active") {
    return tasks.filter((task) => !task.completed);
  }

  if (filter === "completed") {
    return tasks.filter((task) => task.completed);
  }

  return tasks;
}

export function sortTasks(tasks, sortType) {
  if (sortType === "newOld") {
    return [...tasks].sort((a, b) => b.createdAt - a.createdAt);
  }

  if (sortType === "deadline") {
    return [...tasks].sort(
      (a, b) => new Date(a.deadline) - new Date(b.deadline),
    );
  }

  if (sortType === "priority") {
    const priorityOrder = {
      low: 1,
      medium: 2,
      high: 3,
    };

    return [...tasks].sort(
      (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority],
    );
  }

  return tasks;
}
