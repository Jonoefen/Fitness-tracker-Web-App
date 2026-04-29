document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        
        window.location.href = 'login/Login.html'; 
        
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // Update login link to show username
        const user = JSON.parse(currentUser);
        const loginLink = document.querySelector('.nav-link.workout-stage');
        if (loginLink) {
            loginLink.textContent = `Welcome, ${user.name}`;
            loginLink.href = "#"; // Disable the link
        }
        
        // Add logout functionality
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (confirm('Do you want to log out?')) {
                localStorage.removeItem('currentUser');
                window.location.reload();
            }
        });
        
    }
});