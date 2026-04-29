document.addEventListener('DOMContentLoaded', () => {
    // Fetch the currently logged-in user
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!user) {
        alert("No user is logged in. Please log in to see achievements.");
        window.location.href = "login/Login.html"; // Redirect to login if no user is found
        return;
    }

    // Update UI with user info
    document.getElementById('userName').textContent = user.name;
    document.getElementById('userJoined').textContent = new Date(user.joined).toLocaleDateString();

    // Load achievements
    const achievements = JSON.parse(localStorage.getItem('achievements')) || [];
    const userAchievements = achievements.filter(a => a.earned); // Only show earned achievements

    document.getElementById('totalAchievements').textContent = userAchievements.length;
    document.getElementById('maxAchievements').textContent = achievements.length;

    const achievementsContainer = document.getElementById('achievementsList');
    achievementsContainer.innerHTML = ''; // Clear existing content

    // Display earned achievements
    userAchievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card earned';
        achievementCard.innerHTML = `
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-info">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
                <small>Earned on: ${new Date(achievement.dateEarned).toLocaleDateString()}</small>
            </div>
        `;
        achievementsContainer.appendChild(achievementCard);
    });

    // Display locked achievements
    const lockedContainer = document.getElementById('lockedAchievements');
    lockedContainer.innerHTML = ''; // Clear locked achievements

    const lockedAchievements = achievements.filter(a => !a.earned);
    lockedAchievements.forEach(achievement => {
        const achievementCard = document.createElement('div');
        achievementCard.className = 'achievement-card locked';
        achievementCard.innerHTML = `
            <div class="achievement-icon">?</div>
            <div class="achievement-info">
                <h4>${achievement.title}</h4>
                <p>${achievement.description}</p>
                <small>Not yet earned</small>
            </div>
        `;
        lockedContainer.appendChild(achievementCard);
    });
});
