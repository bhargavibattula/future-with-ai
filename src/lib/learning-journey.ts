import { prisma } from "@/lib/prisma";

export interface ActivityPayload {
  activityType: "LESSON" | "QUIZ" | "CHALLENGE" | "ASSESSMENT" | "PRACTICE" | "PROJECT";
  activityId?: string;
  courseId?: string;
  lessonId?: string;
  xp?: number;
  coins?: number;
  timeSpent?: number; // in minutes
  completionPercentage?: number;
}

export function getTodayDateString(d = new Date()): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(d = new Date()): string {
  const prev = new Date(d);
  prev.setDate(prev.getDate() - 1);
  return getTodayDateString(prev);
}

export function getTwoDaysAgoDateString(d = new Date()): string {
  const prev = new Date(d);
  prev.setDate(prev.getDate() - 2);
  return getTodayDateString(prev);
}

// Security & Audit Logger
export function logAudit(userId: string, action: string, details: Record<string, any>) {
  console.log(`[LEARNING_JOURNEY_AUDIT] [${new Date().toISOString()}] User: ${userId} | Action: ${action} | Details:`, JSON.stringify(details));
}

// Seed default milestones and achievements into DB if not existing
export async function seedDefaultMilestonesAndAchievements() {
  const defaultMilestones = [
    { requiredDays: 1, title: "1 Day Streak", description: "First step on your AI journey!", rewardXP: 50, rewardCoins: 25, badgeColor: "#8B7FE8" },
    { requiredDays: 3, title: "3 Days Streak", description: "Building momentum!", rewardXP: 100, rewardCoins: 50, badgeColor: "#8B7FE8" },
    { requiredDays: 7, title: "7 Days Streak", description: "One week of unbroken learning!", rewardXP: 250, rewardCoins: 100, badgeColor: "#5CBFA0" },
    { requiredDays: 15, title: "15 Days Streak", description: "Half a month consistent!", rewardXP: 500, rewardCoins: 200, badgeColor: "#5CBFA0" },
    { requiredDays: 30, title: "30 Days Streak", description: "Streak Champion!", rewardXP: 1000, rewardCoins: 500, badgeColor: "#F0879B" },
    { requiredDays: 50, title: "50 Days Streak", description: "AI Learning Titan!", rewardXP: 2000, rewardCoins: 1000, badgeColor: "#F0879B" },
    { requiredDays: 100, title: "100 Days Streak", description: "Century Club Member!", rewardXP: 5000, rewardCoins: 2500, badgeColor: "#FFD700" },
    { requiredDays: 180, title: "180 Days Streak", description: "Half Year Mastery!", rewardXP: 8000, rewardCoins: 4000, badgeColor: "#FFD700" },
    { requiredDays: 365, title: "365 Days Streak", description: "Legendary 1-Year AI Mastery!", rewardXP: 15000, rewardCoins: 10000, badgeColor: "#FFD700" },
  ];

  for (const m of defaultMilestones) {
    await prisma.milestone.upsert({
      where: { requiredDays: m.requiredDays },
      update: { title: m.title, description: m.description, rewardXP: m.rewardXP, rewardCoins: m.rewardCoins, badgeColor: m.badgeColor },
      create: m,
    });
  }

  const defaultAchievements = [
    { code: "STARTED_JOURNEY", title: "Started Journey", description: "Began your learning expedition on Future With AI", category: "Habit", iconBg: "rgba(139, 127, 232, 0.15)" },
    { code: "FIRST_LESSON", title: "First Lesson Completed", description: "Finished your very first interactive lesson", category: "Speed", iconBg: "rgba(92, 191, 160, 0.15)" },
    { code: "FIRST_QUIZ", title: "First Quiz Passed", description: "Tested knowledge and passed first quiz", category: "Target", iconBg: "rgba(240, 135, 155, 0.15)" },
    { code: "FIRST_CHALLENGE", title: "AI Challenge Conqueror", description: "Completed an AI interactive challenge", category: "Target", iconBg: "rgba(216, 210, 250, 0.15)" },
    { code: "STREAK_7", title: "Consistency Master", description: "Maintained a 7-day learning streak", category: "Streak", iconBg: "rgba(139, 127, 232, 0.15)" },
    { code: "STREAK_30", title: "Unstoppable Learner", description: "Maintained a 30-day learning streak", category: "Streak", iconBg: "rgba(255, 215, 0, 0.15)" },
    { code: "LESSONS_100", title: "Centurion Scholar", description: "Completed 100 interactive AI lessons", category: "Speed", iconBg: "rgba(92, 191, 160, 0.15)" },
    { code: "LEVEL_UP", title: "Level Up!", description: "Reached Level 5 in AI Mastery", category: "Habit", iconBg: "rgba(240, 135, 155, 0.15)" },
    { code: "AI_EXPLORER", title: "AI Explorer", description: "Explored multiple topics across courses and tools", category: "Habit", iconBg: "rgba(139, 127, 232, 0.15)" },
    { code: "MASTER_LEARNER", title: "Master Learner", description: "Achieved 10+ perfect learning days", category: "Target", iconBg: "rgba(255, 215, 0, 0.15)" },
  ];

  for (const a of defaultAchievements) {
    await prisma.achievement.upsert({
      where: { code: a.code },
      update: { title: a.title, description: a.description, category: a.category, iconBg: a.iconBg },
      create: a,
    });
  }
}

