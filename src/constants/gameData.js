
export const MAX_LEVEL = 50;

export const EXPENSE_CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Utilities", "Shopping", "Other"];
export const INCOME_CATEGORIES = ["Salary", "Freelance", "Gift", "Other"];

// The ZONES constant has new icons and a "description" field for each week.
export const ZONES = [
    { id: 'week1', name: 'Week 1', icon: '🌱', description: 'Prove your discipline by meeting your first savings goal.', target: 500, xp: 150 },
    { id: 'week2', name: 'Week 2', icon: '📈', description: 'Build on your success and keep the momentum going.', target: 1500, xp: 250 },
    { id: 'week3', name: 'Week 3', icon: '🏆', description: 'A true milestone! You\'re becoming a savings champion.', target: 3000, xp: 400 },
    { id: 'week4', name: 'Week 4', icon: '💎', description: 'Exceptional work! Your financial habits are now rock-solid.', target: 5000, xp: 600 },
    { id: 'week5', name: 'Week 5', icon: '👑', description: 'The final challenge. Ascend to the rank of Budget Master.', target: 10000, xp: 1000 }
];
// --- END OF MODIFIED SECTION ---

export const MEDALS = { 5: '🥉', 10: '🥈', 20: '🥇', 30: '💎', 40: '👑', 50: '🏆' };

export const ACHIEVEMENTS = {
    firstRupee: { name: 'First Rupee Saved', icon: '💰', description: 'Log your first income transaction.', xp: 25, condition: (data) => (data.transactions || []).some(t => t.type === 'income') },
    budgetMaster: { name: 'Budget Master', icon: '🎯', description: 'Set up 3 different budgets.', xp: 50, condition: (data) => (data.budgets || []).length >= 3 },
    explorer: { name: 'Explorer', icon: '🗺️', description: 'Clear your first Zone on the World Map.', xp: 75, condition: (data) => (data.profile?.completedZones || []).length > 0 },
};