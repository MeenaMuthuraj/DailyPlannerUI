import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';

const HabitForm = () => {
    const { addHabit } = useHabits();
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) return;
        addHabit(name);
        setName('');
    };

    return (
        <form onSubmit={handleSubmit} className="habit-form card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Track New Habit</h3>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="Habit name (e.g., Read 30 mins)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    style={{ flex: 1 }}
                    required
                />
                <button type="submit" className="btn btn-primary">
                    Add Habit
                </button>
            </div>
        </form>
    );
};

export default HabitForm;
