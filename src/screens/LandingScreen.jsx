import React from 'react';

const LandingScreen = ({ onStart }) => (
    <div className="h-screen overflow-y-auto bg-[#1a1a2e]">
        {/* --- HERO SECTION --- */}
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-cover bg-center">
            <div className="bg-[#1a1a2e]/70 p-8 rounded-lg">
                <h1 className="font-pixel text-5xl md:text-6xl text-cyan-400 text-shadow-cyan">BudgetQuest Saga</h1>
                <p className="mt-6 font-semibold text-lg md:text-xl max-w-2xl mx-auto text-gray-200">Stop tracking expenses. Start your financial adventure.</p>
                <button onClick={onStart} className="mt-10 btn-pixel bg-emerald-500 hover:bg-emerald-600 text-gray-900 py-4 px-8 rounded-lg text-lg">Start Your Quest</button>
            </div>
        </div>

        {/* --- HOW IT WORKS SECTION --- */}
        <div className="bg-[#16213e] py-20 px-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="font-pixel text-3xl text-center text-yellow-300 mb-12">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="bg-[#1a1a2e] p-6 rounded-lg pixel-border"><p className="text-5xl mb-4">⚔️</p><h3 className="font-pixel text-lg text-yellow-300 mb-2">Gamify Your Finances</h3><p className="text-gray-400">Save money to explore, complete quests, and earn massive XP rewards.</p></div>
                    <div className="bg-[#1a1a2e] p-6 rounded-lg pixel-border"><p className="text-5xl mb-4">🎯</p><h3 className="font-pixel text-lg text-yellow-300 mb-2">Set Your Goals</h3><p className="text-gray-400">Use budgets to keep your spending in check and achieve your targets.</p></div>
                    <div className="bg-[#1a1a2e] p-6 rounded-lg pixel-border"><p className="text-5xl mb-4">🗺️</p><h3 className="font-pixel text-lg text-yellow-300 mb-2">Explore the World</h3><p className="text-gray-400">Your journey unfolds on a world map. Unlock new regions weekly.</p></div>
                </div>
            </div>
        </div>

        {/* --- NEW: DETAILED FEATURES SECTION --- */}
        <div className="py-20 px-6">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="text-7xl p-4">📜</div>
                    <div className="md:text-left text-center">
                        <h3 className="font-pixel text-2xl text-cyan-400 mb-4">Track with Ease</h3>
                        <p className="text-gray-300 leading-relaxed">Quickly log your income and expenses in a simple-to-use ledger. Every entry is a step forward on your quest, earning you XP and reinforcing good financial habits without the hassle.</p>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row-reverse items-center gap-8">
                    <div className="text-7xl p-4">📊</div>
                    <div className="md:text-right text-center">
                        <h3 className="font-pixel text-2xl text-cyan-400 mb-4">Visualize Your Victory</h3>
                        <p className="text-gray-300 leading-relaxed">See your financial habits come to life with clear charts and reports. Understand exactly where your money goes and identify the best areas to save and conquer your budget.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* --- NEW: TESTIMONIAL SECTION --- */}
        <div className="bg-[#16213e] py-20 px-6">
            <div className="max-w-3xl mx-auto text-center">
                <p className="text-2xl text-gray-300 italic">"BudgetQuest Saga completely changed how I see my finances. It's not a chore anymore, it's a game I actually want to win!"</p>
                <p className="font-pixel text-yellow-300 mt-6">- A Happy Adventurer</p>
            </div>
        </div>

        {/* --- NEW: FINAL CALL-TO-ACTION SECTION --- */}
        <div className="py-20 px-6 text-center">
            <h2 className="font-pixel text-3xl text-white mb-6">Ready to Start Your Adventure?</h2>
            <button onClick={onStart} className="btn-pixel bg-emerald-500 hover:bg-emerald-600 text-gray-900 py-4 px-8 rounded-lg text-lg">Claim Your Map</button>
        </div>

        <footer className="bg-black/20 py-6 text-center text-gray-500"><p>A Project By 404 NOTFOUND</p></footer>
    </div>
);

export default LandingScreen;