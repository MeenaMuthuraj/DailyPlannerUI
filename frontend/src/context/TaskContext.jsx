import React, { createContext, useContext, useState, useEffect } from 'react';

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('sdp_tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [focusTaskId, setFocusTaskId] = useState(() => {
        return localStorage.getItem('sdp_focus_task_id') || null;
    });

    useEffect(() => {
        localStorage.setItem('sdp_tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        if (focusTaskId) {
            localStorage.setItem('sdp_focus_task_id', focusTaskId);
        } else {
            localStorage.removeItem('sdp_focus_task_id');
        }
    }, [focusTaskId]);

    const addTask = (task) => {
        setTasks([...tasks, { ...task, id: Date.now().toString(), completed: false, createdAt: new Date().toISOString() }]);
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
        if (focusTaskId === id) setFocusTaskId(null);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const setFocusTask = (id) => {
        setFocusTaskId(id);
    };

    const clearFocusTask = () => {
        setFocusTaskId(null);
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            focusTaskId,
            addTask,
            deleteTask,
            toggleTask,
            setFocusTask,
            clearFocusTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};
