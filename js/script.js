{
    const tasks = [];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
             <li class="taskList__item">
                <button class="js-done taskList__button--Done">
                     ${task.done ? "✔" : ""}
                </button>
                <span ${task.done ? "class=\"taskList__task_content--done\"" : ""}>${task.content}</span>
                <button class="js-remove taskList__button--Remove">
                    🗑
                </button>
             </li>
        `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFromSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask")
        const newTask = newTaskContent.value.trim();

        if (newTask !== "") {
            addNewTask(newTask);
            newTaskContent.value = "";
        }

        newTaskContent.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFromSubmit);
    };

    init();
}