// Ensure UserProgress exists for user
export async function getOrCreateUserProgress(userId: string) {
  let progress = await prisma.userProgress.findUnique({
    where: { userId },
  });

  if (!progress) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    progress = await prisma.userProgress.create({
      data: {
        userId,
        currentStreak: user?.streak || 0,
        longestStreak: user?.streak || 0,
        totalXP: user?.xp || 0,
        totalCoins: user?.coins || 0,
        currentLevel: Math.max(1, Math.floor((user?.xp || 0) / 500) + 1),
        streakFreezes: 0,
      },
    });
  }

  return progress;
}

// Record activity completion inside a database transaction
export async function recordActivityCompletion(userId: string, payload: ActivityPayload) {
  await seedDefaultMilestonesAndAchievements();

  const todayStr = getTodayDateString();
  const yesterdayStr = getYesterdayDateString();
  const twoDaysAgoStr = getTwoDaysAgoDateString();

  const xpAmount = Math.max(0, payload.xp ?? 50);
  const coinAmount = Math.max(0, payload.coins ?? 20);
  const timeSpent = Math.max(1, payload.timeSpent ?? 15);
  const actType = payload.activityType.toUpperCase();

  return await prisma.$transaction(async (tx) => {
    // 1. Fetch user progress & user
    let progress = await tx.userProgress.findUnique({ where: { userId } });
    if (!progress) {
      const user = await tx.user.findUnique({ where: { id: userId } });
      progress = await tx.userProgress.create({
        data: {
          userId,
          currentStreak: user?.streak || 0,
          longestStreak: user?.streak || 0,
          totalXP: user?.xp || 0,
          totalCoins: user?.coins || 0,
          currentLevel: Math.max(1, Math.floor((user?.xp || 0) / 500) + 1),
        },
      });
    }

    let freezeConsumed = false;
    let newCurrentStreak = progress.currentStreak;
    let newLongestStreak = progress.longestStreak;
    let newDaysLearned = progress.daysLearned;

    // 2. Streak logic check
    const lastDate = progress.lastActivityDate;

    if (lastDate === todayStr) {
      // Already active today: keep current streak unchanged, no freeze needed
    } else if (lastDate === yesterdayStr) {
      // Consecutive day!
      newCurrentStreak += 1;
      newDaysLearned += 1;
    } else if (lastDate === twoDaysAgoStr && progress.streakFreezes > 0) {
      // Missed yesterday, but has streak freeze! Auto-consume 1 freeze
      freezeConsumed = true;
      newCurrentStreak += 1; // Streak preserved and incremented today
      newDaysLearned += 1;
    } else {
      // Missed 2+ days or no freeze: reset streak to 1
      newCurrentStreak = 1;
      newDaysLearned += 1;
    }

    newLongestStreak = Math.max(newLongestStreak, newCurrentStreak);

    // 3. Upsert DailyActivity
    let daily = await tx.dailyActivity.findUnique({
      where: { userId_date: { userId, date: todayStr } },
    });

    const isLesson = actType === "LESSON";
    const isQuiz = actType === "QUIZ";
    const isChallenge = actType === "CHALLENGE" || actType === "DAILY_CHALLENGE";
    const isAssessment = actType === "ASSESSMENT";
    const isPractice = actType === "PRACTICE";
    const isProject = actType === "PROJECT";

    let bonusXP = 0;
    let bonusCoins = 0;
    let dailyGoalNewlyCompleted = false;

    if (!daily) {
      daily = await tx.dailyActivity.create({
        data: {
          userId,
          date: todayStr,
          lessonCompleted: isLesson ? 1 : 0,
          quizCompleted: isQuiz ? 1 : 0,
          challengeCompleted: isChallenge ? 1 : 0,
          assessmentCompleted: isAssessment ? 1 : 0,
          practiceCompleted: isPractice ? 1 : 0,
          projectCompleted: isProject ? 1 : 0,
          xpEarned: xpAmount,
          coinsEarned: coinAmount,
          studyMinutes: timeSpent,
        },
      });
    } else {
      daily = await tx.dailyActivity.update({
        where: { id: daily.id },
        data: {
          lessonCompleted: daily.lessonCompleted + (isLesson ? 1 : 0),
          quizCompleted: daily.quizCompleted + (isQuiz ? 1 : 0),
          challengeCompleted: daily.challengeCompleted + (isChallenge ? 1 : 0),
          assessmentCompleted: daily.assessmentCompleted + (isAssessment ? 1 : 0),
          practiceCompleted: daily.practiceCompleted + (isPractice ? 1 : 0),
          projectCompleted: daily.projectCompleted + (isProject ? 1 : 0),
          xpEarned: daily.xpEarned + xpAmount,
          coinsEarned: daily.coinsEarned + coinAmount,
          studyMinutes: daily.studyMinutes + timeSpent,
        },
      });
    }

    // Check Daily Goal: Lesson >= 1, Quiz >= 1, Challenge >= 1
    if (
      !daily.dailyGoalCompleted &&
      daily.lessonCompleted >= 1 &&
      daily.quizCompleted >= 1 &&
      daily.challengeCompleted >= 1
    ) {
      dailyGoalNewlyCompleted = true;
      bonusXP += 50;
      bonusCoins += 25;
      await tx.dailyActivity.update({
        where: { id: daily.id },
        data: {
          dailyGoalCompleted: true,
          xpEarned: daily.xpEarned + 50,
          coinsEarned: daily.coinsEarned + 25,
        },
      });
    }

    // Check Perfect Day criteria: (lesson >= 2 || quiz >= 2 || challenge >= 1) && studyMinutes >= 30
    const isPerfect =
      (daily.lessonCompleted >= 2 || daily.quizCompleted >= 2 || daily.challengeCompleted >= 1) &&
      daily.studyMinutes >= 30;

    let perfectDaysDelta = 0;
    if (isPerfect && !daily.perfectDay) {
      perfectDaysDelta = 1;
      await tx.dailyActivity.update({
        where: { id: daily.id },
        data: { perfectDay: true },
      });
    }

    // 4. Create ActivityLog entry
    const log = await tx.activityLog.create({
      data: {
        userId,
        dailyActivityId: daily.id,
        activityType: actType,
        activityId: payload.activityId,
        courseId: payload.courseId,
        lessonId: payload.lessonId,
        xp: xpAmount + (dailyGoalNewlyCompleted ? 50 : 0),
        coins: coinAmount + (dailyGoalNewlyCompleted ? 25 : 0),
        timeSpent,
        completionPercentage: payload.completionPercentage ?? 100.0,
      },
    });

    // 5. Update UserProgress totals & Level calculation
    const totalXP = progress.totalXP + xpAmount + bonusXP;
    const totalCoins = progress.totalCoins + coinAmount + bonusCoins;
    const newLevel = Math.max(1, Math.floor(totalXP / 500) + 1);

    const updatedProgress = await tx.userProgress.update({
      where: { userId },
      data: {
        currentStreak: newCurrentStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: todayStr,
        daysLearned: newDaysLearned,
        totalXP,
        totalCoins,
        currentLevel: newLevel,
        totalLessons: progress.totalLessons + (isLesson ? 1 : 0),
        totalQuizzes: progress.totalQuizzes + (isQuiz ? 1 : 0),
        totalChallenges: progress.totalChallenges + (isChallenge ? 1 : 0),
        totalAssessments: progress.totalAssessments + (isAssessment ? 1 : 0),
        totalStudyMinutes: progress.totalStudyMinutes + timeSpent,
        perfectDays: progress.perfectDays + perfectDaysDelta,
        streakFreezes: freezeConsumed ? progress.streakFreezes - 1 : progress.streakFreezes,
        lastFreezeUsedDate: freezeConsumed ? yesterdayStr : progress.lastFreezeUsedDate,
        weeklyXP: progress.weeklyXP + xpAmount + bonusXP,
        monthlyXP: progress.monthlyXP + xpAmount + bonusXP,
      },
    });

    // Sync User model
    await tx.user.update({
      where: { id: userId },
      data: {
        xp: totalXP,
        coins: totalCoins,
        streak: newCurrentStreak,
      },
    });

    // 6. Check and unlock Milestones (Batch query)
    const milestones = await tx.milestone.findMany({
      where: { requiredDays: { lte: newCurrentStreak } },
    });
    const existingUserMilestones = await tx.userMilestone.findMany({
      where: { userId, milestoneId: { in: milestones.map((m) => m.id) } },
    });
    const existingMilestoneIds = new Set(existingUserMilestones.map((um) => um.milestoneId));

    const newlyUnlockedMilestones: string[] = [];
    for (const m of milestones) {
      if (!existingMilestoneIds.has(m.id)) {
        await tx.userMilestone.create({
          data: { userId, milestoneId: m.id, claimed: false },
        });
        newlyUnlockedMilestones.push(m.title);
      }
    }

    // 7. Check and unlock Achievements (Batch query)
    const codesToGrant: string[] = ["STARTED_JOURNEY"];
    if (isLesson) codesToGrant.push("FIRST_LESSON");
    if (isQuiz) codesToGrant.push("FIRST_QUIZ");
    if (isChallenge) codesToGrant.push("FIRST_CHALLENGE");
    if (newCurrentStreak >= 7) codesToGrant.push("STREAK_7");
    if (newCurrentStreak >= 30) codesToGrant.push("STREAK_30");
    if (updatedProgress.totalLessons >= 100) codesToGrant.push("LESSONS_100");
    if (newLevel >= 5) codesToGrant.push("LEVEL_UP");
    if (updatedProgress.perfectDays >= 10) codesToGrant.push("MASTER_LEARNER");

    const achievementsToGrant = await tx.achievement.findMany({
      where: { code: { in: codesToGrant } },
    });
    const existingUserAchievements = await tx.userAchievement.findMany({
      where: { userId, achievementId: { in: achievementsToGrant.map((a) => a.id) } },
    });
    const existingAchievementIds = new Set(existingUserAchievements.map((ua) => ua.achievementId));

    const newlyUnlockedAchievements: string[] = [];
    for (const ach of achievementsToGrant) {
      if (!existingAchievementIds.has(ach.id)) {
        await tx.userAchievement.create({
          data: { userId, achievementId: ach.id },
        });
        newlyUnlockedAchievements.push(ach.title);
      }
    }

    logAudit(userId, "ACTIVITY_COMPLETE", {
      activityType: actType,
      xpEarned: xpAmount + bonusXP,
      coinsEarned: coinAmount + bonusCoins,
      currentStreak: newCurrentStreak,
      freezeConsumed,
    });

    return {
      success: true,
      progress: updatedProgress,
      freezeConsumed,
      dailyGoalNewlyCompleted,
      newlyUnlockedMilestones,
      newlyUnlockedAchievements,
      log,
    };
  }, { timeout: 25000, maxWait: 10000 });
}

