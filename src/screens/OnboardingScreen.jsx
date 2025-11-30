
import React, { useState } from 'react';

const OnboardingScreen = ({ onFinish }) => {
    const [settings, setSettings] = useState({ frequency: 'monthly' });
    const handleFinish = () => {
        onFinish(settings);
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-lg pixel-border text-center">
                <h2 className="font-pixel text-xl md:text-2xl text-yellow-300 mb-8">Choose Your Path</h2>
                <p className="text-gray-400 mb-4">How detailed do you want your quest log?</p>
                <div className="flex justify-center gap-4 mb-8">
                    <label className={`question-card p-4 rounded-lg cursor-pointer ${settings.frequency === 'monthly' ? 'selected' : 'bg-gray-900'}`}>
                        <input type="radio" name="frequency" value="monthly" checked={settings.frequency === 'monthly'} onChange={(e) => setSettings({ frequency: e.target.value })} className="sr-only" /> Monthly
                    </label>
                    <label className={`question-card p-4 rounded-lg cursor-pointer ${settings.frequency === 'daily' ? 'selected' : 'bg-gray-900'}`}>
                        <input type="radio" name="frequency" value="daily" checked={settings.frequency === 'daily'} onChange={(e) => setSettings({ frequency: e.target.value })} className="sr-only" /> Daily
                    </label>
                </div>
                <button onClick={handleFinish} className="btn-pixel bg-emerald-500 hover:bg-emerald-600 text-gray-900 py-3 px-6 rounded-lg text-md">Begin Adventure</button>
            </div>
        </div>
    );
};

export default OnboardingScreen;