document.addEventListener('DOMContentLoaded', () => {
    const habitInput = document.querySelector('.input-section input[type="text"]');
    const frequencySelect = document.getElementById('frequency');
    const addHabitButton = document.querySelector('.add-habit-button');
    const habitsListBody = document.querySelector('.habits-list-body');
    const resetButton = document.querySelector('.reset-all-btn');

    // Habit disimpan dalam data lokal dalam .json
    let habits = JSON.parse(localStorage.getItem('habits')) || [];

    // Tambah habit baru
    addHabitButton.addEventListener('click', () => {
        const habitName = habitInput.value.trim();
        const frequency = frequencySelect.value;

        if (habitName) {
            const newHabit = {
                name: habitName,
                frequency: frequency,
                streak: 0,
                lastCompleted: null
            };

            habits.push(newHabit);
            localStorage.setItem('habits', JSON.stringify(habits));
            habitInput.value = '';
            renderHabits();
        }
    });

    // Reset streak
    resetButton.addEventListener('click', () => {
        habits = habits.map(habit => ({
            ...habit,
            streak: 0,
            lastCompleted: null
        }));
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    });

    // Render habit
    function renderHabits() {
        habitsListBody.innerHTML = '';
        
        habits.forEach((habit, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${habit.name}</td>
                <td>${habit.frequency}</td>
                <td>${habit.streak}</td>
                <td>${habit.lastCompleted || 'Never'}</td>
                <td>
                    <button class="btn btn-xs btn-success" onclick="completeHabit(${index})">
                        <i class='bx bx-check'></i>
                    </button>
                    <button class="btn btn-xs btn-error" onclick="deleteHabit(${index})">
                        <i class='bx bx-trash'></i>
                    </button>
                </td>
            `;
            habitsListBody.appendChild(tr);
        });
    }

    // Check habit
    window.completeHabit = (index) => {
        habits[index].streak += 1;
        habits[index].lastCompleted = new Date().toLocaleDateString();
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    };

    // Delete habit
    window.deleteHabit = (index) => {
        habits.splice(index, 1);
        localStorage.setItem('habits', JSON.stringify(habits));
        renderHabits();
    };

    // Render habit
    renderHabits();
});