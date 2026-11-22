document.addEventListener('DOMContentLoaded', () => {
    
    // Study planner logic
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    if (taskInput && addTaskBtn && taskList) {
        let tasks = JSON.parse(localStorage.getItem('academicTasks')) || [
            { text: 'Submit COS 106 web project', completed: false }
        ];

        function saveAndRenderTasks() {
            localStorage.setItem('academicTasks', JSON.stringify(tasks));
            taskList.innerHTML = '';

            tasks.forEach((task, index) => {
                const li = document.createElement('li');
                li.className = `task-item ${task.completed ? 'completed' : ''}`;

                const span = document.createElement('span');
                span.textContent = task.text;

                const actionsDiv = document.createElement('div');
                actionsDiv.className = 'task-actions';

                const completeBtn = document.createElement('button');
                completeBtn.textContent = task.completed ? 'Undo' : 'Done';
                completeBtn.className = 'complete-btn';
                completeBtn.addEventListener('click', () => toggleTask(index));

                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Remove';
                deleteBtn.className = 'delete-btn';
                deleteBtn.addEventListener('click', () => deleteTask(index));

                actionsDiv.appendChild(completeBtn);
                actionsDiv.appendChild(deleteBtn);
                li.appendChild(span);
                li.appendChild(actionsDiv);
                taskList.appendChild(li);
            });
        }

        function addTask() {
            const text = taskInput.value.trim();
            if (!text) {
                taskInput.focus();
                return;
            }
            tasks.push({ text, completed: false });
            taskInput.value = '';
            saveAndRenderTasks();
        }

        function toggleTask(index) {
            tasks[index].completed = !tasks[index].completed;
            saveAndRenderTasks();
        }

        function deleteTask(index) {
            tasks.splice(index, 1);
            saveAndRenderTasks();
        }

        addTaskBtn.addEventListener('click', addTask);
        taskInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') addTask();
        });

        saveAndRenderTasks();
    }

    // Contact form checks
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!fullName || !email || !phone || !message) {
                showFeedback('Please fill in all fields before sending.', 'red');
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showFeedback('That email address doesn’t look right. Please check it.', 'red');
                return;
            }

            const digitsOnlyPattern = /^\d+$/;
            if (!digitsOnlyPattern.test(phone)) {
                showFeedback('Please enter digits only for your phone number (e.g., 07065299826).', 'red');
                return;
            }

            showFeedback('Thanks! Your message has been sent.', 'green');
            contactForm.reset();
        });

        function showFeedback(msg, color) {
            formFeedback.textContent = msg;
            formFeedback.style.color = color;
        }
    }
});
