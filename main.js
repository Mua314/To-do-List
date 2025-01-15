window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  // Görevleri localStorage'dan yükle
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // LocalStorage'a görevleri kaydet
  const saveTasksToLocalStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Yeni görev elementi oluştur
  const createTaskElement = (taskText) => {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = taskText;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);
    task_el.appendChild(task_content_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerHTML = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);

    task_el.appendChild(task_actions_el);

    // Edit butonu için event listener
    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLowerCase() == "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "Edit";

        // LocalStorage'da güncelle
        const index = tasks.indexOf(taskText);
        if (index > -1) {
          tasks[index] = task_input_el.value;
          saveTasksToLocalStorage();
        }
      }
    });

    // Delete butonu için event listener
    task_delete_el.addEventListener("click", () => {
      list_el.removeChild(task_el);

      // LocalStorage'dan sil
      const index = tasks.indexOf(taskText);
      if (index > -1) {
        tasks.splice(index, 1);
        saveTasksToLocalStorage();
      }
    });

    return task_el;
  };

  // Sayfa yüklendiğinde localStorage'dan görevleri ekrana yazdır
  tasks.forEach((task) => {
    const task_el = createTaskElement(task);
    list_el.appendChild(task_el);
  });

  // Form submit olayı
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;

    if (!task) {
      alert("Please add a task");
      return;
    }

    // Görevi localStorage'a ekle
    tasks.push(task);
    saveTasksToLocalStorage();

    // Görevi ekrana yazdır
    const task_el = createTaskElement(task);
    list_el.appendChild(task_el);

    input.value = "";
  });
});
