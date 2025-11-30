// src/components/ReportsSection.jsx
import React, { useMemo } from 'react';
import { Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { EXPENSE_CATEGORIES } from '../constants/gameData';
import { formatDate } from '../utils/dateHelpers';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Filler, zoomPlugin);

const ReportsSection = ({ data }) => {
    const pieData = useMemo(() => {
        const expenseData = EXPENSE_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: 0 }), {});
        (data.transactions || []).filter(t => t.type === 'expense').forEach(t => { expenseData[t.category] = (expenseData[t.category] || 0) + (t.amount || 0); });
        const filtered = Object.fromEntries(Object.entries(expenseData).filter(([_, v]) => v > 0));

        if (Object.keys(filtered).length === 0) {
            return { labels: ['No expenses'], datasets: [{ data: [1], backgroundColor: ['#6b7280'], borderWidth: 0 }] };
        }

        return {
            labels: Object.keys(filtered),
            datasets: [{ data: Object.values(filtered), backgroundColor: ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4'], borderWidth: 0 }]
        };
    }, [data.transactions]);

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#e0e0e0' }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.parsed || 0;
                        const total = context.chart.data.datasets[0].data.reduce((sum, val) => sum + val, 0);
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${label}: ${percentage}%`;
                    }
                }
            }
        }
    };

    const lineData = useMemo(() => {
        const dateLabels = [...new Set((data.transactions || []).map(t => t.date))].sort();

        if (dateLabels.length === 0) {
            const todayStr = formatDate(new Date());
            return {
                labels: [todayStr],
                datasets: [
                    { label: 'Income', data: [0], borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.3)', fill: true, tension: 0.3 },
                    { label: 'Expense', data: [0], borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.3)', fill: true, tension: 0.3 },
                    { label: 'Net Balance', data: [0], borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.3)', fill: true, tension: 0.3 },
                ]
            };
        }

        let netBalance = 0;
        const dailyNetChanges = dateLabels.reduce((acc, date) => {
            const income = (data.transactions || []).filter(t => t.date === date && t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0);
            const expense = (data.transactions || []).filter(t => t.date === date && t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0);
            acc[date] = income - expense;
            return acc;
        }, {});

        const netData = dateLabels.map(date => {
            netBalance += dailyNetChanges[date];
            return netBalance;
        });

        const incomeByDate = dateLabels.reduce((acc, date) => ({ ...acc, [date]: 0 }), {});
        const expenseByDate = dateLabels.reduce((acc, date) => ({ ...acc, [date]: 0 }), {});

        dateLabels.forEach(date => {
            incomeByDate[date] = (data.transactions || []).filter(t => t.date === date && t.type === 'income').reduce((sum, t) => sum + (t.amount || 0), 0);
            expenseByDate[date] = (data.transactions || []).filter(t => t.date === date && t.type === 'expense').reduce((sum, t) => sum + (t.amount || 0), 0);
        });

        return {
            labels: dateLabels,
            datasets: [
                { label: 'Income', data: dateLabels.map(d => incomeByDate[d]), borderColor: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.3)', fill: true, tension: 0.3 },
                { label: 'Expense', data: dateLabels.map(d => expenseByDate[d]), borderColor: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.3)', fill: true, tension: 0.3 },
                { label: 'Net Balance', data: netData, borderColor: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.3)', fill: true, tension: 0.3 },
            ]
        };
    }, [data.transactions]);

    const lineOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { callback: (value) => '₹' + value, color: '#e0e0e0' }
            },
            x: {
                grid: { color: 'rgba(255,255,255,0.1)' },
                ticks: { color: '#e0e0e0' }
            }
        },
        plugins: {
            legend: {
                labels: { color: '#e0e0e0' }
            },
            zoom: {
                pan: { enabled: true, mode: 'x' },
                zoom: { wheel: { enabled: true }, mode: 'x' }
            }
        }
    };

    return (
         <section>
            <header className="mb-8">
                <h2 className="font-pixel text-3xl md:text-4xl text-cyan-400 text-shadow-cyan">Reports</h2>
                <p className="text-gray-400">Visualize your financial journey.</p>
            </header>

            {/* --- FIX: Changed grid to a single column layout with spacing and a max-width --- */}
            <div className="space-y-12 max-w-4xl mx-auto">
                <div className="bg-gray-800 p-6 rounded-lg pixel-border">
                    <h3 className="font-pixel text-lg text-yellow-300 mb-4 text-center">Expense Breakdown</h3>
                    {/* --- FIX: Increased the height of the chart container --- */}
                    <div className="h-80 md:h-96"><Pie data={pieData} options={pieOptions} /></div>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg pixel-border">
                    <h3 className="font-pixel text-lg text-yellow-300 mb-4 text-center">Income vs Expense Flow</h3>
                    {/* --- FIX: Increased the height of the chart container --- */}
                    <div className="h-80 md:h-96"><Line data={lineData} options={lineOptions} /></div>
                </div>
            </div>
        </section>
    );
};

export default ReportsSection;