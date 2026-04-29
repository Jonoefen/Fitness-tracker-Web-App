const achievementsList = [  // Achievements that a user can earn.
    {
        id: "first_workout",
        title: "First Step",
        description: "Complete your first workout",
        icon: "🏆",
        earned: false,
        dateEarned: null
    },
    {
        id: "streak_3",
        title: "Consistency Champion",
        description: "Complete workouts 3 days in a row",
        icon: "🔥",
        earned: false,
        dateEarned: null
    },
    {
        id: "calories_1000",
        title: "Calorie Crusher",
        description: "Burn a total of 1000 calories",
        icon: "⚡",
        earned: false,
        dateEarned: null
    },
    {
        id: "different_5",
        title: "Variety Is Key",
        description: "Try 5 different workout types",
        icon: "🔄",
        earned: false,
        dateEarned: null
    },
    {
        id: "goal_complete",
        title: "Goal Getter",
        description: "Complete your first fitness goal",
        icon: "🎯",
        earned: false,
        dateEarned: null
    },
    {
        id: "yoga_master",
        title: "Zen Master",
        description: "Complete 5 yoga sessions",
        icon: "🧘",
        earned: false,
        dateEarned: null
    },
    {
        id: "early_bird",
        title: "Early Bird",
        description: "Log a workout before 7am",
        icon: "🌅",
        earned: false,
        dateEarned: null
    },
    {
        id: "night_owl",
        title: "Night Owl",
        description: "Log a workout after 8pm",
        icon: "🌙",
        earned: false,
        dateEarned: null
    }
];

// Mock achievements already earned by our user
const mockEarnedAchievements = [
    {
        id: "first_workout",
        dateEarned: "2025-02-01"
    },
    {
        id: "streak_3",
        dateEarned: "2025-02-05"
    },
    {
        id: "calories_1000",
        dateEarned: "2025-02-10"
    },
    {
        id: "different_5",
        dateEarned: "2025-02-15"
    }
];