export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar?: string;
  currentStreak: number;
  maxStreak: number;
  dsaProblem: number;
}

// Simulated Database fetch
export const getLeaderboardData = async (): Promise<LeaderboardUser[]> => {
  return [
    { rank: 1, name: "harsraj007", currentStreak: 434, maxStreak: 434, dsaProblem: 500, avatar: "https://i.pravatar.cc/150?u=harsraj007" },
    { rank: 2, name: "dineshsutihar", currentStreak: 444, maxStreak: 444, dsaProblem: 490, avatar: "https://i.pravatar.cc/150?u=dineshsutihar" },
    { rank: 3, name: "MohanJP", currentStreak: 432, maxStreak: 432, dsaProblem: 485, avatar: "https://i.pravatar.cc/150?u=MohanJP" },
    { rank: 4, name: "swarupcs", currentStreak: 412, maxStreak: 412, dsaProblem: 314, avatar: "https://i.pravatar.cc/150?u=swarupcs" },
    { rank: 5, name: "varang", currentStreak: 404, maxStreak: 404, dsaProblem: 372 },
    { rank: 6, name: "pranav_1397", currentStreak: 392, maxStreak: 392, dsaProblem: 438 },
    { rank: 7, name: "subodhsingh", currentStreak: 388, maxStreak: 388, dsaProblem: 405, avatar: "https://i.pravatar.cc/150?u=subodhsingh" },
    { rank: 8, name: "megha_5", currentStreak: 368, maxStreak: 368, dsaProblem: 266 },
    { rank: 9, name: "alex_dev", currentStreak: 350, maxStreak: 380, dsaProblem: 250 },
    { rank: 10, name: "sarah_code", currentStreak: 345, maxStreak: 345, dsaProblem: 210 },
  ];
};

export interface StreakDay {
  date: string;
  status: "completed" | "missed" | "future";
}

// Simulated user streak data
export const getUserStreakData = async () => {
  const daysInMonth = 31;
  const calendar: StreakDay[] = [];
  
  // Create a mock month starting on Monday (July 2026 starts on Wed actually, but we follow the UI mockup approximately)
  // Let's just generate 31 days with a mix of fire and crying faces to match the mockup
  for (let i = 1; i <= daysInMonth; i++) {
    let status: "completed" | "missed" | "future" = "completed";
    
    // Some random missed days to match UI
    if ([4, 5, 11, 12, 15, 16, 20, 25].includes(i)) {
      status = "missed";
    }
    
    // Future days
    if (i > 26) {
      status = "future";
    }
    
    calendar.push({
      date: `2026-07-${i.toString().padStart(2, "0")}`,
      status
    });
  }

  return {
    currentStreak: 1,
    maxStreak: 124,
    calendar
  };
};
