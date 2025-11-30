// src/utils/dateHelpers.js

export const formatDate = (date) => {
    // accepts Date or ISO-like string; returns 'YYYY-MM-DD'
    if (!date) return '';
    if (typeof date === 'string') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
};

export const parseDateForCompare = (dateStr) => {
    // always parse stored date (YYYY-MM-DD) to Date at UTC midnight
    return new Date(dateStr + "T00:00:00");
};

export const getWeekStartDate = (date) => {
    // accepts Date object
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    return new Date(new Date(d.setDate(diff)).setHours(0, 0, 0, 0));
};