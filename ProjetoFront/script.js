let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const user = {
    level: 1,
    xp: 0,
    xpToNextLevel: 100
}
  
function addXP(amount) {
    user.xp += amount
    
    while (user.xp >= user.xpToNextLevel) {
        user.xp -= user.xpToNextLevel
        user.level++
        user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.2) // dificuldade crescente
        alert(`parabéns! vc subiu pro nível ${user.level} 🔥`)
    }
    
    updateUI()
}
  
function updateUI() {
    document.querySelector('#level').textContent = `LV: ${user.level} ${user.xp}/${user.xpToNextLevel}`
    document.querySelector('#xp-bar').style.width = `${(user.xp / user.xpToNextLevel) * 100}%`
}
  
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();
        if (title) {
            tasks.push({ title, description, done: false });
            saveTasks();
            renderTasks();
            form.reset();
        };
    });

    renderTasks();
    updateUI()
})

function renderTasks() {
    const container = document.getElementById('tasks-container');
    
    container.innerHTML = '';
    tasks.forEach((task, index) => {
        var isConcluded = task.done;

        const div = document.createElement('div');
        div.className = 'task' + (task.done ? ' done' : '');
        div.innerHTML = `
        <strong>${task.title}</strong><br>
        <span>${task.description || ''}</span>
        <div class="task-buttons">
            <button onclick="toggleDone(${index})">${isConcluded ? "❌" : "✔️"}</button>
            <button onclick="deleteTask(${index})">⛔</button>
        </div>
        `;
        container.appendChild(div);
    });
};

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function toggleDone(index) {
    var isConcluded = tasks[index].done;
    tasks[index].done = !isConcluded;
    addXP(isConcluded ? -10 : 10)

    saveTasks();
    renderTasks();
};

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
};