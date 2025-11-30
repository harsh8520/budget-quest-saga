import React from 'react';
import { formatDate } from '../utils/dateHelpers';

function generateDemoData() {
    // ... (This function remains unchanged)
    const demoData = {
        profile: { name: '', level: 1, xp: 0, completedZones: [], achievements: [], settings: { frequency: 'monthly' } },
        transactions: [],
        budgets: [{ category: "Food", limit: 12000 }, { category: "Transport", limit: 5000 }, { category: "Shopping", limit: 10000 }, { category: "Entertainment", limit: 4000 }, { category: "Housing", limit: 25000 }, { category: "Utilities", limit: 4000 }, { category: "Other", limit: 2000 }]
    };
    const year = 2025;
    const month = 8;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'income', amount: 30000, category: 'Salary', description: 'Monthly Salary', date: '2025-09-01' });
    for (let day = 1; day <= daysInMonth; day++) {
        const date = formatDate(new Date(year, month, day));
        if (day % 2 === 0) demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 300 + Math.floor(Math.random() * 200), category: 'Food', description: 'Lunch/Dinner', date });
        if (day % 3 === 0) demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 150 + Math.floor(Math.random() * 100), category: 'Transport', description: 'Commute', date });
    }
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'income', amount: 20000, category: 'Freelance', description: 'Web Design Project', date: "2025-09-11" });
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 22000, category: 'Housing', description: 'Monthly Rent', date: "2025-09-02" });
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 3500, category: 'Utilities', description: 'Bills Payment', date: "2025-09-05" });
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 5500, category: 'Shopping', description: 'New Gadget', date: "2025-09-10" });
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 2500, category: 'Entertainment', description: 'Concert Tickets', date: "2025-09-14" });
    demoData.transactions.push({ id: Date.now() + Math.random(), type: 'expense', amount: 1500, category: 'Other', description: 'Miscellaneous', date: "2025-09-20" });
    return demoData;
}

// It now receives the 'user' prop and no longer receives 'username' or 'createNewUserData'
const SettingsSection = ({ user, data, updateAppData, onReset, todaysDate, setArtificialDate }) => {

    const handleNextDay = () => {
        setArtificialDate(prev => {
            let baseDate;
            if (prev) {
                baseDate = new Date(prev + 'T00:00:00Z');
            } else {
                const today = new Date();
                baseDate = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
            }
            baseDate.setUTCDate(baseDate.getUTCDate() + 1);
            const next = baseDate.toISOString().split('T')[0];

            // It now uses the user.uid from the prop
            if (user) {
                localStorage.setItem(`budgetQuestDate_${user.uid}`, next);
            } else {
                localStorage.setItem('budgetQuestDate', next);
            }
            return next;
        });
    };

    const handleLoadDemo = () => {
        if (window.confirm("This will replace your current progress with the demo data. Are you sure?")) {
            const demoData = generateDemoData();
            demoData.profile.name = data.profile.name;
            demoData.profile.settings = data.profile.settings;
            updateAppData(() => demoData);
            if (demoData.transactions && demoData.transactions.length > 0) {
                const sortedTransactions = [...demoData.transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
                const lastDate = sortedTransactions[sortedTransactions.length - 1].date;
                setArtificialDate(lastDate);
            }
        }
    };

    return (
        <section>
            <header className="mb-8"><h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">Settings</h2><p className="text-gray-400">Customize your adventure.</p></header>
            <div className="bg-gray-800 p-6 rounded-lg pixel-border max-w-md mb-6">
                <h3 className="font-pixel text-lg text-yellow-300 mb-4">Dashboard View</h3>
                <p className="text-sm text-gray-400 mb-2">Choose the time frame for your main dashboard report.</p>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2"><input type="radio" name="view-frequency" value="monthly" checked={data.profile.settings.frequency === 'monthly'} onChange={(e) => updateAppData(d => { d.profile.settings.frequency = e.target.value; return d; })} className="form-radio" /> Monthly</label>
                    <label className="flex items-center gap-2"><input type="radio" name="view-frequency" value="daily" checked={data.profile.settings.frequency === 'daily'} onChange={(e) => updateAppData(d => { d.profile.settings.frequency = e.target.value; return d; })} className="form-radio" /> Daily</label>
                </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg pixel-border border-yellow-400 max-w-md mb-6">
                <h3 className="font-pixel text-lg text-yellow-300 mb-4">Time Travel Controls</h3>
                <p className="text-sm text-gray-400 mb-2">Artificially advance the date to test weekly/monthly features.</p>
                <p className="text-sm text-gray-500 mb-2">Current Date: <span>{todaysDate.toDateString()}</span></p>
                <button onClick={handleNextDay} className="btn-pixel w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md text-sm mb-4">Advance to Next Day</button>
                <button onClick={handleLoadDemo} className="btn-pixel w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm">Load Demo Data</button>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg pixel-border border-red-500 max-w-md">
                <h3 className="font-pixel text-lg text-red-400 mb-4">Danger Zone</h3>
                <button onClick={onReset} className="btn-pixel w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md text-sm">Reset All Data</button>
            </div>
        </section>
    );
};

export default SettingsSection;