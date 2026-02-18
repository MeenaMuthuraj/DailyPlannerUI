import React from 'react';
import { useTasks } from '../context/TaskContext';
import { useHabits } from '../context/HabitContext';

const Dashboard = () => {
    const { tasks } = useTasks();
    const { habits } = useHabits();

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const pendingTasks = totalTasks - completedTasks;

    const activeHabits = habits.length;
    const completedHabitsToday = habits.filter(h => h.lastCompletedDate === new Date().toISOString().split('T')[0]).length;

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 18) return 'Good Afternoon';
        return 'Good Evening';
    };

    const formatDate = () => {
        return new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
    };

    return (
        <div className="dashboard">
            <section className="welcome-section" style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{getGreeting()}</h2>
                <p className="text-muted" style={{ fontSize: '1.1rem' }}>{formatDate()}</p>
            </section>

            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.5rem'
            }}>
                {/* Task Summary Card */}
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--primary)' }}>Tasks Overview</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="text-muted">Total Tasks</span>
                        <span className="font-bold" style={{ fontSize: '1.5rem' }}>{totalTasks}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="text-muted">Completed</span>
                        <span className="font-bold" style={{ color: 'var(--success)', fontSize: '1.5rem' }}>{completedTasks}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="text-muted">Pending</span>
                        <span className="font-bold" style={{ color: 'var(--warning)', fontSize: '1.5rem' }}>{pendingTasks}</span>
                    </div>

                    <div style={{ marginTop: '1.5rem', height: '6px', background: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                            height: '100%',
                            width: `${totalTasks ? (completedTasks / totalTasks) * 100 : 0}%`,
                            background: 'var(--primary)',
                            transition: 'width 0.5s ease'
                        }} />
                    </div>
                </div>

                {/* Habit Summary Card */}
                <div className="card">
                    <h3 style={{ marginBottom: '1rem', color: 'var(--secondary)' }}>Habits Progress</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <span className="text-muted">Active Habits</span>
                        <span className="font-bold" style={{ fontSize: '1.5rem' }}>{activeHabits}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="text-muted">Completed Today</span>
                        <span className="font-bold" style={{ color: 'var(--success)', fontSize: '1.5rem' }}>{completedHabitsToday}</span>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                            Keep your streaks alive!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
