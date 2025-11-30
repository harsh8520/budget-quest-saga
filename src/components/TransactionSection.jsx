// src/components/TransactionSection.jsx

import React, { useState } from 'react';
import { parseDateForCompare, formatDate } from '../utils/dateHelpers';
import TransactionModal from './TransactionModal';

const TransactionSection = ({ data, updateAppData, awardXp, todaysDate }) => {
    const [showModal, setShowModal] = useState(false);

    const handleAddTransaction = (newTx) => {
        updateAppData(d => {
            if (!d.transactions) d.transactions = [];
            d.transactions.push({
                ...newTx,
                id: Date.now() + Math.random(),
                date: formatDate(todaysDate)
            });
            if (d.profile) {
                d.profile.xp = d.profile.xp || 0;
            }
            return d;
        });
        if (awardXp) awardXp(10);
        setShowModal(false);
    };

    const handleDelete = (id) => {
        updateAppData(d => {
            d.transactions = (d.transactions || []).filter(tx => tx.id !== id);
            return d;
        });
    };

    return (
        <section>
            <header className="flex flex-col md:flex-row justify-between md:items-center mb-8 gap-4">
                <div>
                    <h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">Ledger</h2>
                    <p className="text-gray-400">Record your earnings and spendings.</p>
                </div>
                <button onClick={() => setShowModal(true)} className="btn-pixel bg-green-500 hover:bg-green-600 text-gray-900 py-2 px-4 rounded-md text-sm self-start md:self-center">Add New</button>
            </header>
            <div className="space-y-3">
                {(!data.transactions || data.transactions.length === 0) ? (
                    <p className="text-center text-gray-500 py-8 bg-gray-800 rounded-lg pixel-border">No transactions logged yet.</p>
                ) : (
                    [...(data.transactions || [])].sort((a, b) => parseDateForCompare(b.date) - parseDateForCompare(a.date)).map(t => (
                        <div key={t.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="font-bold text-white">{t.description}</p>
                                <p className="text-sm text-gray-400">{t.category} - {t.date}</p>
                            </div>
                            <div className="flex items-center">
                                <p className={`font-bold text-lg ${t.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>{t.type === 'expense' ? '-' : '+'}₹{(t.amount || 0).toFixed(2)}</p>
                                <button onClick={() => handleDelete(t.id)} className="delete-btn ml-4 text-xs">X</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showModal && <TransactionModal onAdd={handleAddTransaction} onClose={() => setShowModal(false)} />}
        </section>
    );
};

export default TransactionSection;