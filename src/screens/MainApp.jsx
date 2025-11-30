import React, { useState, useCallback } from 'react';
import { MAX_LEVEL } from '../constants/gameData';
import { parseDateForCompare } from '../utils/dateHelpers';

// Importing Components
import SideNav from '../components/SideNav';
import DashboardSection from '../components/DashboardSection';
import TransactionSection from '../components/TransactionSection';
import BudgetSection from '../components/BudgetSection';
import WorldMapSection from '../components/WorldMapSection';
import AchievementSection from '../components/AchievementSection';
import ReportsSection from '../components/ReportsSection';
import SettingsSection from '../components/SettingsSection';
import VoucherModal from '../components/VoucherModal';
import Notification from '../components/Notification';


const MainApp = ({ user, appData, updateAppData, onReset, onLogout, voucher, setVoucher, todaysDate, setArtificialDate, notification }) => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const awardXpLocal = useCallback((profile, amount) => {
        if (profile.level >= MAX_LEVEL) return;
        profile.xp += amount;
        if (profile.xp < 0) profile.xp = 0;
        let xpForNextLevel = profile.level * 100;
        while (profile.xp >= xpForNextLevel && profile.level < MAX_LEVEL) {
            profile.level++;
            profile.xp -= xpForNextLevel;
            xpForNextLevel = profile.level * 100;
        }
    }, []);

    const calculateSpent = (category) => {
        const now = todaysDate;
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        return (appData.transactions || []).filter(t => {
            const transactionDate = parseDateForCompare(t.date);
            return t.type === 'expense' && t.category === category && transactionDate >= startOfMonth && transactionDate <= now;
        }).reduce((sum, t) => sum + t.amount, 0);
    };

    return (
        <>
            <Notification message={notification} />
            <SideNav activeSection={activeSection} setActiveSection={setActiveSection} onLogout={onLogout} />
            <main className="flex-1 p-6 md:p-10 overflow-y-auto">
                {activeSection === 'dashboard' && <DashboardSection data={appData} todaysDate={todaysDate} />}
                {activeSection === 'transactions' && <TransactionSection data={appData} updateAppData={updateAppData} awardXp={(amount) => updateAppData(d => { awardXpLocal(d.profile, amount); return d; })} todaysDate={todaysDate} />}
                {activeSection === 'budgets' && <BudgetSection data={appData} updateAppData={updateAppData} calculateSpent={calculateSpent} />}
                {activeSection === 'map' && <WorldMapSection data={appData} updateAppData={updateAppData} awardXp={(amount) => updateAppData(d => { awardXpLocal(d.profile, amount); return d; })} todaysDate={todaysDate} />}
                {activeSection === 'achievements' && <AchievementSection data={appData} />}
                {activeSection === 'reports' && <ReportsSection data={appData} />}
                {/* It now passes the 'user' object to SettingsSection */}
                {activeSection === 'settings' && <SettingsSection user={user} data={appData} updateAppData={updateAppData} onReset={onReset} todaysDate={todaysDate} setArtificialDate={setArtificialDate} />}
                {voucher && <VoucherModal voucherCode={voucher} onClose={() => setVoucher(null)} />}
            </main>
        </>
    );
};

export default MainApp;