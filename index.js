// 1. Completion Toggle Logic
const toggle = document.getElementById('complete-toggle');
const card = document.querySelector('[data-testid="test-todo-card"]');
const statusBadge = document.querySelector('[data-testid="test-todo-status"]');

toggle.addEventListener('change', () => {
    if (toggle.checked) {
        card.classList.add('completed');
        statusBadge.textContent = 'Completed';
    } else {
        card.classList.remove('completed');
        statusBadge.textContent = 'Pending';
    }
});

// 2. Time Remaining Logic
function updateTimeRemaining() {
    const dueDate = new Date('2026-04-16T18:00:00'); // Set your deadline
    const now = new Date();
    const diff = dueDate - now;

    const timeElement = document.querySelector('[data-testid="test-todo-time-remaining"]');

    if (diff <= 0) {
        timeElement.textContent = "Overdue!";
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
        timeElement.textContent = `Due in ${days} days`;
    } else {
        timeElement.textContent = `Due in ${hours} hours`;
    }
}

// Update every minute
setInterval(updateTimeRemaining, 60000);
updateTimeRemaining();

// 3. Simple Button Actions
document.querySelector('[data-testid="test-todo-edit-button"]').onclick = () => alert('Edit clicked!');
document.querySelector('[data-testid="test-todo-delete-button"]').onclick = () => alert('Delete clicked!');