import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Button, Badge } from 'react-bootstrap';
import Notifications from './Notifications';

/**
 * Navbar component for CareCircle
 * 
 * Provides navigation and authentication controls at the top of the app.
 * Responsive design with mobile menu toggle.
 */
function Navbar({ isAuthenticated, toggleSidebar }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // For demo purposes
  
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
    <BootstrapNavbar bg="white" expand="md" className="shadow-sm sticky-top border-bottom border-light">
      <Container>
        {isAuthenticated && (
          <Button 
            variant="light"
            className="d-md-none me-2"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list"></i>
          </Button>
        )}
        
        <BootstrapNavbar.Brand as={Link} to="/" className="me-auto d-flex align-items-center">
          <span className="text-primary fw-bold fs-4">Care</span>
          <span className="text-info fw-bold fs-4">Circle</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav" in={isMenuOpen}>
          <Nav className="ms-auto">
            {isAuthenticated ? (
              <>
                <Button
                  variant="light"
                  className="position-relative me-3 rounded-circle p-2"
                  onClick={() => setIsNotificationsOpen(true)}
                  aria-label="Notifications"
                >
                  <i className="bi bi-bell"></i>
                  {notificationCount > 0 && (
                    <Badge 
                      bg="danger" 
                      pill 
                      className="position-absolute top-0 start-100 translate-middle">
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
                
                <Nav.Link as={Link} to="/profile" className="d-flex align-items-center me-2">
                  <div className="avatar avatar-sm me-2">
                    <i className="bi bi-person"></i>
                  </div>
                  <span className="d-none d-sm-inline">Profile</span>
                </Nav.Link>
                
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  <span className="d-none d-sm-inline">Sign Out</span>
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-box-arrow-in-right me-1"></i> Sign In
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">
                    <i className="bi bi-person-plus me-1"></i> Register
                  </Button>
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
      
      {/* Notifications panel */}
      <Notifications 
        isVisible={isNotificationsOpen} 
        onClose={() => {
          setIsNotificationsOpen(false);
          // In a real app, this would be based on actual read status
          setNotificationCount(0);
        }} 
      />
    </BootstrapNavbar>
  );
}

export default Navbar;
