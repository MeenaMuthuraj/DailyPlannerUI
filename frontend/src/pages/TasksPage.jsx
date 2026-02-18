import React from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { useTasks } from '../context/TaskContext';

const TasksPage = () => {
    const { focusTaskId, tasks } = useTasks();
    const focusTask = tasks.find(t => t.id === focusTaskId);

    return (
        <div className="tasks-page">
            <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Task Planner</h2>
                <p className="text-muted">Organize your day efficiently.</p>
            </div>

            {/* Focus Task Highlight */}
            {focusTask && !focusTask.completed && (
                <div className="card" style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)',
                    color: 'white',
                    marginBottom: '2rem',
                    border: 'none'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ fontSize: '0.9rem', opacity: 0.9, textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Current Focus
                            </h4>
                            <p style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>
                                {focusTask.title}
                            </p>
                        </div>
                        <div style={{ fontSize: '3rem', opacity: 0.2 }}>
                            🎯
                        </div>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
                <TaskForm />

                <div>
                    <h3 style={{ marginBottom: '1rem' }}>Your Tasks</h3>
                    <TaskList />
                </div>
            </div>
        </div>
    );
};

export default TasksPage;
