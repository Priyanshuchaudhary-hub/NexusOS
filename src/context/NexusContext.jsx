import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { initialData } from '../data/initialData';
import { subscribeToAuthChanges, logoutUser, isFirebaseConfigured } from '../firebase/config';

const NexusContext = createContext(null);

export const NexusProvider = ({ children }) => {
  // Load from localStorage or fallback to rich seed
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('nexus_os_data');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load localStorage', e);
    }
    return initialData;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('nexus_os_firebase_user');
      if (savedUser) return JSON.parse(savedUser);
    } catch (e) {}
    return null;
  });

  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'goals' | 'classroom' | 'dsa' | 'report' | 'analysis'
  const [activeModal, setActiveModal] = useState(null); // 'checkin' | 'replan' | 'addGoal' | 'addTask' | 'logDSA' | 'csvImport' | 'upgrade' | 'auth' | null
  const [selectedTaskForReplan, setSelectedTaskForReplan] = useState(null);
  const [replanProposal, setReplanProposal] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Subscribe to live Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          displayName: user.displayName || user.email?.split('@')[0] || 'Nexus Scholar',
          email: user.email,
          photoURL: user.photoURL,
          isAnonymous: user.isAnonymous,
          provider: user.providerData?.[0]?.providerId || 'password'
        };
        setCurrentUser(userInfo);
        localStorage.setItem('nexus_os_firebase_user', JSON.stringify(userInfo));
        
        // Synchronize with user persona
        setData(prev => ({
          ...prev,
          user: {
            ...prev.user,
            name: userInfo.displayName,
            avatar: userInfo.photoURL || prev.user.avatar,
            email: userInfo.email || prev.user.email
          }
        }));
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexus_os_data', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  }, [data]);

  const showToast = (title, msg, type = 'info') => {
    setToastMessage({ title, msg, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#10b981', '#f59e0b']
    });
  };

  // Toggle Hinglish / English copy
  const toggleLanguage = () => {
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        preferredLanguage: prev.user.preferredLanguage === 'hinglish' ? 'english' : 'hinglish'
      }
    }));
  };

  // Complete a task
  const completeTask = (taskId) => {
    setData(prev => {
      const updatedTasks = prev.tasks.map(t => {
        if (t.id === taskId) {
          return { ...t, status: t.status === 'done' ? 'pending' : 'done' };
        }
        return t;
      });

      // If completing linked classroom assignment
      const targetTask = prev.tasks.find(t => t.id === taskId);
      let updatedClassroom = { ...prev.classroom };
      if (targetTask && targetTask.externalId && targetTask.status !== 'done') {
        updatedClassroom.assignments = updatedClassroom.assignments.map(a => 
          a.id === targetTask.externalId ? { ...a, status: 'turned_in' } : a
        );
      }

      return {
        ...prev,
        tasks: updatedTasks,
        classroom: updatedClassroom
      };
    });

    triggerConfetti();
    showToast(
      data.user.preferredLanguage === 'hinglish' ? 'Shabash! Task Completed 🎉' : 'Great Job! Task Completed 🎉',
      data.user.preferredLanguage === 'hinglish' ? 'Consistency streak bani hui hai.' : 'Maintained your daily streak momentum.',
      'success'
    );
  };

  // Mark task status (done, partial, missed)
  const markTaskStatus = (taskId, status, reason = '') => {
    if (status === 'done') {
      completeTask(taskId);
      return;
    }

    const task = data.tasks.find(t => t.id === taskId);

    if (status === 'missed' || status === 'partial') {
      // Trigger AI Replan Suggestion engine (PRD 7.2)
      setSelectedTaskForReplan({ task, status, reason });
      generateReplanSuggestions(task, status, reason);
      setActiveModal('replan');
    } else {
      setData(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, status } : t)
      }));
    }
  };

  // AI Replanning Engine (Deterministic constraints + Student context)
  const generateReplanSuggestions = (task, status, reason) => {
    const isHinglish = data.user.preferredLanguage === 'hinglish';
    const hasClassroomDeadline = data.classroom.assignments.some(a => a.status === 'assigned');

    let option1 = {
      id: 'opt-shift-weekend',
      title: isHinglish ? 'Saturday Morning Deep-Work Slot mein Shift karo' : 'Shift to Saturday Morning Deep-Work Block',
      details: isHinglish 
        ? 'Kal OS assignment submission hai (critical). Aaj ka pressure reduce karne ke liye isko Saturday 09:30 AM (2 hr slot) mein schedule karein.'
        : 'OS assignment is due tomorrow. Move this to Saturday 09:30 AM buffer block to protect assignment submission deadline.',
      impact: isHinglish ? 'Milestone date intact rahegi, burnout bachega.' : 'Zero milestone delay, prevents deadline conflict.',
      actionType: 'reschedule',
      newDue: 'Saturday, 09:30 AM'
    };

    let option2 = {
      id: 'opt-reduce-scope',
      title: isHinglish ? 'Scope 50% compress karo (Quick 25 min practice)' : 'Compress Scope by 50% (Quick 25-min drill)',
      details: isHinglish
        ? 'Poora 60 min session chhodne ke bajaye sirf 1 standard Medium problem ya revision karo. Consistency streak break nahi hogi.'
        : 'Instead of skipping the full 60 min, solve 1 high-frequency problem or review core patterns for 25 mins. Preserves streak.',
      impact: isHinglish ? '14-day streak safe rahegi, partial progress.' : 'Streak stays unbroken, light cognitive load.',
      actionType: 'compress',
      newDuration: Math.round((task?.estMinutes || 60) / 2)
    };

    let option3 = {
      id: 'opt-split-evening',
      title: isHinglish ? 'Kal shaam 07:00 PM par push karo' : 'Reschedule for Tomorrow 07:00 PM',
      details: isHinglish
        ? 'Kal college classes 4 PM khatam hoti hain. 7 PM slot mein 45 minutes reserve karke catch up karo.'
        : 'Classes end at 4 PM tomorrow. Schedule an evening catch-up sprint at 7 PM.',
      impact: isHinglish ? 'Same week finish hoga.' : 'Completed within the current sprint.',
      actionType: 'postpone',
      newDue: 'Tomorrow, 07:00 PM'
    };

    const explanation = isHinglish 
      ? `AI Coach Analysis: Aaj raat CS301 OS lab assignment ki due date pass hai. Agar aap dono saath karenge toh quality compromise hogi. AI recommended option: Weekend slot buffer use karein.`
      : `AI Coach Analysis: High cognitive load detected due to impending CS301 assignment. Moving this heavy task prevents burnout while keeping your weekly target within 95% confidence.`;

    setReplanProposal({
      task,
      status,
      userReason: reason || (isHinglish ? 'College workload & fatigue' : 'Academic deadline overlap'),
      explanation,
      options: [option1, option2, option3]
    });
  };

  // Apply user-confirmed replan option (PRD: Auto-apply nahi, user confirm kare)
  const applyReplanOption = (option) => {
    if (!replanProposal) return;
    const { task, userReason } = replanProposal;

    // Check plan limits
    if (data.user.plan === 'Free' && data.user.replansUsedThisMonth >= data.user.replansLimit) {
      setActiveModal('upgrade');
      showToast('Monthly Replan Limit Reached', 'Free tier includes 5 AI replans/month. Upgrade to Pro for unlimited.', 'error');
      return;
    }

    setData(prev => {
      let updatedTasks = prev.tasks.map(t => {
        if (t.id === task.id) {
          if (option.actionType === 'compress') {
            return {
              ...t,
              title: `[Compressed] ${t.title}`,
              estMinutes: option.newDuration,
              status: 'pending',
              notes: `Compressed via AI Replan: ${option.details}`
            };
          } else {
            return {
              ...t,
              status: 'pending',
              dueTime: option.newDue,
              notes: `Rescheduled by AI Coach to: ${option.newDue}`
            };
          }
        }
        return t;
      });

      const newLog = {
        id: `rep-${Date.now()}`,
        date: 'Today, Just Now',
        triggerTask: task.title,
        triggerReason: userReason,
        chosenOption: option.title,
        explanation: replanProposal.explanation,
        status: 'Applied'
      };

      return {
        ...prev,
        user: {
          ...prev.user,
          replansUsedThisMonth: prev.user.plan === 'Free' ? prev.user.replansUsedThisMonth + 1 : prev.user.replansUsedThisMonth
        },
        tasks: updatedTasks,
        replansHistory: [newLog, ...prev.replansHistory]
      };
    });

    setActiveModal(null);
    setReplanProposal(null);
    showToast(
      data.user.preferredLanguage === 'hinglish' ? 'Replan Apply Ho Gaya! 🎯' : 'Adaptive Replan Applied! 🎯',
      data.user.preferredLanguage === 'hinglish' ? 'Schedule smart tarike se adjust kar diya gaya hai.' : 'Your daily schedule has been optimized around your deadlines.',
      'success'
    );
  };

  // Google Classroom: Turn in assignment & auto-complete linked daily task
  const turnInAssignment = (assignmentId) => {
    setData(prev => {
      const assignment = prev.classroom.assignments.find(a => a.id === assignmentId);
      if (!assignment) return prev;

      const newStatus = assignment.status === 'turned_in' ? 'assigned' : 'turned_in';

      const updatedAssignments = prev.classroom.assignments.map(a => 
        a.id === assignmentId ? { ...a, status: newStatus } : a
      );

      // Link to daily task if exists
      const updatedTasks = prev.tasks.map(t => {
        if (t.externalId === assignmentId) {
          return { ...t, status: newStatus === 'turned_in' ? 'done' : 'pending' };
        }
        return t;
      });

      return {
        ...prev,
        classroom: {
          ...prev.classroom,
          assignments: updatedAssignments
        },
        tasks: updatedTasks
      };
    });

    triggerConfetti();
    showToast(
      'Google Classroom Synced',
      'Assignment turned in! Linked daily study task automatically marked as Done.',
      'success'
    );
  };

  // Simulated Google Classroom Sync
  const syncClassroom = () => {
    showToast('Connecting to Google Classroom...', 'Fetching active courses and coursework via read-only OAuth API', 'info');
    setTimeout(() => {
      setData(prev => ({
        ...prev,
        classroom: {
          ...prev.classroom,
          lastSynced: 'Just now'
        }
      }));
      showToast('Classroom Sync Complete', 'All 3 courses and assignments are up to date.', 'success');
    }, 1200);
  };

  // Log new DSA problem
  const logDSAProblem = (problem) => {
    setData(prev => {
      const newProblem = {
        id: `dsa-${Date.now()}`,
        solvedAt: 'Just now',
        status: 'Solved',
        ...problem
      };

      const diffKey = problem.difficulty.toLowerCase();
      const updatedDifficulty = {
        ...prev.dsa.byDifficulty,
        [diffKey]: (prev.dsa.byDifficulty[diffKey] || 0) + 1
      };

      const updatedTopics = prev.dsa.byTopic.map(t => {
        if (t.topic.toLowerCase().includes(problem.topic.toLowerCase())) {
          return { ...t, solved: t.solved + 1 };
        }
        return t;
      });

      return {
        ...prev,
        dsa: {
          ...prev.dsa,
          solvedCount: prev.dsa.solvedCount + 1,
          todaySolved: prev.dsa.todaySolved + 1,
          byDifficulty: updatedDifficulty,
          byTopic: updatedTopics,
          recentLogs: [newProblem, ...prev.dsa.recentLogs]
        }
      };
    });

    triggerConfetti();
    setActiveModal(null);
    showToast('DSA Problem Logged! 💻', `Added ${problem.title} (${problem.difficulty}) to your tracker.`, 'success');
  };

  // Import CSV DSA records
  const importDSACSV = (csvText) => {
    try {
      const lines = csvText.trim().split('\n');
      let count = 0;
      const newLogs = [];

      lines.forEach((line, idx) => {
        if (idx === 0 && line.toLowerCase().includes('title')) return; // header
        const parts = line.split(',');
        if (parts.length >= 3) {
          const title = parts[0].trim();
          const platform = parts[1]?.trim() || 'LeetCode';
          const difficulty = parts[2]?.trim() || 'Medium';
          const topic = parts[3]?.trim() || 'Arrays';
          
          newLogs.push({
            id: `dsa-csv-${Date.now()}-${idx}`,
            title,
            platform,
            difficulty,
            topic,
            solvedAt: 'Imported',
            status: 'Solved',
            timeSpentMins: 30
          });
          count++;
        }
      });

      if (count === 0) throw new Error('No valid rows found');

      setData(prev => ({
        ...prev,
        dsa: {
          ...prev.dsa,
          solvedCount: prev.dsa.solvedCount + count,
          recentLogs: [...newLogs, ...prev.dsa.recentLogs]
        }
      }));

      setActiveModal(null);
      showToast('CSV Import Successful', `Imported ${count} problems into your DSA repository.`, 'success');
    } catch (err) {
      showToast('CSV Import Error', 'Please check format: Title, Platform, Difficulty, Topic', 'error');
    }
  };

  // Add new Goal with AI Milestones breakdown (PRD 7.1)
  const addGoalWithAI = (goalInput) => {
    // Free plan constraint (PRD 7.6: Free: 2 active goals)
    if (data.user.plan === 'Free' && data.goals.length >= 2) {
      setActiveModal('upgrade');
      showToast('Active Goal Limit Reached', 'Free tier supports 2 active goals. Upgrade to Pro for unlimited goals.', 'error');
      return;
    }

    const newGoalId = `goal-${Date.now()}`;
    const generatedMilestones = [
      { id: `m-${Date.now()}-1`, week: 'Week 1-3', title: `Fundamentals & Core Concepts in ${goalInput.title}`, status: 'in-progress' },
      { id: `m-${Date.now()}-2`, week: 'Week 4-7', title: `Hands-on Problem Solving & Implementation`, status: 'pending' },
      { id: `m-${Date.now()}-3`, week: 'Week 8-10', title: `Mock Tests, Benchmarking & Review`, status: 'pending' },
      { id: `m-${Date.now()}-4`, week: 'Week 11-12', title: `Final Showcase & Interview Simulation`, status: 'pending' }
    ];

    const newGoal = {
      id: newGoalId,
      title: goalInput.title,
      category: goalInput.category || 'General',
      targetDate: goalInput.targetDate,
      hoursPerWeek: Number(goalInput.hoursPerWeek) || 10,
      priority: goalInput.priority || 'medium',
      status: 'in-progress',
      color: goalInput.color || '#6366f1',
      milestones: generatedMilestones
    };

    setData(prev => ({
      ...prev,
      goals: [newGoal, ...prev.goals]
    }));

    setActiveModal(null);
    showToast('AI Roadmap Created 🚀', `AI generated 4 milestones for "${goalInput.title}".`, 'success');
  };

  // Add manual task
  const addTask = (taskInput) => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: taskInput.title,
      goalId: taskInput.goalId || null,
      category: taskInput.category || 'General',
      estMinutes: Number(taskInput.estMinutes) || 45,
      status: 'pending',
      priority: taskInput.priority || 'medium',
      source: 'manual',
      dueTime: taskInput.dueTime || 'Today, 06:00 PM',
      notes: taskInput.notes || ''
    };

    setData(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));

    setActiveModal(null);
    showToast('Task Scheduled', `Added "${taskInput.title}" to today's plan.`, 'success');
  };

  // Upgrade Plan
  const upgradePlan = (planName) => {
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        plan: planName
      }
    }));
    triggerConfetti();
    setActiveModal(null);
    showToast('Welcome to NexusOS Pro! 🌟', 'Unlocked unlimited goals, unlimited AI replans, and deep analytics.', 'success');
  };

  // Firebase User Login & State Sync
  const handleFirebaseUserLogin = (userInfo) => {
    setCurrentUser(userInfo);
    try {
      localStorage.setItem('nexus_os_firebase_user', JSON.stringify(userInfo));
    } catch (e) {}

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        name: userInfo.displayName || prev.user.name,
        email: userInfo.email || prev.user.email,
        avatar: userInfo.photoURL || prev.user.avatar
      }
    }));
  };

  // Firebase User Logout
  const handleFirebaseUserLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    try {
      localStorage.removeItem('nexus_os_firebase_user');
    } catch (e) {}
    showToast('Signed Out', 'You have been logged out of your Firebase account.', 'info');
  };

  const updateUserProfile = (newProfile) => {
    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        ...newProfile
      }
    }));
    showToast('Profile Updated', 'Your student preferences and academic details have been saved.', 'success');
  };

  const resetData = () => {
    setData(initialData);
    localStorage.removeItem('nexus_os_data');
    showToast('Data Reset', 'All system data reset to default demo seed.', 'info');
  };

  return (
    <NexusContext.Provider
      value={{
        data,
        currentUser,
        isFirebaseConfigured: isFirebaseConfigured(),
        handleFirebaseUserLogin,
        handleFirebaseUserLogout,
        activeTab,
        setActiveTab,
        activeModal,
        setActiveModal,
        selectedTaskForReplan,
        replanProposal,
        toastMessage,
        toggleLanguage,
        completeTask,
        markTaskStatus,
        applyReplanOption,
        turnInAssignment,
        syncClassroom,
        logDSAProblem,
        importDSACSV,
        addGoalWithAI,
        addTask,
        upgradePlan,
        updateUserProfile,
        resetData,
        showToast,
        dismissToast: () => setToastMessage(null),
        triggerConfetti
      }}
    >
      {children}
    </NexusContext.Provider>
  );
};

export const useNexus = () => {
  const context = useContext(NexusContext);
  if (!context) throw new Error('useNexus must be used within NexusProvider');
  return context;
};