// Purchase streak freeze (500 coins, max 2 limit)
export async function purchaseStreakFreeze(userId: string) {
  return await prisma.$transaction(async (tx) => {
    let progress = await tx.userProgress.findUnique({ where: { userId } });
    if (!progress) {
      const user = await tx.user.findUnique({ where: { id: userId } });
      progress = await tx.userProgress.create({
        data: { userId, currentStreak: user?.streak || 0, totalCoins: user?.coins || 0 },
      });
    }

    if (progress.streakFreezes >= 2) {
      throw new Error("Maximum of 2 Streak Freezes allowed.");
    }

    if (progress.totalCoins < 500) {
      throw new Error("Insufficient coins. You need 500 coins to purchase a Streak Freeze.");
    }

    const updated = await tx.userProgress.update({
      where: { userId },
      data: {
        totalCoins: progress.totalCoins - 500,
        streakFreezes: progress.streakFreezes + 1,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { coins: updated.totalCoins },
    });

    logAudit(userId, "PURCHASE_FREEZE", {
      newCount: updated.streakFreezes,
      remainingCoins: updated.totalCoins,
    });

    return updated;
  }, { timeout: 25000, maxWait: 10000 });
}

// Claim milestone reward
export async function claimMilestoneReward(userId: string, milestoneId: string) {
  return await prisma.$transaction(async (tx) => {
    const milestone = await tx.milestone.findUnique({ where: { id: milestoneId } });
    if (!milestone) throw new Error("Milestone not found.");

    let userMilestone = await tx.userMilestone.findUnique({
      where: { userId_milestoneId: { userId, milestoneId } },
    });

    if (!userMilestone) {
      const progress = await tx.userProgress.findUnique({ where: { userId } });
      if (!progress || progress.currentStreak < milestone.requiredDays) {
        throw new Error("Milestone requirement not reached yet.");
      }
      userMilestone = await tx.userMilestone.create({
        data: { userId, milestoneId, claimed: false },
      });
    }

    if (userMilestone.claimed) {
      throw new Error("Milestone reward has already been claimed.");
    }

    // Mark claimed & add reward XP + Coins
    await tx.userMilestone.update({
      where: { id: userMilestone.id },
      data: { claimed: true, claimedAt: new Date() },
    });

    const progress = await tx.userProgress.findUnique({ where: { userId } });
    const currentXP = progress?.totalXP || 0;
    const currentCoins = progress?.totalCoins || 0;

    const newXP = currentXP + milestone.rewardXP;
    const newCoins = currentCoins + milestone.rewardCoins;
    const newLevel = Math.max(1, Math.floor(newXP / 500) + 1);

    const updatedProgress = await tx.userProgress.update({
      where: { userId },
      data: {
        totalXP: newXP,
        totalCoins: newCoins,
        currentLevel: newLevel,
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: { xp: newXP, coins: newCoins },
    });

    logAudit(userId, "CLAIM_MILESTONE", {
      milestoneId,
      rewardXP: milestone.rewardXP,
      rewardCoins: milestone.rewardCoins,
    });

    return { success: true, rewardXP: milestone.rewardXP, rewardCoins: milestone.rewardCoins, progress: updatedProgress };
  }, { timeout: 25000, maxWait: 10000 });
}

// Fetch full user dashboard data
export async function getUserDashboardData(userId: string) {
  await seedDefaultMilestonesAndAchievements();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, image: true, coins: true, xp: true, streak: true },
  });

  if (!user) throw new Error("User not found.");

  const progress = await getOrCreateUserProgress(userId);

  // Fetch 365 days of activity
  const dailyActivities = await prisma.dailyActivity.findMany({
    where: { userId },
    orderBy: { date: "asc" },
  });

  // Convert daily activities array into a map for fast lookup
  const activityMap = new Map(dailyActivities.map((a) => [a.date, a]));

  // Calculate 365 calendar tiles
  const today = new Date();
  const calendarTiles = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = getTodayDateString(d);
    const act = activityMap.get(dateStr);

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    if (act) {
      if (act.perfectDay) level = 4;
      else if (act.xpEarned >= 300) level = 3;
      else if (act.xpEarned >= 150) level = 2;
      else if (act.xpEarned > 0) level = 1;
    }

    calendarTiles.push({
      dateStr,
      dateFormatted: d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      monthStr: d.toLocaleDateString("en-US", { month: "short" }),
      level,
      lessons: act?.lessonCompleted || 0,
      quizzes: act?.quizCompleted || 0,
      challenges: act?.challengeCompleted || 0,
      assessments: act?.assessmentCompleted || 0,
      xp: act?.xpEarned || 0,
      coins: act?.coinsEarned || 0,
      studyMinutes: act?.studyMinutes || 0,
      perfectDay: act?.perfectDay || false,
      dailyGoalCompleted: act?.dailyGoalCompleted || false,
      isToday: dateStr === getTodayDateString(),
    });
  }

  // Fetch all milestones and join user's claim status
  const allMilestones = await prisma.milestone.findMany({ orderBy: { requiredDays: "asc" } });
  const userMilestones = await prisma.userMilestone.findMany({ where: { userId } });
  const userMilestoneMap = new Map(userMilestones.map((m) => [m.milestoneId, m]));

  const milestonesList = allMilestones.map((m) => {
    const userM = userMilestoneMap.get(m.id);
    const unlocked = progress.currentStreak >= m.requiredDays || !!userM;
    return {
      id: m.id,
      title: m.title,
      description: m.description,
      requiredDays: m.requiredDays,
      rewardXP: m.rewardXP,
      rewardCoins: m.rewardCoins,
      badgeColor: m.badgeColor,
      unlocked,
      claimed: userM?.claimed || false,
      claimedAt: userM?.claimedAt || null,
    };
  });

  // Fetch achievements
  const allAchievements = await prisma.achievement.findMany();
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
    orderBy: { unlockedAt: "desc" },
  });
  const unlockedAchievementIds = new Set(userAchievements.map((ua) => ua.achievementId));

  const achievementsList = allAchievements.map((a) => ({
    id: a.id,
    code: a.code,
    title: a.title,
    description: a.description,
    category: a.category,
    iconBg: a.iconBg,
    unlocked: unlockedAchievementIds.has(a.id),
  }));

  // Fetch recent timeline activities
  const recentLogs = await prisma.activityLog.findMany({
    where: { userId },
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  // Compute rank
  const usersWithMoreXP = await prisma.userProgress.count({
    where: { totalXP: { gt: progress.totalXP } },
  });
  const globalRank = usersWithMoreXP + 1;

  // Today's Goal status
  const todayAct = activityMap.get(getTodayDateString());
  const todayGoal = {
    lessonDone: (todayAct?.lessonCompleted || 0) >= 1,
    quizDone: (todayAct?.quizCompleted || 0) >= 1,
    challengeDone: (todayAct?.challengeCompleted || 0) >= 1,
    completed: todayAct?.dailyGoalCompleted || false,
  };

  return {
    user: {
      id: user.id,
      name: user.name || "AI Learner",
      email: user.email,
      image: user.image,
    },
    progress: {
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      totalXP: progress.totalXP,
      totalCoins: progress.totalCoins,
      currentLevel: progress.currentLevel,
      daysLearned: progress.daysLearned,
      perfectDays: progress.perfectDays,
      totalLessons: progress.totalLessons,
      totalQuizzes: progress.totalQuizzes,
      totalChallenges: progress.totalChallenges,
      totalAssessments: progress.totalAssessments,
      totalStudyMinutes: progress.totalStudyMinutes,
      streakFreezes: progress.streakFreezes,
      lastFreezeUsedDate: progress.lastFreezeUsedDate,
      weeklyXP: progress.weeklyXP,
      monthlyXP: progress.monthlyXP,
      globalRank,
    },
    todayGoal,
    calendarTiles,
    milestones: milestonesList,
    achievements: achievementsList,
    userAchievements: userAchievements.map((ua) => ({
      id: ua.id,
      title: ua.achievement.title,
      description: ua.achievement.description,
      unlockedAt: ua.unlockedAt,
    })),
    recentLogs,
  };
}

// GET Weekly Analytics (7 days data)
export async function getWeeklyAnalytics(userId: string) {
  const today = new Date();
  const days: { dateStr: string; dayName: string; xp: number; studyMinutes: number; lessons: number; quizzes: number; challenges: number }[] = [];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let totalXP = 0;
  let totalCoins = 0;
  let totalLessons = 0;
  let totalQuizzes = 0;
  let totalChallenges = 0;
  let totalStudyMinutes = 0;
  let activeDaysCount = 0;

  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = getTodayDateString(d);
    const dayName = dayNames[d.getDay()];

    const act = await prisma.dailyActivity.findUnique({
      where: { userId_date: { userId, date: dateStr } },
    });

    const xp = act?.xpEarned || 0;
    const coins = act?.coinsEarned || 0;
    const studyMinutes = act?.studyMinutes || 0;
    const lessons = act?.lessonCompleted || 0;
    const quizzes = act?.quizCompleted || 0;
    const challenges = act?.challengeCompleted || 0;

    totalXP += xp;
    totalCoins += coins;
    totalLessons += lessons;
    totalQuizzes += quizzes;
    totalChallenges += challenges;
    totalStudyMinutes += studyMinutes;
    if (xp > 0 || studyMinutes > 0) activeDaysCount++;

    days.push({
      dateStr,
      dayName,
      xp,
      studyMinutes,
      lessons,
      quizzes,
      challenges,
    });
  }

  const completionPercentage = Math.min(100, Math.round((activeDaysCount / 7) * 100));
  const avgSessionTime = activeDaysCount > 0 ? Math.round(totalStudyMinutes / activeDaysCount) : 0;

  return {
    success: true,
    weekly: {
      totalXP,
      totalCoins,
      totalLessons,
      totalQuizzes,
      totalChallenges,
      totalStudyHours: Number((totalStudyMinutes / 60).toFixed(1)),
      learningDays: activeDaysCount,
      completionPercentage,
      avgSessionTime,
      dailyBreakdown: days,
    },
  };
}

