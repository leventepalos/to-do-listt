// Változók
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const taskList = document.getElementById('taskList');

// Feladatok betöltése localStorage-ból
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Feladatok megjelenítése az oldalon
function renderTasks() {
    taskList.innerHTML = ''; // Lista ürítése

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        const currentDate = new Date().toISOString().split('T')[0]; // Mai dátum

        li.innerHTML = `
            <span>${task.name} - Határidő: ${task.deadline}</span>
            <div>
                <button onclick="deleteTask(${index})">Törlés</button>
                ${task.deadline < currentDate ? '<button class="reminder">Emlékeztető!</button>' : ''}
            </div>
        `;

        taskList.appendChild(li);
    });
}

// Új feladat hozzáadása
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const taskName = taskInput.value;
    const taskDeadline = deadlineInput.value;

    if (taskName && taskDeadline) {
        const newTask = { name: taskName, deadline: taskDeadline };
        tasks.push(newTask);

        // Feladatok mentése localStorage-ba
        localStorage.setItem('tasks', JSON.stringify(tasks));

        taskInput.value = '';
        deadlineInput.value = '';

        renderTasks();
    }
});

// Feladat törlése
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Alkalmazás inicializálása (feladatok megjelenítése)
renderTasks();
