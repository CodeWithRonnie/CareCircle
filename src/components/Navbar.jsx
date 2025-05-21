import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * Navbar component for CareCircle
 * 
 * Provides navigation and authentication controls at the top of the app.
 * Responsive design with mobile menu toggle.
 */
function Navbar({ isAuthenticated, toggleSidebar }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Handle user logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('careCircleToken');
    // Redirect to login page
    navigate('/login');
    // Refresh the page to reset app state
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10">
      <div className="container-app flex justify-between items-center">
        {/* Logo and brand */}
        <div className="flex items-center">
          {isAuthenticated && (
            <button 
              onClick={toggleSidebar}
              className="mr-3 md:hidden text-gray-500 hover:text-gray-700"
              aria-label="Toggle sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}
          
          <Link to="/" className="flex items-center">
            <span className="text-primary-600 text-2xl font-bold">Care</span>
            <span className="text-secondary-600 text-2xl font-bold">Circle</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-primary-600">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span>Profile</span>
                </div>
              </Link>
              <button 
                onClick={handleLogout}
                className="btn btn-outline"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Toggle menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
          {isAuthenticated ? (
            <div className="space-y-3">
              <Link 
                to="/profile" 
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="space-y-3 p-4">
              <Link 
                to="/login" 
                className="block w-full btn btn-outline"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="block w-full btn btn-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
