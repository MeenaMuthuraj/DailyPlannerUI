import React from 'react';

const Header = ({ currentView, setCurrentView }) => {
    const navItems = [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'tasks', label: 'Tasks' },
        { id: 'habits', label: 'Habits' }
    ];

    return (
        <header className="header-container" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0',
            marginBottom: '2rem',
            borderBottom: '1px solid var(--border)'
        }}>
            <div className="branding" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'var(--primary)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: '1.2rem'
                }}>
                    SDP
                </div>
                <h1 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 700 }}>Smart Daily Planner</h1>
            </div>

            <nav className="actions" style={{ display: 'flex', gap: '1rem' }}>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`btn ${currentView === item.id ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setCurrentView(item.id)}
                        style={{ fontSize: '0.9rem' }}
                    >
                        {item.label}
                    </button>
                ))}
            </nav>
        </header>
    );
};

export default Header;