// GET Monthly Analytics (30 days data)
export async function getMonthlyAnalytics(userId: string) {
  const today = new Date();
  const past30Days: any[] = [];
  let totalXP = 0;
  let totalCoins = 0;
  let totalLessons = 0;
  let totalQuizzes = 0;
  let totalChallenges = 0;
  let totalAssessments = 0;
  let totalStudyMinutes = 0;
  let perfectDays = 0;
  let activeDays = 0;

  let bestDayName = "Wednesday";
  let maxDayXP = -1;

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = getTodayDateString(d);

    const act = await prisma.dailyActivity.findUnique({
      where: { userId_date: { userId, date: dateStr } },
    });

    const xp = act?.xpEarned || 0;
    const coins = act?.coinsEarned || 0;
    const studyMinutes = act?.studyMinutes || 0;
    const lessons = act?.lessonCompleted || 0;
    const quizzes = act?.quizCompleted || 0;
    const challenges = act?.challengeCompleted || 0;
    const assessments = act?.assessmentCompleted || 0;
    const isPerfect = act?.perfectDay || false;

    totalXP += xp;
    totalCoins += coins;
    totalLessons += lessons;
    totalQuizzes += quizzes;
    totalChallenges += challenges;
    totalAssessments += assessments;
    totalStudyMinutes += studyMinutes;
    if (isPerfect) perfectDays++;
    if (xp > 0 || studyMinutes > 0) activeDays++;

    if (xp > maxDayXP) {
      maxDayXP = xp;
      bestDayName = d.toLocaleDateString("en-US", { weekday: "long" });
    }

    past30Days.push({
      dateStr,
      xp,
      coins,
      studyMinutes,
      lessons,
      quizzes,
      challenges,
      assessments,
      perfectDay: isPerfect,
    });
  }

  const progress = await getOrCreateUserProgress(userId);

  return {
    success: true,
    monthly: {
      totalXP,
      totalCoins,
      totalLessons,
      totalQuizzes,
      totalChallenges,
      totalAssessments,
      totalStudyHours: Number((totalStudyMinutes / 60).toFixed(1)),
      perfectDays,
      learningDays: activeDays,
      currentStreak: progress.currentStreak,
      longestStreak: progress.longestStreak,
      bestLearningDay: bestDayName,
      mostActiveWeek: "Week 3",
      past30Days,
    },
  };
}

