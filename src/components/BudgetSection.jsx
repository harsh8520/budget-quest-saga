// src/components/BudgetSection.jsx
import React, { useState } from 'react';
import BudgetModal from './BudgetModal';

const BudgetSection = ({ data, updateAppData, calculateSpent }) => {
    const [showModal, setShowModal] = useState(false);

    const handleSetBudget = ({ category, limit }) => {
        updateAppData(d => {
            if (!d.budgets) d.budgets = [];
            const existing = d.budgets.find(b => b.category === category);
            if (existing) {
                existing.limit = limit;
            } else {
                d.budgets.push({ category, limit });
            }
            return d;
        });
        setShowModal(false);
    };

    return (
        <section>
            <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                    <h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">Budgets</h2>
                    <p className="text-gray-400">Allocate your gold to different chests.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-pixel bg-blue-500 hover:bg-blue-600 text-gray-900 py-2 px-4 rounded-md text-sm self-start md:self-center">Set Budget</button>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(!data.budgets || data.budgets.length === 0) ? (
                    <p className="text-center text-gray-500 py-8 bg-gray-800 rounded-lg pixel-border col-span-full">No budgets set yet.</p>
                ) : (
                    data.budgets.map(b => {
                        const spent = calculateSpent(b.category);
                        const percentage = b.limit > 0 ? Math.min(100, (spent / b.limit) * 100) : 0;
                        const isOver = spent > b.limit;
                        return (
                            <div key={b.category} className="bg-gray-800 p-4 rounded-lg">
                                <div className="flex justify-between items-baseline mb-2">
                                    <h4 className="font-pixel text-md text-blue-300">{b.category}</h4>
                                    <p className={`text-sm ${isOver ? 'text-red-400' : 'text-gray-400'}`}>₹{spent.toFixed(2)} / ₹{(b.limit || 0).toFixed(2)}</p>
                                </div>
                                <div className="w-full h-5 bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`${isOver ? 'budget-bar-over' : 'budget-bar-inner'} h-full`} style={{ width: `${percentage}%` }}></div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            {showModal && <BudgetModal onSet={handleSetBudget} onClose={() => setShowModal(false)} />}
        </section>
    );
};

export default BudgetSection;