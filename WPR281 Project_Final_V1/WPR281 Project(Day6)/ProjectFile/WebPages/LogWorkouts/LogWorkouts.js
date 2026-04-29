document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        
        window.location.href = 'login/Login.html'; 
        
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("workoutForm");
    const tableBody = document.querySelector("#workoutTable tbody");

    function saveWorkoutsToLocalStorage(workout) {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workouts.push(workout);
        localStorage.setItem("workouts", JSON.stringify(workouts));
    }

    function updateGoalProgress() {
        let workouts = JSON.parse(localStorage.getItem("workouts")) || [];
        let goals = JSON.parse(localStorage.getItem("fitness_goals")) || [];

        goals.forEach(goal => {
            if (goal.type === "calories") {
                let totalBurned = workouts.reduce((sum, w) => sum + parseInt(w.calories), 0);
                let progress = Math.min((totalBurned / goal.amount) * 100, 100);
                let progressBar = document.querySelector(`.progress-bar[data-goal-id='${goal.id}']`);
                if (progressBar) {
                    progressBar.style.width = progress + "%";
                    progressBar.textContent = `${totalBurned} / ${goal.amount} kcal`;
                }
            }
        });
    }

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form from submitting the traditional way

        // Get form values to be used later
        const workoutType = document.getElementById("workoutType").value.trim();
        const duration = document.getElementById("duration").value.trim();
        const calories = document.getElementById("calories").value.trim();
        const caloriesgoal = document.getElementById("caloriesgoal").value.trim();
        const date = document.getElementById("date").value.trim();

        // Validate form fields
        if (!workoutType || !duration || !calories || !caloriesgoal || !date) {
            alert("Please fill out all fields before submitting.");
            return; // Stop the person from going on
        }

        const workout = { type: workoutType, duration, calories, caloriesgoal, date };
        saveWorkoutsToLocalStorage(workout);

        // Creates a new row for the table
        const newRow = document.createElement("tr");

        const typeCell = document.createElement("td");
        typeCell.textContent = workoutType;

        const durationCell = document.createElement("td");
        durationCell.textContent = duration;

        const caloriesCell = document.createElement("td");
        caloriesCell.textContent = calories;

        
        // progress-bar
        const progressCell = document.createElement("td");
        progressCell.innerHTML = `
        <div class="progress-container">
            <div class="progress-bar" style="width: 0%;" data-goal="${caloriesgoal}" data-burned="${calories}">
                ${calories} / ${caloriesgoal} kcal
            </div>
        </div>
    `;

        const dateCell = document.createElement("td");
        dateCell.textContent = date;

        const favouriteCell = document.createElement("td");
        const favouriteBtn = document.createElement("button");
        favouriteBtn.classList.add("favourite-button");
        favouriteBtn.innerHTML = "★"; // Star symbol
        favouriteBtn.addEventListener("click", () => {
            favouriteBtn.classList.toggle("active");
            moveFavouriteToTop(newRow);
        });
        favouriteCell.appendChild(favouriteBtn);

        newRow.appendChild(typeCell);
        newRow.appendChild(durationCell);
        newRow.appendChild(caloriesCell);
        newRow.appendChild(progressCell);
        newRow.appendChild(dateCell);
        newRow.appendChild(favouriteCell);

        tableBody.appendChild(newRow);
        updateProgressBar(newRow)
        if (typeof window.checkForNewAchievements === 'function') {
            window.checkForNewAchievements();
        } else {
            console.error("checkForNewAchievements function not found!");
        }
        // Clear the form from data
        form.reset();
    });

    function updateProgressBar(row) {
        const progressBar = row.querySelector(".progress-bar");
        const goal = parseInt(progressBar.getAttribute("data-goal"));
        const burned = parseInt(progressBar.getAttribute("data-burned"));
        const progress = Math.min((burned / goal) * 100, 100);

        progressBar.style.width = progress + "%";
        progressBar.textContent = `${burned} / ${goal} kcal`;
    }

    // Function to move favourite rows to the top of the list tabel
    function moveFavouriteToTop(row) {
        if (row.querySelector(".favourite-button").classList.contains("active")) {
            tableBody.insertBefore(row, tableBody.firstChild);
        }
    }

    function loadWorkouts() { //Loads the workouts that are on the users profile and adds them to the table
        const savedWorkouts = JSON.parse(localStorage.getItem("workouts") || "[]");
        savedWorkouts.forEach(workout => addWorkoutToTable(workout));
        }

        function addWorkoutToTable(workout) {
            const tableBody = document.querySelector("#workoutTable tbody");
            const newRow = document.createElement("tr");

            const caloriesGoal = workout.caloriesgoal || "1000";
        
            newRow.innerHTML = `
                <td>${workout.type}</td>
                <td>${workout.duration}</td>
                <td>${workout.calories}</td>
                <td>
                    <div class="progress-container">
                        <div class="progress-bar" style="width: 0%;" data-goal="${caloriesGoal}" data-burned="${workout.calories}">
                            0 / ${caloriesGoal} kcal
                        </div>
                    </div>
                </td>
                <td>${workout.date}</td>
                <td><button class="favourite-button">★</button></td>
            `;
        
            // Add event listener to the favorite button
            const favouriteBtn = newRow.querySelector(".favourite-button");
            favouriteBtn.addEventListener("click", () => {
            favouriteBtn.classList.toggle("active");
            moveFavouriteToTop(newRow);
        });

            tableBody.appendChild(newRow);
            updateProgressBar(newRow);
        }
    
         loadWorkouts();
});