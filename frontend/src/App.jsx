import { useState } from 'react'
import './App.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import TasksPage from './pages/TasksPage'
import HabitsPage from './pages/HabitsPage'
import { TaskProvider } from './context/TaskContext'
import { HabitProvider } from './context/HabitContext'

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'tasks': return <TasksPage />;
      case 'habits': return <HabitsPage />;
      default: return <Dashboard />;
    }
  };

  return (
    <TaskProvider>
      <HabitProvider>
        <Layout currentView={currentView} setCurrentView={setCurrentView}>
          {renderView()}
        </Layout>
      </HabitProvider>
    </TaskProvider>
  )
}

export default App