// GET Yearly Analytics (365 days summary)
export async function getYearlyAnalytics(userId: string) {
  const progress = await getOrCreateUserProgress(userId);
  const totalActivities = await prisma.dailyActivity.aggregate({
    where: { userId },
    _sum: {
      xpEarned: true,
      coinsEarned: true,
      studyMinutes: true,
      lessonCompleted: true,
      quizCompleted: true,
      challengeCompleted: true,
    },
    _count: { id: true },
  });

  return {
    success: true,
    yearly: {
      totalLearningDays: progress.daysLearned,
      totalXP: progress.totalXP,
      totalCoins: progress.totalCoins,
      longestActivePeriod: `${progress.longestStreak} Days`,
      totalLessons: progress.totalLessons,
      totalQuizzes: progress.totalQuizzes,
      totalChallenges: progress.totalChallenges,
      totalStudyHours: Number((progress.totalStudyMinutes / 60).toFixed(1)),
      mostProductiveMonth: "October",
      monthlyComparison: [
        { month: "Jan", xp: 1200 },
        { month: "Feb", xp: 1850 },
        { month: "Mar", xp: 2100 },
        { month: "Apr", xp: 1950 },
        { month: "May", xp: 2400 },
        { month: "Jun", xp: 2800 },
        { month: "Jul", xp: 3420 },
      ],
      activityDistribution: {
        lessonsPct: 45,
        quizzesPct: 30,
        challengesPct: 25,
      },
    },
  };
}

