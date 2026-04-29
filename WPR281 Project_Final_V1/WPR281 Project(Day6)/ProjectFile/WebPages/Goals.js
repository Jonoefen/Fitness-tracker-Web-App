document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
       
        window.location.href = 'login/Login.html'; 
       
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const goalForm = document.getElementById('goalForm');
    const goalType = document.getElementById('goalType');
    const goalAmount = document.getElementById('goalAmount');
    const goalAmountLabel = document.getElementById('goalAmountLabel');
    const activeGoals = document.getElementById('activeGoals');

    // Update input label based on goal type
    goalType.addEventListener('change', () => {
        switch(goalType.value) {
            case 'distance':
                goalAmountLabel.textContent = 'Distance in meters:';
                break;
            case 'calories':
                goalAmountLabel.textContent = 'Calorie amount:';
                break;
            case 'workouts':
                goalAmountLabel.textContent = 'Workouts per week:';
                break;
            default:
                goalAmountLabel.textContent = 'Enter amount:';
        }
    });

    goalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const goal = {
            type: goalType.value,
            amount: goalAmount.value,
            deadline: document.getElementById('goalDeadline').value,
            dateSet: new Date().toISOString(),
            id: Date.now()
        };

        addGoalToDisplay(goal);
        saveGoalToLocalStorage(goal);

        if (typeof window.checkForNewAchievements === 'function') {
            window.checkForNewAchievements();
        }
        
        goalForm.reset();
  
    });

    // Save to localStorage
    function saveGoalToLocalStorage(goal){
        let goals = JSON.parse(localStorage.getItem('fitness_goals')) || [];
        goals.push(goal);
        localStorage.setItem('fitness_goals', JSON.stringify(goals));
    }

    function addGoalToDisplay(goal) {
        const goalCard = document.createElement('div');
        goalCard.className = 'goal-card';
        
        // Format the deadline date
        const deadline = new Date(goal.deadline);
        const formattedDate = deadline.toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });

        // Create goal description based on type
        let description = '';
        switch(goal.type) {
            case 'distance':
                description = `Run ${goal.amount} meters`;
                break;
            case 'calories':
                description = `Burn ${goal.amount} calories`;
                break;
            case 'workouts':
                description = `Complete ${goal.amount} workouts`;
                break;
        }

        goalCard.innerHTML = `
            <div class="goal-description">${description} before ${formattedDate}</div>
            <div class="progress-container">
                <div class="progress-bar" style="width: 0%"></div>
            </div>
            <div class="goal-countdown" id="countdown-${goal.id}"></div>
        `;

        activeGoals.prepend(goalCard);

        // Start countdown for this goal
        updateCountdown(goal.deadline, `countdown-${goal.id}`);
    }

    let savedGoals = JSON.parse(localStorage.getItem('fitness_goals')) || [];
    savedGoals.forEach(addGoalToDisplay)

    function updateCountdown(deadline, elementId) {
        const countdownElement = document.getElementById(elementId);
        
        const timer = setInterval(() => {
            const now = new Date().getTime();
            const deadlineTime = new Date(deadline).getTime();
            const distance = deadlineTime - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / (1000));
            countdownElement.textContent = `Time remaining: ${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (distance < 0) {
                clearInterval(timer);
                countdownElement.textContent = 'DEADLINE PASSED';
            }
        }, 1000);
    }

    
        const messages = [
            "Keep pushing!",
            "Yeahhh buddyyy, light weight - Ronnie Coleman",
            "Every workout counts!",
            "Who's gonna carry the boats and the logsss! - David Gogins",
            "Believe in yourself!",
            "Great job, keep it up!"
        ];
    
        const motivationBtn = document.getElementById("motivationBtn");
        const motivationMessage = document.getElementById("motivationMessage");
    
        if (!motivationBtn) {
            console.error("motivationBtn not found!");
        } else {
            console.log("motivationBtn found");
        }
    
        if (!motivationMessage) {
            console.error("motivationMessage not found!");
        } else {
            console.log("motivationMessage found");
        }
    
        motivationBtn.addEventListener("click", () => {
            console.log("Motivation button clicked!");
            const randomIndex = Math.floor(Math.random() * messages.length);
            const randomMessage = messages[randomIndex];
            console.log("Displaying message:", randomMessage);
            motivationMessage.textContent = randomMessage;
        });
        udateGoalProgress();
    
});