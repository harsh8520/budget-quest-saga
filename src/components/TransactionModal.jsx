// src/components/TransactionModal.jsx

import React, { useState, useEffect } from 'react';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../constants/gameData';

const TransactionModal = ({ onAdd, onClose }) => {
    const [type, setType] = useState('expense');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState(EXPENSE_CATEGORIES[0]);
    const [description, setDescription] = useState('');

    useEffect(() => {
        setCategory(type === 'expense' ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]);
    }, [type]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const amt = parseFloat(amount);
        if (isNaN(amt) || amt < 0) return alert('Please enter a valid amount');
        onAdd({ type, amount: amt, category, description });
    };

    const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

    return (
        <div className="modal active items-center justify-center p-4">
            <div className="modal-content bg-gray-800 w-full max-w-md m-4 p-6 rounded-lg pixel-border relative">
                <button onClick={onClose} className="absolute top-2 right-4 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
                <h3 className="font-pixel text-xl text-yellow-300 mb-4">Log a Transaction</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label className="block font-pixel text-sm mb-2">Type</label><select value={type} onChange={e => setType(e.target.value)} className="w-full" required><option value="expense">Expense</option><option value="income">Income</option></select></div>
                    <div className="mb-4"><label className="block font-pixel text-sm mb-2">Amount (₹)</label><input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full" step="0.01" min="0" required /></div>
                    <div className="mb-4"><label className="block font-pixel text-sm mb-2">Category</label><select value={category} onChange={e => setCategory(e.target.value)} className="w-full" required>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                    <div className="mb-4"><label className="block font-pixel text-sm mb-2">Description</label><input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full" required /></div>
                    <button type="submit" className="btn-pixel w-full bg-green-500 hover:bg-green-600 text-gray-900 py-3 rounded-md text-sm">Save Transaction</button>
                </form>
            </div>
        </div>
    );
};

export default TransactionModal;