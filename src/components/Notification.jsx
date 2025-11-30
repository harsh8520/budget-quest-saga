import React from 'react';

const Notification = ({ message }) => {
    if (!message) return null;

    return (
        <div className="notification font-pixel text-lg text-yellow-300">
            {message}
        </div>
    );
};

// Check this line very carefully for typos.
export default Notification;