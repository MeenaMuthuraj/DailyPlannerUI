import React from 'react';
import Header from './Header';

const Layout = ({ children, currentView, setCurrentView }) => {
    return (
        <div className="app-layout">
            <div className="container">
                <Header currentView={currentView} setCurrentView={setCurrentView} />
                <main className="main-content" style={{ minHeight: 'calc(100vh - 160px)' }}>
                    {children}
                </main>
                <footer style={{
                    textAlign: 'center',
                    padding: '2rem 0',
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    borderTop: '1px solid var(--border)',
                    marginTop: '3rem'
                }}>
                    <p>&copy; {new Date().getFullYear()} Smart Daily Planner. All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

export default Layout;
