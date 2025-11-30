import React from 'react';
import { MAX_LEVEL, MEDALS } from '../constants/gameData';
import { parseDateForCompare } from '../utils/dateHelpers';

const DashboardSection = ({ data, todaysDate }) => {
    if (!data || !data.profile) {
        return <div className="font-pixel text-center p-8">Loading Profile...</div>;
    }

    const { profile } = data;
    const { level, xp, name } = profile;
    const xpForNextLevel = Math.max(1, level * 100);
    const now = todaysDate || new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    let income, expenses, title;

    // This is the new logic for daily/monthly views
    if (data.profile.settings.frequency === 'daily') {
        title = "Today's Report";

        const monthlyTransactions = (data.transactions || []).filter(t => {
            const transactionDate = parseDateForCompare(t.date);
            return transactionDate >= startOfMonth && transactionDate <= now;
        });
        income = monthlyTransactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);

        const dailyTransactions = (data.transactions || []).filter(t =>
            parseDateForCompare(t.date).toDateString() === now.toDateString()
        );
        expenses = dailyTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);

    } else { // 'monthly' view
        title = "This Month's Report";

        const monthlyTransactions = (data.transactions || []).filter(t => {
            const transactionDate = parseDateForCompare(t.date);
            return transactionDate >= startOfMonth && transactionDate <= now;
        });

        income = monthlyTransactions.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);
        expenses = monthlyTransactions.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);
    }

    const net = income - expenses;

    return (
        <section>
            <header className="mb-8">
                <h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">Dashboard</h2>
                <p className="text-gray-400">Welcome back, <span className="font-bold">{name}</span>!</p>
            </header>
            {/* This JSX now uses the correct pixel-art styles */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-gray-800 p-6 rounded-lg pixel-border">
                    <h3 className="font-pixel text-lg text-yellow-300 mb-4">Player Stats</h3>
                    <div className="mb-4"><p className="font-pixel text-sm">Level: <span className="text-white">{level}</span> / {MAX_LEVEL}</p></div>
                    <div>
                        <p className="font-pixel text-sm mb-2">XP: <span className="text-white">{xp}</span> / <span id="xp-next-level">{xpForNextLevel}</span></p>
                        <div className="w-full h-6 bg-gray-700 rounded-full overflow-hidden pixel-border border-2"><div className="xp-bar h-full" style={{ width: `${Math.min(100, (xp / xpForNextLevel) * 100)}%` }}></div></div>
                    </div>
                    <h4 className="font-pixel text-md text-yellow-300 mt-6 mb-2">Medals</h4>
                    <div className="flex gap-2">
                        {Object.entries(MEDALS).map(([lvl, medal]) => level >= parseInt(lvl) ? <div key={lvl} className="text-2xl" title={`Reached Level ${lvl}!`}>{medal}</div> : null)}
                    </div>
                </div>
                <div className="lg:col-span-2 bg-gray-800 p-6 rounded-lg pixel-border">
                    <h3 id="dashboard-report-title" className="font-pixel text-lg text-green-300 mb-4">{title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
                        <div className="bg-gray-700 p-4 rounded"><p className="font-pixel text-sm text-green-400">Income</p><p id="dashboard-income" className="text-2xl font-bold text-white">₹{income.toFixed(2)}</p></div>
                        <div className="bg-gray-700 p-4 rounded"><p className="font-pixel text-sm text-red-400">Expenses</p><p id="dashboard-expenses" className="text-2xl font-bold text-white">₹{expenses.toFixed(2)}</p></div>
                    </div>
                    <div className="mt-4 bg-gray-700 p-4 rounded"><p className="font-pixel text-sm text-blue-400 text-center">Net Balance</p><p id="dashboard-net" className={`text-3xl font-bold text-white text-center ${net >= 0 ? 'text-green-400' : 'text-red-400'}`}>₹{net.toFixed(2)}</p></div>
                </div>
            </div>
        </section>
    );
};

export default DashboardSection;