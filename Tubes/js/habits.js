// FILE: js/habits.js

document.addEventListener('DOMContentLoaded', () => {
    const habitsList = document.querySelector('.habits-list');

    // Fetch habits from local storage
    const habits = JSON.parse(localStorage.getItem('habits')) || [];

    // Render habits
    habits.forEach(habit => {
        const habitElement = document.createElement('div');
        habitElement.classList.add('habit');
        habitElement.innerHTML = `
            <h3>${habit.name}</h3>
            <p>Completed: ${habit.completed} times</p>
        `;
        habitsList.appendChild(habitElement);
    });
});