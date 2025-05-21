import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Container, Nav, Button, Badge, Dropdown } from 'react-bootstrap';
import { ConnectivityContext } from '../App';
import Notifications from './Notifications';

/**
 * Navbar 
 * 
 * Provides navigation and authentication controls at the top of the app.
 * Includes South African features like language selection, WhatsApp integration,
 * and offline mode indicator.
 */
function Navbar({ isAuthenticated, toggleSidebar, language, setLanguage }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3); // For demo purposes
  const { isOnline } = useContext(ConnectivityContext);
  
  // Handle user logout
  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('careConnectToken');
    // Redirect to login page
    navigate('/login');
    // Refresh the page to reset app state
    window.location.reload();
  };
  
  // Language options for South Africa
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'zu', name: 'isiZulu' },
    { code: 'xh', name: 'isiXhosa' }
  ];
  
  // Function to change language
  const changeLanguage = (langCode) => {
    setLanguage(langCode);
    // In a real app, you might save this preference to localStorage or user profile
    localStorage.setItem('careConnectLanguage', langCode);
  };
  
  // Function to open WhatsApp
  const openWhatsApp = () => {
    // This would typically open a specific WhatsApp contact or group
    window.open('https://wa.me/27123456789', '_blank');
  };

  // Get text based on current language
  const getText = (key) => {
    const translations = {
      appName: {
        en: 'CareCircle',
        af: 'CareCircle',
        zu: 'I-CareCircle',
        xh: 'I-CareCircle'
      },
      whatsapp: {
        en: 'WhatsApp Support',
        af: 'WhatsApp-ondersteuning',
        zu: 'Ukusekelwa kwe-WhatsApp',
        xh: 'Inkxaso ye-WhatsApp'
      },
      login: {
        en: 'Login',
        af: 'Teken in',
        zu: 'Ngena ngemvume',
        xh: 'Ngena ngemvume'
      },
      register: {
        en: 'Register',
        af: 'Registreer',
        zu: 'Bhalisa',
        xh: 'Bhalisa'
      },
      logout: {
        en: 'Logout',
        af: 'Teken uit',
        zu: 'Phuma',
        xh: 'Phuma'
      }
    };
    
    return translations[key]?.[language] || translations[key]?.['en'] || key;
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
          <span className="text-care-primary fw-bold fs-4">Care</span>
          <span className="text-care-secondary fw-bold fs-4">Circle</span>
        </BootstrapNavbar.Brand>
        
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setIsMenuOpen(!isMenuOpen)} />
        
        <BootstrapNavbar.Collapse id="basic-navbar-nav" in={isMenuOpen}>
          <Nav className="ms-auto">
            <Dropdown className="me-2">
              <Dropdown.Toggle variant="light" size="sm" id="language-dropdown">
                <i className="bi bi-translate me-1"></i>
                {languages.find(l => l.code === language)?.name || 'English'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {languages.map(lang => (
                  <Dropdown.Item 
                    key={lang.code} 
                    active={language === lang.code}
                    onClick={() => changeLanguage(lang.code)}
                  >
                    {lang.name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            
            {/* WhatsApp integration */}
            <Button 
              variant="success" 
              size="sm" 
              className="me-2"
              onClick={openWhatsApp}
              aria-label={getText('whatsapp')}
            >
              <i className="bi bi-whatsapp me-1"></i>
              {getText('whatsapp')}
            </Button>
            
            {/* Offline indicator */}
            {!isOnline && (
              <span className="d-flex align-items-center me-2 text-warning">
                <i className="bi bi-wifi-off me-1"></i>
                {getText('offline')}
              </span>
            )}
            
            {/* Notifications */}
            <div className="position-relative me-2">
              <Button 
                variant="light" 
                size="sm" 
                className="position-relative"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                aria-label={getText('notifications')}
              >
                <i className="bi bi-bell"></i>
                {notificationCount > 0 && (
                  <Badge 
                    bg="danger" 
                    className="position-absolute top-0 start-100 translate-middle rounded-pill"
                    style={{ fontSize: '0.6rem', padding: '0.25rem 0.4rem' }}
                  >
                    {notificationCount > 9 ? '9+' : notificationCount}
                  </Badge>
                )}
              </Button>
              <Notifications 
                isOpen={isNotificationsOpen} 
                onClose={() => setIsNotificationsOpen(false)} 
                language={language}
              />
            </div>
            
            {/* User dropdown */}
            <Dropdown>
              <Dropdown.Toggle 
                variant="light" 
                size="sm" 
                className="d-flex align-items-center"
                id="user-dropdown"
              >
                <i className="bi bi-person-circle me-1"></i>
                <span className="d-none d-md-inline">
                  {getText('user')}
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/profile">
                  <i className="bi bi-person me-2"></i>
                  {getText('profile')}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/settings">
                  <i className="bi bi-gear me-2"></i>
                  {getText('settings')}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  {getText('logout')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            
            {isAuthenticated ? (
              <>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  className="ms-2"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  <span className="d-none d-sm-inline">{getText('logout')}</span>
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="me-2">
                  <Button variant="outline-primary" size="sm">
                    <i className="bi bi-box-arrow-in-right me-1"></i> {getText('login')}
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" size="sm">
                    <i className="bi bi-person-plus me-1"></i> {getText('register')}
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
