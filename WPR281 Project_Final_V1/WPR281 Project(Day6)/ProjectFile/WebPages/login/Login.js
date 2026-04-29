function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement){
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    // Toggle between login and create account forms
    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault(); // Prevents submitting traditionally
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault(); // Prevents submitting traditionally
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault(); // Prevents form from being submitted through a traditional page refresh or submission

        const usernameInput = loginForm.querySelector(".form__input[placeholder='Username or email']").value;
        const passwordInput = loginForm.querySelector(".form__input[placeholder='Password']").value;
        
        // Initialize user data
        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', JSON.stringify({
                username: mockUser.username,
                name: mockUser.name,
                joined: mockUser.joined
            }));

        }
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });


    createAccountForm.addEventListener("submit", e => {
        e.preventDefault(); // Prevents form from being submitted through a traditional page refresh or submission

        const usernameInput = document.querySelector("#signUpUserName");
        if (usernameInput.value.length < 10) {
            setInputError(usernameInput, "Username must be at least 10 characters long");
        }});

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signUpUserName" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters long");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        })
    });

    // Check for mock user login
    loginForm.addEventListener("submit", e => {
    e.preventDefault();
    
    const usernameInput = loginForm.querySelector('input[type="text"]').value;
    const passwordInput = loginForm.querySelector('input[type="password"]').value;
    
    // Check against mock user credentials
    if (usernameInput === "fitnessJunkie" && passwordInput === "workout123") {
        // Log in successful - you can redirect to the home page
        localStorage.setItem('isLoggedIn', 'true');

        if (!localStorage.getItem('currentUser')) {
            localStorage.setItem('currentUser', JSON.stringify({
                username: 'fitnessJunkie',
                name: 'Melary Magorimbo',
                joined: '2025-01-15'
            }));
        }
        initializeUserData();

        window.location.href = "../Home.html";

    } else {
        setFormMessage(loginForm, "error", "Invalid username/password combination");
    }
    });

    function initializeUserData() {
        // Initialize achievements if not present
        if (!localStorage.getItem('achievements')) {
            // We'll use the achievements from Achievements.js
            const initialAchievements = achievementsList.map(achievement => {
                const earnedAchievement = mockEarnedAchievements.find(earned => earned.id === achievement.id);
                if (earnedAchievement) {
                    return {
                        ...achievement,
                        earned: true,
                        dateEarned: earnedAchievement.dateEarned
                    };
                }
                return achievement;
            });
            
            localStorage.setItem('achievements', JSON.stringify(initialAchievements));
        }

    // Initialize mock workouts
    localStorage.setItem('workouts', JSON.stringify(mockUser.workouts || []));
    
    // Initialize mock goals
    localStorage.setItem('fitness_goals', JSON.stringify(mockUser.goals || []));
    }
});