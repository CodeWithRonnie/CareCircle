import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, createContext } from 'react';
import { Container } from 'react-bootstrap';

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
import CommunityHealth from './pages/CommunityHealth'; // New South African feature

// Import our components (we'll create these next)
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Create contexts for app-wide state
export const LanguageContext = createContext();
export const ConnectivityContext = createContext();
export const LocationContext = createContext();

/**
 * Main App component for CareConnect SA
 * 
 * This is the root component that handles routing and the main layout structure.
 * It includes South African specific features like multi-language support,
 * location-based health services, community health spaces, WhatsApp integration, 
 * and offline access mode.
 */
function App() {
  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to track if sidebar is open (for mobile)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // South African specific features
  const [language, setLanguage] = useState('en'); // Default language is English
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userLocation, setUserLocation] = useState(null);

  // Check if user is logged in on app load
  useEffect(() => {
    // For now, we'll just simulate authentication
    // Later, we'll replace this with actual auth logic
    const checkAuth = () => {
      const token = localStorage.getItem('careConnectToken');
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);
  
  // Monitor online/offline status for offline access mode
  useEffect(() => {
    const handleOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };
    
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);
  
  // Get user location for location-based health services
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Function to toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <ConnectivityContext.Provider value={{ isOnline }}>
        <LocationContext.Provider value={{ userLocation }}>
          <Router>
            <div className="d-flex flex-column min-vh-100">
              {/* Offline mode banner */}
              {!isOnline && (
                <div className="bg-warning text-dark text-center py-2">
                  <i className="bi bi-wifi-off me-2"></i>
                  {language === 'en' ? 'You are currently offline. Some features may be limited.' : 
                   language === 'af' ? 'Jy is tans vanlyn. Sommige funksies mag beperk wees.' : 
                   language === 'zu' ? 'Awuxhunyiwe manje. Ezinye izici zingahle zikhawulelwe.' : 
                   language === 'xh' ? 'Awukho kwi-intanethi ngoku. Ezinye iimpawu zingaphungulwa.' : 
                   'You are currently offline. Some features may be limited.'}
                </div>
              )}
              
              {/* Navbar at the top */}
              <Navbar 
                isAuthenticated={isAuthenticated} 
                toggleSidebar={toggleSidebar}
                language={language}
                setLanguage={setLanguage}
              />
              
              <div className="d-flex flex-grow-1 overflow-hidden">
                {/* Sidebar - hidden on mobile unless toggled */}
                {isAuthenticated && (
                  <Sidebar 
                    isOpen={isSidebarOpen} 
                    closeSidebar={() => setIsSidebarOpen(false)}
                    language={language}
                  />
                )}
                
                {/* Main content area */}
                <main className="flex-grow-1 overflow-auto p-3 p-md-4">
                  <div className="container-app">
                    <Routes>
                      {/* Public routes */}
                      <Route 
                        path="/login" 
                        element={!isAuthenticated ? <Login setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} 
                      />
                      <Route 
                        path="/register" 
                        element={!isAuthenticated ? <Register setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />} 
                      />
                
                      {/* Protected routes - Dashboard is the root route */}
                      <Route 
                        path="/" 
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
                        path="/community-health" 
                        element={isAuthenticated ? <CommunityHealth /> : <Navigate to="/login" />} 
                      />
                      <Route 
                        path="/help" 
                        element={<Help />} 
                      />
                
                      {/* Default redirect */}
                      <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
                    </Routes>
                  </div>
                </main>
              </div>
              
              {/* Footer */}
              <Footer language={language} />
            </div>
          </Router>
        </LocationContext.Provider>
      </ConnectivityContext.Provider>
    </LanguageContext.Provider>
  );
}

export default App;
