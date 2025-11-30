// src/components/BudgetModal.jsx
import React, { useState } from 'react';
import { EXPENSE_CATEGORIES } from '../constants/gameData';

const BudgetModal = ({ onSet, onClose }) => {
    const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
    const [limit, setLimit] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const lim = parseFloat(limit);
        if (isNaN(lim) || lim < 0) return alert('Please enter a valid limit');
        onSet({ category, limit: lim });
    };

    return (
        <div className="modal active items-center justify-center p-4">
            <div className="modal-content bg-gray-800 w-full max-w-md m-4 p-6 rounded-lg pixel-border relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
                <h3 className="font-pixel text-xl text-yellow-300 mb-4">Set a Budget</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label className="block font-pixel text-sm mb-2">Category</label><select value={category} onChange={e => setCategory(e.target.value)} className="w-full" required>{EXPENSE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div className="mb-4"><label className="block font-pixel text-sm mb-2">Monthly Limit (₹)</label><input type="number" value={limit} onChange={e => setLimit(e.target.value)} className="w-full" step="1" min="0" required /></div>
                    <button type="submit" className="btn-pixel w-full bg-blue-500 hover:bg-blue-600 text-gray-900 py-3 rounded-md text-sm">Set Budget</button>
                </form>
            </div>
        </div>
    );
};

export default BudgetModal;