// src/components/VoucherModal.jsx
import React from 'react';

const VoucherModal = ({ voucherCode, onClose }) => {
    return (
        <div className="modal active items-center justify-center p-4">
            <div className="modal-content bg-gray-800 w-full max-w-md m-4 p-8 rounded-lg text-center pixel-border border-yellow-400 relative">
                <button onClick={onClose} className="close-modal-btn absolute top-2 right-4 text-gray-400 hover:text-white text-3xl font-bold">&times;</button>
                <h2 className="font-pixel text-2xl text-yellow-300 mb-4">Reward Unlocked!</h2>
                <p className="text-5xl mb-4">🎟️</p>
                <p className="text-gray-300 mb-2">You've earned a voucher!</p>
                <p className="text-2xl font-bold bg-gray-900 text-white p-3 rounded-lg">{voucherCode}</p>
            </div>
        </div>
    );
};

export default VoucherModal;