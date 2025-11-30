// src/components/AchievementSection.jsx
import React from 'react';
import { ACHIEVEMENTS } from '../constants/gameData';

const AchievementSection = ({ data }) => {
    return (
        <section>
            <header className="mb-8"><h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">Achievements</h2><p className="text-gray-400">Milestones of your heroic journey.</p></header>
            <div className="space-y-4">
                {Object.entries(ACHIEVEMENTS).map(([id, ach]) => {
                    const isUnlocked = (data.profile.achievements || []).includes(id);
                    return (
                        <div key={id} className={`achievement bg-gray-800 p-4 rounded-lg pixel-border flex items-center gap-4 ${isUnlocked ? 'unlocked' : 'locked'}`}>
                            <div className="text-4xl">{ach.icon}</div>
                            <div>
                                <h4 className={`font-pixel text-lg ${isUnlocked ? 'text-yellow-300' : 'text-gray-500'}`}>{ach.name}</h4>
                                <p className="text-sm text-gray-400">{ach.description}</p>
                                {isUnlocked && <p className="text-sm font-bold text-green-400">UNLOCKED (+{ach.xp} XP)</p>}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default AchievementSection;