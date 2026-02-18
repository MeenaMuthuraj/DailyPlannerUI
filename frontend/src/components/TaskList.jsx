import React from 'react';
import { useTasks } from '../context/TaskContext';

const TaskList = () => {
    const { tasks, toggleTask, deleteTask, setFocusTask, focusTaskId } = useTasks();

    const getPriorityColor = (p) => {
        switch (p) {
            case 'High': return 'var(--danger)';
            case 'Medium': return 'var(--warning)';
            case 'Low': return 'var(--success)';
            default: return 'var(--text-muted)';
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="text-center text-muted" style={{ padding: '2rem' }}>
                <p>No tasks yet. Start planning your day!</p>
            </div>
        );
    }

    // Sort by completed (bottom) then priority (High > Medium > Low)
    const sortedTasks = [...tasks].sort((a, b) => {
        if (a.completed === b.completed) {
            const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        return a.completed ? 1 : -1;
    });

    return (
        <div className="task-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedTasks.map(task => (
                <div
                    key={task.id}
                    className="card"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        opacity: task.completed ? 0.6 : 1,
                        borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                        backgroundColor: focusTaskId === task.id ? 'var(--bg-input)' : 'var(--bg-card)',
                        boxShadow: focusTaskId === task.id ? '0 0 0 2px var(--primary)' : 'var(--shadow-md)'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
                        />

                        <div style={{ flex: 1 }}>
                            <p style={{
                                fontSize: '1.1rem',
                                fontWeight: 500,
                                textDecoration: task.completed ? 'line-through' : 'none',
                                marginBottom: '0.2rem'
                            }}>
                                {task.title}
                                {focusTaskId === task.id && (
                                    <span style={{
                                        fontSize: '0.75rem',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        padding: '0.1rem 0.5rem',
                                        borderRadius: '1rem',
                                        marginLeft: '0.5rem',
                                        verticalAlign: 'middle'
                                    }}>
                                        FOCUS
                                    </span>
                                )}
                            </p>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
                                <span>{task.timeSlot}</span>
                                <span style={{ color: getPriorityColor(task.priority) }}>{task.priority}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {!task.completed && focusTaskId !== task.id && (
                            <button
                                className="btn btn-secondary"
                                onClick={() => setFocusTask(task.id)}
                                title="Set as Focus Task"
                                style={{ padding: '0.4rem' }}
                            >
                                ★
                            </button>
                        )}

                        <button
                            className="btn"
                            onClick={() => deleteTask(task.id)}
                            style={{ color: 'var(--danger)', background: 'transparent', padding: '0.4rem' }}
                            title="Delete Task"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