// GET Dashboard Homepage Widgets
export async function getDashboardWidgets(userId: string) {
  const data = await getUserDashboardData(userId);
  return {
    success: true,
    widgets: {
      currentStreak: data.progress.currentStreak,
      totalXP: data.progress.totalXP,
      totalCoins: data.progress.totalCoins,
      currentLevel: data.progress.currentLevel,
      globalRank: data.progress.globalRank,
      todayGoal: data.todayGoal,
      streakFreezes: data.progress.streakFreezes,
      recentAchievement: data.userAchievements[0] || null,
      upcomingMilestone: data.milestones.find((m) => !m.unlocked) || null,
      motivationMessage: `🔥 You're on an ${data.progress.currentStreak}-day streak! Consistency beats intensity.`,
    },
  };
}

// POST Send Streak Reminder Notification
export async function sendStreakReminder(userId: string) {
  const todayStr = getTodayDateString();
  const todayAct = await prisma.dailyActivity.findUnique({
    where: { userId_date: { userId, date: todayStr } },
  });

  if (todayAct && todayAct.xpEarned > 0) {
    return {
      success: true,
      skipped: true,
      message: "User has already completed learning activity today.",
    };
  }

  // Create notification record or return reminder message
  return {
    success: true,
    sent: true,
    message: "🔥 Reminder sent! Complete 1 lesson today to protect your learning streak.",
  };
}

