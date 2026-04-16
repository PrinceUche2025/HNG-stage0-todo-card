// Current App State
let appState = {
    title: "Stage 1 Task",
    description: "Build an interactive and stateful Todo card with perfect accessibility and responsiveness.",
    priority: "High",
    status: "Pending",
    dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString().slice(0, 16) 
};

// Elements
const cardElement = document.getElementById('todo-card');
const viewLayer = document.getElementById('view-mode');
const editLayer = document.getElementById('edit-form');
const statusCheck = document.getElementById('status-checkbox');
const statusSelect = document.getElementById('status-control');
const toggleBtn = document.getElementById('expand-btn');
const textSection = document.getElementById('collapsible-section');

// Syncing Logic
function applyStatusUpdate(val) {
    appState.status = val;
    statusCheck.checked = (val === "Done");
    statusSelect.value = val;
    refreshView();
}

statusCheck.onchange = (e) => applyStatusUpdate(e.target.checked ? "Done" : "Pending");
statusSelect.onchange = (e) => applyStatusUpdate(e.target.value);

// View/Edit Transitions
document.getElementById('edit-btn').onclick = () => {
    viewLayer.classList.add('hidden');
    editLayer.classList.remove('hidden');
    document.getElementById('edit-title').value = appState.title;
    document.getElementById('edit-description').value = appState.description;
    document.getElementById('edit-priority').value = appState.priority;
    document.getElementById('edit-due-date').value = appState.dueDate;
};

document.getElementById('save-btn').onclick = () => {
    appState.title = document.getElementById('edit-title').value;
    appState.description = document.getElementById('edit-description').value;
    appState.priority = document.getElementById('edit-priority').value;
    appState.dueDate = document.getElementById('edit-due-date').value;
    hideEdit();
};

document.getElementById('cancel-btn').onclick = hideEdit;

function hideEdit() {
    editLayer.classList.add('hidden');
    viewLayer.classList.remove('hidden');
    refreshView();
    document.getElementById('edit-btn').focus();
}

// Collapsible Toggle
toggleBtn.onclick = () => {
    const expanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !expanded);
    textSection.classList.toggle('collapsed');
    toggleBtn.textContent = expanded ? "Show More" : "Show Less";
};

// Timer Logic
function calculateTime() {
    if (appState.status === "Done") {
        document.getElementById('timer-display').textContent = "Completed";
        document.getElementById('overdue-indicator').classList.add('hidden');
        return;
    }

    const deadline = new Date(appState.dueDate);
    const now = new Date();
    const diff = deadline - now;
    const isPast = diff < 0;
    const abs = Math.abs(diff);

    document.getElementById('overdue-indicator').classList.toggle('hidden', !isPast);
    document.getElementById('timer-display').classList.toggle('overdue-accent', isPast);

    const d = Math.floor(abs / 86400000);
    const h = Math.floor((abs % 86400000) / 3600000);
    const m = Math.floor((abs % 3600000) / 60000);

    let output = isPast ? "Overdue " : "Due in ";
    if (d > 0) output += `${d}d `;
    if (h > 0 || d > 0) output += `${h}h `;
    output += `${m}m`;
    
    document.getElementById('timer-display').textContent = output;
}

function refreshView() {
    document.getElementById('display-title').textContent = appState.title;
    document.getElementById('display-description').textContent = appState.description;
    document.getElementById('priority-label').textContent = appState.priority;
    cardElement.setAttribute('data-priority', appState.priority);
    cardElement.classList.toggle('is-done', appState.status === "Done");
    calculateTime();
}

setInterval(calculateTime, 30000);
refreshView();
