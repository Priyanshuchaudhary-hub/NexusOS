// NexusOS Seed Data — Realistic B.Tech CS Student Persona (Aarav, 3rd Year)
export const initialData = {
  user: {
    name: "Aarav Sharma",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    college: "National Institute of Technology (NIT)",
    branch: "Computer Science & Engineering",
    year: "3rd Year (Sem 5)",
    plan: "Free", // 'Free' | 'Premium'
    replansUsedThisMonth: 3,
    replansLimit: 5,
    streakDays: 14,
    preferredLanguage: "hinglish", // 'english' | 'hinglish'
    targetDate: "2027-01-15", // SDE Internship Season
  },
  
  // Goals (PRD: AI 4-12 hafte ke milestones banata hai)
  goals: [
    {
      id: "goal-1",
      title: "Crack Top-Tier SDE Internship (DSA 250+ & LLD)",
      category: "Placement",
      targetDate: "2027-01-15",
      hoursPerWeek: 18,
      priority: "high",
      status: "in-progress",
      color: "#22A06B",
      milestones: [
        { id: "m1-1", week: "Week 1-3", title: "Master Arrays, Two Pointers & Binary Search", status: "completed" },
        { id: "m1-2", week: "Week 4-6", title: "Trees, BST & Graph Traversals (DFS/BFS)", status: "in-progress" },
        { id: "m1-3", week: "Week 7-9", title: "Dynamic Programming Patterns & Greedy", status: "pending" },
        { id: "m1-4", week: "Week 10-12", title: "Low Level Design (LLD) & Mock Interviews", status: "pending" }
      ]
    },
    {
      id: "goal-2",
      title: "Build Production AI Agent Project (NexusOS)",
      category: "Projects",
      targetDate: "2026-11-30",
      hoursPerWeek: 12,
      priority: "high",
      status: "in-progress",
      color: "#16A34A",
      milestones: [
        { id: "m2-1", week: "Week 1-2", title: "PRD, System Architecture & Database Schema", status: "completed" },
        { id: "m2-2", week: "Week 3-4", title: "Frontend Dashboard & Reactive State Loop", status: "in-progress" },
        { id: "m2-3", week: "Week 5-6", title: "Google Classroom Sync & AI Replan Engine", status: "pending" }
      ]
    },
    {
      id: "goal-3",
      title: "Maintain Semester 5 CGPA > 8.5 (OS, DBMS, Networks)",
      category: "Academics",
      targetDate: "2026-12-20",
      hoursPerWeek: 10,
      priority: "medium",
      status: "in-progress",
      color: "#15803D",
      milestones: [
        { id: "m3-1", week: "Week 1-4", title: "OS Process Synchronization & Deadlocks", status: "completed" },
        { id: "m3-2", week: "Week 5-8", title: "DBMS SQL Normalization & Concurrency Control", status: "in-progress" },
        { id: "m3-3", week: "Week 9-12", title: "End-Sem Preparation & Lab Practical Submissions", status: "pending" }
      ]
    }
  ],

  // Today's Tasks (PRD: Roz subah 3-5 tasks kya hain aur kitna time lagega)
  tasks: [
    {
      id: "task-101",
      title: "LeetCode: Solve 2 Medium Binary Trees (Diameter & Lowest Common Ancestor)",
      goalId: "goal-1",
      category: "DSA",
      estMinutes: 60,
      status: "pending", // 'pending' | 'done' | 'partial' | 'missed'
      priority: "high",
      source: "manual",
      dueTime: "11:00 AM",
      notes: "Focus on recursive bottom-up approach to avoid O(N^2) complexity."
    },
    {
      id: "task-102",
      title: "Operating Systems Assignment 3: CPU Scheduling Algorithms (Round Robin & SJF)",
      goalId: "goal-3",
      category: "Classroom",
      estMinutes: 90,
      status: "pending",
      priority: "critical",
      source: "classroom",
      externalId: "cls-assign-301",
      courseName: "CS301: Operating Systems",
      dueTime: "Tomorrow 11:59 PM",
      classroomLink: "https://classroom.google.com/c/CS301/a/sched3"
    },
    {
      id: "task-103",
      title: "Full-Stack Project: Implement Smart Check-in & AI Replan Modal",
      goalId: "goal-2",
      category: "Project",
      estMinutes: 75,
      status: "pending",
      priority: "high",
      source: "manual",
      dueTime: "04:30 PM",
      notes: "Wire up intelligent prompt suggestions and replan options A/B."
    },
    {
      id: "task-104",
      title: "DBMS Lab Prep: B-Tree Indexing and ACID properties summary notes",
      goalId: "goal-3",
      category: "Academics",
      estMinutes: 35,
      status: "done",
      priority: "medium",
      source: "classroom",
      externalId: "cls-lab-302",
      courseName: "CS302: Database Management Systems",
      dueTime: "06:00 PM"
    }
  ],

  // Google Classroom Connected Courses & Assignments (PRD: 7.3 Google Classroom Sync)
  classroom: {
    isConnected: true,
    accountEmail: "aarav.cs24@nit.edu.in",
    lastSynced: "Today, 10:45 AM",
    autoSyncEnabled: true,
    courses: [
      {
        id: "c-1",
        name: "CS301: Operating Systems",
        instructor: "Prof. R. K. Verma",
        room: "Hall-4B",
        activeAssignments: 2,
        color: "#6366f1"
      },
      {
        id: "c-2",
        name: "CS304: Design & Analysis of Algorithms",
        instructor: "Dr. Ananya Sharma",
        room: "CS-Lab 2",
        activeAssignments: 1,
        color: "#ec4899"
      },
      {
        id: "c-3",
        name: "CS302: Database Management Systems",
        instructor: "Prof. S. Mukhopadhyay",
        room: "LH-12",
        activeAssignments: 1,
        color: "#10b981"
      }
    ],
    assignments: [
      {
        id: "cls-assign-301",
        courseId: "c-1",
        courseName: "CS301: Operating Systems",
        title: "Assignment 3: CPU Scheduling Simulation in C/C++",
        description: "Implement Preemptive Shortest Job First (SJF) and Round Robin with quantum = 2ms. Submit code + PDF output.",
        dueDate: "Tomorrow, 11:59 PM",
        status: "assigned", // 'assigned' | 'turned_in' | 'missing' | 'late'
        linkedTaskId: "task-102"
      },
      {
        id: "cls-assign-304",
        courseId: "c-2",
        courseName: "CS304: Design & Analysis of Algorithms",
        title: "Problem Set 4: Network Flow & Max Bipartite Matching",
        description: "Ford-Fulkerson algorithm analysis and 4 proof questions.",
        dueDate: "Friday, 05:00 PM",
        status: "assigned",
        linkedTaskId: null
      },
      {
        id: "cls-lab-302",
        courseId: "c-3",
        courseName: "CS302: Database Management Systems",
        title: "Lab Practical 5: Complex Joins & Query Optimization Plan",
        description: "Submit SQL queries and EXPLAIN ANALYZE execution cost comparison.",
        dueDate: "Yesterday, 05:00 PM",
        status: "turned_in",
        linkedTaskId: "task-104"
      }
    ]
  },

  // DSA Tracker (PRD: 7.4 Manual problem log, CSV import, topic/difficulty charts)
  dsa: {
    targetProblems: 250,
    solvedCount: 148,
    dailyTarget: 2,
    todaySolved: 1,
    byDifficulty: {
      easy: 58,
      medium: 76,
      hard: 14
    },
    byTopic: [
      { topic: "Arrays & Strings", solved: 34, total: 45 },
      { topic: "Two Pointers & Sliding Window", solved: 22, total: 28 },
      { topic: "Trees & Binary Search Trees", solved: 32, total: 40 },
      { topic: "Graphs (BFS/DFS/Dijkstra)", solved: 19, total: 35 },
      { topic: "Dynamic Programming", solved: 26, total: 50 },
      { topic: "Trie & Bit Manipulation", solved: 15, total: 25 }
    ],
    recentLogs: [
      {
        id: "dsa-1",
        title: "Lowest Common Ancestor of a Binary Tree",
        platform: "LeetCode",
        problemNumber: "236",
        difficulty: "Medium",
        topic: "Trees",
        status: "Solved",
        solvedAt: "Today, 09:40 AM",
        timeSpentMins: 28,
        url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/"
      },
      {
        id: "dsa-2",
        title: "Course Schedule II (Topological Sort)",
        platform: "LeetCode",
        problemNumber: "210",
        difficulty: "Medium",
        topic: "Graphs",
        status: "Solved",
        solvedAt: "Yesterday, 10:15 PM",
        timeSpentMins: 35,
        url: "https://leetcode.com/problems/course-schedule-ii/"
      },
      {
        id: "dsa-3",
        title: "Trapping Rain Water",
        platform: "LeetCode",
        problemNumber: "42",
        difficulty: "Hard",
        topic: "Two Pointers",
        status: "Solved",
        solvedAt: "Oct 13, 08:30 PM",
        timeSpentMins: 45,
        url: "https://leetcode.com/problems/trapping-rain-water/"
      },
      {
        id: "dsa-4",
        title: "Coin Change (Min Coins)",
        platform: "LeetCode",
        problemNumber: "322",
        difficulty: "Medium",
        topic: "Dynamic Programming",
        status: "Solved",
        solvedAt: "Oct 12, 11:00 AM",
        timeSpentMins: 25,
        url: "https://leetcode.com/problems/coin-change/"
      }
    ]
  },

  // Weekly Report (PRD: 7.5 Completed vs planned, streak, DSA count, assignment status, top wins & misses)
  weeklyReport: {
    weekRange: "Oct 08 – Oct 14, 2026",
    completionRate: 84, // percentage
    plannedTasks: 25,
    completedTasks: 21,
    missedTasks: 4,
    dsaSolvedThisWeek: 13,
    assignmentsTurnedIn: 3,
    studyHoursLogged: 34.5,
    streakMaintained: 14,
    topWins: [
      "Maintained 14-day consistency streak without skipping DSA",
      "Submitted OS CPU scheduling benchmark 18 hours before deadline",
      "Solved first DP on Trees Hard problem without hints"
    ],
    topMisses: [
      "Skipped Thursday evening DBMS revision due to college fest prep",
      "Delayed AI project tool-calling tests by 1 day"
    ],
    aiCoachAnalysis: {
      english: "Outstanding academic momentum Aarav! Your DSA discipline is in the top 5% of placement aspirants. However, academic assignments spiked your workload on Thursday causing project task drop. Next week, we will front-load hard DSA into 7:30 AM morning blocks before college hours.",
      hinglish: "Superb pace Aarav! 14 din ki streak solid hai aur DSA target 85% on-track hai. Par Thursday ko assignments clash ki wajah se AI project delay hua. Next week hum heavy DSA tasks subah 7:30 AM slot mein shift karenge taaki college ke baad burnout na ho."
    },
    suggestedNextWeekFocus: [
      "Dynamic Programming Knapsack & Subsequences (5 problems)",
      "OS Memory Management & Page Replacement Lab Submission",
      "Connect Google Calendar 2-way sync to block out class timings"
    ]
  },

  // Active Replans History (PRD: 7.2 Missed hone par system 1-3 options deta hai, auto-apply nahi, user confirm kare)
  replansHistory: [
    {
      id: "rep-1",
      date: "Oct 13, 2026",
      triggerTask: "LeetCode: Word Break II (Hard)",
      triggerReason: "Assignment deadline clash with OS Lab",
      chosenOption: "Shifted to Saturday morning 2-hour marathon",
      explanation: "Kal OS assignment submission thi, isliye high-intensity Hard problem ko weekend buffer mein reschedule kiya gaya.",
      status: "Applied"
    }
  ]
};
