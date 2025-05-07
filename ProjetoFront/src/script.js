let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const user = JSON.parse(localStorage.getItem('user')) || {
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
        alert(`Parabéns! Você subiu para o nível ${user.level} 🔥`)
    }

    localStorage.setItem('user', JSON.stringify(user));
    
    updateUI()
}
  
function updateUI() {
    document.querySelector('#level').textContent = `LV: ${user.level}`
    document.querySelector('#xp-count').textContent = `${user.xp}/${user.xpToNextLevel}`
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
        <div class="task-info">
            <strong class="task-number">${index + 1} -</strong>
            <strong>${task.title}</strong><br>
            <span>${task.description || ''}</span>
        </div>
        <div>
            <span class="btn-task" onclick="toggleDone(${index})">${isConcluded ? "❌" : "✔️"}</span>
            <span class="btn-task" onclick="deleteTask(${index})">⛔</span>
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