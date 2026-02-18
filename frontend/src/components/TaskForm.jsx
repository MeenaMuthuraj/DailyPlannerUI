import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';

const TaskForm = () => {
    const { addTask } = useTasks();
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [timeSlot, setTimeSlot] = useState('Morning');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        addTask({ title, priority, timeSlot });
        setTitle('');
        // Keep priority/timeSlot same for convenience or allow reset
    };

    return (
        <form onSubmit={handleSubmit} className="task-form card" style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Add New Task</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input"
                    required
                />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="input"
                        style={{ flex: 1 }}
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>

                    <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="input"
                        style={{ flex: 1 }}
                    >
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
                    Add Task
                </button>
            </div>
        </form>
    );
};

export default TaskForm;
