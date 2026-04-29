document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // If not logged in, immediately redirect to login page
    if (!isLoggedIn) {

        window.location.href = 'login/Login.html'; 
    
    }
});

document.addEventListener('DOMContentLoaded', () => {
    // data - checks 
    const workouts = JSON.parse(localStorage.getItem("workouts") || "[]");

function updateSummaryStats() {
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce((sum, workout) => sum + parseInt(workout.calories), 0);
    const avgDuration = workouts.reduce((sum, workout) => sum + parseInt(workout.duration), 0) / (totalWorkouts || 1);

    document.getElementById('totalWorkouts').textContent = totalWorkouts;
    document.getElementById('totalCalories').textContent = totalCalories;
    document.getElementById('avgDuration').textContent = `${Math.round(avgDuration)} min`;
    }
 
    const workoutTypes = workouts.map(workout => workout.type);
        const typeCounts = {};
        
        // Count occurrences of each workout type
        workoutTypes.forEach(type => {
            typeCounts[type] = (typeCounts[type] || 0) + 1;
        });
        
        // Find the most frequent type
        let mostFrequentType = '';
        let maxCount = 0;
        
        for (const type in typeCounts) {
            if (typeCounts[type] > maxCount) {
                mostFrequentType = type;
                maxCount = typeCounts[type];
            }
        }
        
        // Display the most frequent workout type
        const mostFrequentElement = document.getElementById('commonWorkout');
        if (mostFrequentElement) {
            mostFrequentElement.textContent = mostFrequentType || 'None';
        }



    // Create charts
    function createCharts() {
        const dates = workouts.map(workout => workout.date);
        const caloriesData = workouts.map(workout => workout.calories);

        // Weekly progress chart
        const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
        new Chart(weeklyCtx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Calories Burned',
                    data: caloriesData,
                    borderColor: 'darkgoldenrod'
                }]
            }
        });

        const workoutTypes = workouts.map(workout => workout.type);
        const uniqueTypes = [...new Set(workoutTypes)]; // Get unique workout types
        
        // Count occurrences of each workout type
        const typeCounts = uniqueTypes.map(type => {
            return workoutTypes.filter(t => t === type).length;
        });
        
        // Generate random colors for each workout type
        const backgroundColors = uniqueTypes.map(() => {
            return '#' + Math.floor(Math.random()*16777215).toString(16);
        });

        // Workout distribution chart
        const pieCtx = document.getElementById('workoutPieChart').getContext('2d');
        new Chart(pieCtx, {
            type: 'pie',
            data: {
                labels: uniqueTypes.length > 0 ? uniqueTypes : ['No Workouts Logged'],
                datasets: [{
                    data: typeCounts.length > 0 ? typeCounts : [1],
                    backgroundColor: backgroundColors.length > 0 ? backgroundColors : ['#CCCCCC']
                }]
            }
        });
    }

    // Add event listener for print button
    function setupPrintButton() {
        const printButton = document.getElementById('printSummaryBtn');
        if (printButton) {
            printButton.addEventListener('click', () => {
                // Create a title for the printed page
                const originalTitle = document.title;
                document.title = 'Workout Statistics Summary - ' + new Date().toLocaleDateString();
                
                // Print the page
                window.print();
                
                // Restore the original title
                document.title = originalTitle;
            });
        }
    }

    updateSummaryStats();
    createCharts();
    setupPrintButton();
});