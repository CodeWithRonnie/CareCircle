import { NavLink } from 'react-router-dom';
import { Offcanvas } from 'react-bootstrap';

/**
 * Sidebar component for CareCircle
 * 
 * Provides the main navigation menu for the app when users are logged in.
 * Responsive design - can be toggled on mobile and is always visible on desktop.
 */
function Sidebar({ isOpen, closeSidebar }) {
  // Navigation links with icons and labels
  const navItems = [
    {
      to: '/dashboard',
      icon: 'bi-house-door',
      label: 'Dashboard'
    },
    {
      to: '/updates',
      icon: 'bi-chat-left-text',
      label: 'Updates'
    },
    {
      to: '/medications',
      icon: 'bi-capsule',
      label: 'Medications'
    },
    {
      to: '/tasks',
      icon: 'bi-check2-square',
      label: 'Tasks'
    },
    {
      to: '/visits',
      icon: 'bi-calendar-event',
      label: 'Visits'
    },
    {
      to: '/documents',
      icon: 'bi-file-earmark-text',
      label: 'Documents'
    },
    {
      to: '/profile',
      icon: 'bi-person',
      label: 'Profile'
    },
    {
      to: '/help',
      icon: 'bi-question-circle',
      label: 'Help'
    }
  ];

  // Mobile sidebar uses Offcanvas component from React-Bootstrap
  // Desktop sidebar uses regular styling

  return (
    <>
      {/* Mobile sidebar using Offcanvas */}
      <Offcanvas 
        show={isOpen} 
        onHide={closeSidebar} 
        responsive="md" 
        placement="start"
        className="sidebar-offcanvas"
        style={{ width: '280px' }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="d-flex align-items-center">
            <span className="text-care-primary fw-bold fs-4">Care</span>
            <span className="text-care-secondary fw-bold fs-4">Circle</span>
          </Offcanvas.Title>
        </Offcanvas.Header>
        
        <Offcanvas.Body className="p-0">
          {/* Navigation links */}
          <div className="px-3 py-2">
            <ul className="nav flex-column">
              {navItems.map((item) => (
                <li key={item.to} className="nav-item mb-2">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) => 
                      `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-care-primary-light text-care-primary' : 'text-secondary'}`
                    }
                    onClick={closeSidebar}
                  >
                    <i className={`${item.icon} me-3`}></i>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* App info */}
          <div className="mt-auto p-3 border-top border-light small text-muted">
            <p className="mb-1">CareCircle v1.0</p>
            <p className="mb-1">© 2025 CareCircle</p>
            <p className="mb-0">Caring together</p>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
      {/* Desktop sidebar - always visible on larger screens */}
      <div className="d-none d-md-block bg-white border-end" style={{ width: '280px' }}>
        <div className="d-flex justify-content-center py-4">
          <span className="text-care-primary fw-bold fs-4">Care</span>
          <span className="text-care-secondary fw-bold fs-4">Circle</span>
        </div>
        
        <div className="px-3 py-2">
          <ul className="nav flex-column">
            {navItems.map((item) => (
              <li key={item.to} className="nav-item mb-2">
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `nav-link d-flex align-items-center py-2 px-3 rounded ${isActive ? 'bg-care-primary-light text-care-primary' : 'text-secondary'}`
                  }
                >
                  <i className={`${item.icon} me-3`}></i>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto p-3 border-top border-light small text-muted position-fixed bottom-0" style={{ width: '280px' }}>
          <p className="mb-1">CareCircle v1.0</p>
          <p className="mb-1">© 2025 CareCircle</p>
          <p className="mb-0">Caring together</p>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
