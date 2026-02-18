import React from 'react';
import { useHabits } from '../context/HabitContext';

const HabitList = () => {
    const { habits, checkHabit, deleteHabit } = useHabits();
    const today = new Date().toISOString().split('T')[0];

    if (habits.length === 0) {
        return (
            <div className="text-center text-muted" style={{ padding: '2rem' }}>
                <p>No habits being tracked. Build good habits today!</p>
            </div>
        );
    }

    return (
        <div className="habit-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {habits.map(habit => {
                const isDoneToday = habit.lastCompletedDate === today;

                return (
                    <div key={habit.id} className="card" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderLeft: isDoneToday ? '4px solid var(--success)' : '4px solid var(--text-muted)'
                    }}>
                        <div>
                            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{habit.name}</h4>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span role="img" aria-label="fire">🔥</span>
                                <span className="font-bold" style={{ color: habit.streak > 0 ? 'var(--warning)' : 'var(--text-muted)' }}>
                                    {habit.streak} day streak
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <button
                                className={`btn ${isDoneToday ? 'btn-secondary' : 'btn-primary'}`}
                                onClick={() => checkHabit(habit.id)}
                                disabled={isDoneToday}
                                style={{ opacity: isDoneToday ? 0.7 : 1 }}
                            >
                                {isDoneToday ? 'Done' : 'Check'}
                            </button>

                            <button
                                className="btn"
                                onClick={() => deleteHabit(habit.id)}
                                style={{ color: 'var(--text-muted)', background: 'transparent', padding: '0.4rem' }}
                                title="Remove Habit"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default HabitList;
