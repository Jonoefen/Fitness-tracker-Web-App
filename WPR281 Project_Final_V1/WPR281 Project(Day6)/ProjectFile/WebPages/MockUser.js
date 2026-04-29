// Mock data to show the functionality of the website without making it time consuming
const mockUser = {
    username: "fitnessJunkie",
    password: "workout123",
    name: "Melary Magorimbo",
    joined: "2025-01-15",
    workouts: [
        { type: "Running", duration: "30", calories: "350", caloriesgoal: "300", date: "2025-02-01" },
        { type: "Weight Training", duration: "45", calories: "400", caloriesgoal: "400", date: "2025-02-03" },
        { type: "HIIT", duration: "20", calories: "280", caloriesgoal: "250", date: "2025-02-05" },
        { type: "Yoga", duration: "60", calories: "250", caloriesgoal: "200", date: "2025-02-08" },
        { type: "Cycling", duration: "40", calories: "420", caloriesgoal: "400", date: "2025-02-10" },
        { type: "Running", duration: "35", calories: "380", caloriesgoal: "350", date: "2025-02-13" },
        { type: "Swimming", duration: "40", calories: "450", caloriesgoal: "400", date: "2025-02-15" },
        { type: "Weight Training", duration: "50", calories: "430", caloriesgoal: "400", date: "2025-02-18" },
        { type: "Yoga", duration: "60", calories: "240", caloriesgoal: "250", date: "2025-02-20" },
        { type: "Running", duration: "45", calories: "500", caloriesgoal: "450", date: "2025-02-23" }
    ],
    goals: [
        {
            type: "calories",
            amount: "2000",
            deadline: "2025-03-15",
            dateSet: "2025-02-01",
            id: 1706745600000
        },
        {
            type: "workouts",
            amount: "12",
            deadline: "2025-03-01",
            dateSet: "2025-02-01",
            id: 1706745601000
        }
    ]
};