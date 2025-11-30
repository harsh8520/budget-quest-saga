import React, { useMemo, useCallback } from 'react';
import { ZONES } from '../constants/gameData';
import { parseDateForCompare } from '../utils/dateHelpers';

const WorldMapSection = ({ data, updateAppData, awardXp, todaysDate }) => {

    const calculateSavingsForDateRange = useCallback((startDate, endDate) => {
        const transactionsInRange = (data.transactions || []).filter(t => {
            const transactionDate = parseDateForCompare(t.date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
        const income = transactionsInRange.filter(t => t.type === 'income').reduce((s, t) => s + (t.amount || 0), 0);
        const expenses = transactionsInRange.filter(t => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);
        return income - expenses;
    }, [data.transactions]);
    
    const userStartDate = useMemo(() => {
        if (!data.transactions || data.transactions.length === 0) return null;
        const sorted = [...data.transactions].sort((a, b) => parseDateForCompare(a.date) - parseDateForCompare(b.date));
        return parseDateForCompare(sorted[0].date);
    }, [data.transactions]);

    let unlocked = true;

    return (
        <section>
            <header className="mb-8"><h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">World Map</h2><p className="text-gray-400">Complete weekly savings goals to earn rewards.</p></header>
            
            {!userStartDate && (
                 <div className="bg-gray-800 p-4 rounded-lg pixel-border mb-8 text-center">
                    <p className="text-gray-400">Log your first transaction to begin your journey on the World Map!</p>
                </div>
            )}
            
            <div className="space-y-6">
                {ZONES.map((zone, index) => {
                    const isCompleted = (data.profile.completedZones || []).includes(zone.id);
                    let statusBlock;
                    let isCurrentlyUnlockable = !isCompleted && unlocked;

                    if (!userStartDate) {
                        isCurrentlyUnlockable = false;
                        statusBlock = <div className="font-pixel text-gray-500 text-sm">LOCKED</div>;
                    } else {
                        const weekStartDate = new Date(userStartDate);
                        weekStartDate.setUTCDate(weekStartDate.getUTCDate() + (index * 7));
                        const weekEndDate = new Date(weekStartDate);
                        weekEndDate.setUTCDate(weekEndDate.getUTCDate() + 6);

                        if (isCompleted) {
                            statusBlock = <div className="font-pixel text-green-400 text-sm">COMPLETED</div>;
                        } else if (isCurrentlyUnlockable) {
                            const savingsForThisWeek = calculateSavingsForDateRange(weekStartDate, weekEndDate);
                            const canClaim = todaysDate > weekEndDate && savingsForThisWeek >= zone.target;
                            
                            if (canClaim) {
                                // --- FIX: The onClick handler now also awards the XP ---
                                statusBlock = <button onClick={() => {
                                    updateAppData(d => {
                                        if (!d.profile.completedZones) d.profile.completedZones = [];
                                        d.profile.completedZones.push(zone.id);
                                        // The 'awardXp' prop is no longer used here because the main 'updateAppData'
                                        // function in App.jsx now handles calculating and showing XP gain automatically.
                                        // We just need to ensure the profile's XP is updated.
                                        if (d.profile) {
                                            d.profile.xp += zone.xp;
                                        }
                                    });
                                }} className="btn-pixel bg-yellow-500 hover:bg-yellow-600 text-gray-900 py-2 px-3 rounded-md text-xs">Claim Reward</button>;
                            } else {
                                let progress = 0;
                                let progressText = "Waiting...";
                                if(todaysDate >= weekStartDate) {
                                    progress = zone.target > 0 ? Math.min(100, (Math.max(0, savingsForThisWeek) / zone.target) * 100) : 0;
                                    progressText = `₹${Math.max(0, savingsForThisWeek).toFixed(2)} / ₹${zone.target.toFixed(2)}`;
                                 }
                                statusBlock = <div className="w-full"><p className="text-xs text-center mb-1 text-gray-300">{progressText}</p><div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden"><div className="zone-progress-bar h-full" style={{ width: `${progress}%` }}></div></div></div>;
                            }
                            unlocked = false;
                        } else {
                            statusBlock = <div className="font-pixel text-gray-500 text-sm">LOCKED</div>;
                        }
                    }

                    return (
                        <div key={zone.id} className={`bg-gray-800 p-4 rounded-lg flex justify-between items-center gap-4 ${!isCompleted && isCurrentlyUnlockable ? '' : 'opacity-60'}`}>
                            <div className="text-4xl">{zone.icon}</div>
                            <div className="flex-grow">
                                <h4 className="font-bold text-white">{zone.name}</h4>
                                <p className="text-sm text-gray-400 italic">"{zone.description}"</p>
                                <p className="text-sm text-gray-400 mt-1">Target: <span className="font-bold text-yellow-400">₹{zone.target}</span></p>
                            </div>
                            <div className="w-1/3 text-right">{statusBlock}</div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WorldMapSection;