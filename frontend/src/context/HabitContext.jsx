import React, { createContext, useContext, useState, useEffect } from 'react';

const HabitContext = createContext();

export const useHabits = () => useContext(HabitContext);

export const HabitProvider = ({ children }) => {
    const [habits, setHabits] = useState(() => {
        const savedHabits = localStorage.getItem('sdp_habits');
        return savedHabits ? JSON.parse(savedHabits) : [];
    });

    useEffect(() => {
        localStorage.setItem('sdp_habits', JSON.stringify(habits));
    }, [habits]);

    const addHabit = (name) => {
        const newHabit = {
            id: Date.now().toString(),
            name,
            streak: 0,
            lastCompletedDate: null,
            history: [] // Array of completed dates (ISO strings or YYYY-MM-DD)
        };
        setHabits([...habits, newHabit]);
    };

    const deleteHabit = (id) => {
        setHabits(habits.filter(h => h.id !== id));
    };

    const checkHabit = (id) => {
        setHabits(habits.map(habit => {
            if (habit.id === id) {
                const today = new Date().toISOString().split('T')[0];
                if (habit.lastCompletedDate === today) return habit; // Already done today

                let newStreak = habit.streak;
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (habit.lastCompletedDate === yesterdayStr) {
                    newStreak += 1;
                } else {
                    newStreak = 1; // Reset or start new
                }

                return {
                    ...habit,
                    streak: newStreak,
                    lastCompletedDate: today,
                    history: [...habit.history, today]
                };
            }
            return habit;
        }));
    };

    // Logic to reset streaks if missed (can be run on load)
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        setHabits(currentHabits => currentHabits.map(habit => {
            if (!habit.lastCompletedDate) return habit;
            if (habit.lastCompletedDate !== today && habit.lastCompletedDate !== yesterdayStr) {
                // If last completed was before yesterday, streak is broken. 
                // However, we only reset if we want to show 0 immediately. 
                // Usually, we just calculate it when trying to increment.
                // But for display purposes, we might want to show 0 if missed.
                return { ...habit, streak: 0 };
            }
            return habit;
        }));
    }, []);

    return (
        <HabitContext.Provider value={{ habits, addHabit, deleteHabit, checkHabit }}>
            {children}
        </HabitContext.Provider>
    );
};
