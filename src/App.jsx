import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Import our pages (we'll create these next)
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import MedicationTracker from './pages/MedicationTracker';
import TaskManager from './pages/TaskManager';
import Updates from './pages/Updates';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import Help from './pages/Help';
import VisitScheduler from './pages/VisitScheduler';

// Import our components (we'll create these next)
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

/**
 * Main App component for CareCircle
 * 
 * This is the root component that handles routing and the main layout structure.
 * It includes a responsive layout that works on both mobile and desktop screens.
 */
function App() {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to track if sidebar is open (for mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Check if user is logged in on app load
  useEffect(() => {
    // For now, we'll just simulate authentication
    // Later, we'll replace this with actual auth logic
    const checkAuth = () => {
      const token = localStorage.getItem('careCircleToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  // Function to toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Navbar at the top */}
        <Navbar 
          isAuthenticated={isAuthenticated} 
          toggleSidebar={toggleSidebar} 
        />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - hidden on mobile unless toggled */}
          {isAuthenticated && (
            <Sidebar 
              isOpen={isSidebarOpen} 
              closeSidebar={() => setIsSidebarOpen(false)} 
            />
          )}
          
          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="container-app">
              <Routes>
                {/* Public routes */}
                <Route 
                  path="/login" 
                  element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} 
                />
                <Route 
                  path="/register" 
                  element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/dashboard" />} 
                />
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/medications" 
                  element={isAuthenticated ? <MedicationTracker /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/tasks" 
                  element={isAuthenticated ? <TaskManager /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/updates" 
                  element={isAuthenticated ? <Updates /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/documents" 
                  element={isAuthenticated ? <Documents /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/profile" 
                  element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/visits" 
                  element={isAuthenticated ? <VisitScheduler /> : <Navigate to="/login" />} 
                />
                <Route 
                  path="/help" 
                  element={<Help />} 
                />
                
                {/* Default redirect */}
                <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
              </Routes>
            </div>
          </main>
        </div>
        
        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
