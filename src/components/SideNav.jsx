// src/components/SideNav.jsx
import React from 'react';

const SideNav = ({ activeSection, setActiveSection, onLogout }) => {
    const navItems = ['dashboard', 'transactions', 'budgets', 'map', 'achievements', 'reports', 'settings'];
    return (
        <nav className="bg-gray-900 md:w-64 p-4 flex flex-row md:flex-col justify-around md:justify-start shrink-0">
            <h1 className="font-pixel text-xl text-white tracking-wider mb-8 hidden md:block">BUDGETQUEST</h1>
            {navItems.map(item => (
                <button
                    key={item}
                    onClick={() => setActiveSection(item)}
                    data-section={item}
                    className={`nav-item font-pixel text-sm w-full text-left p-3 rounded-lg mb-2 capitalize ${activeSection === item ? 'active' : ''}`}
                >
                    {item}
                </button>
            ))}
            <div className="flex-grow"></div>
            <button onClick={onLogout} className="font-pixel text-sm w-full text-left p-3 rounded-lg text-red-400 hover:bg-red-900/50">Log Out</button>
        </nav>
    );
};

export default SideNav;