import React from 'react';
import HabitForm from '../components/HabitForm';
import HabitList from '../components/HabitList';

const HabitsPage = () => {
    return (
        <div className="habits-page">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Habit Tracker</h2>
                <p className="text-muted">Consistency is key.</p>
            </div>

            <HabitForm />

            <div style={{ marginTop: '2rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Your Habits</h3>
                <HabitList />
            </div>
        </div>
    );
};

export default HabitsPage;
