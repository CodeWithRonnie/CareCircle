import { NavLink } from 'react-router-dom';
import { Offcanvas, Badge } from 'react-bootstrap';

/**
 * Sidebar component for CareConnect SA
 * 
 * Provides the main navigation menu for the app when users are logged in.
 * Includes South African specific features like multi-language support,
 * community health spaces, and offline access mode.
 */
function Sidebar({ isOpen, closeSidebar, language }) {
  // Translations for multilingual support
  const translations = {
    dashboard: {
      en: 'Dashboard',
      af: 'Kontroleskerm',
      zu: 'Ideshibhodi',
      xh: 'Ideshibhodi'
    },
    updates: {
      en: 'Updates',
      af: 'Opdaterings',
      zu: 'Izibuyekezo',
      xh: 'Izihlaziyo'
    },
    medications: {
      en: 'Medications',
      af: 'Medikasie',
      zu: 'Imithi',
      xh: 'Amayeza'
    },
    tasks: {
      en: 'Tasks',
      af: 'Take',
      zu: 'Imisebenzi',
      xh: 'Imisebenzi'
    },
    visits: {
      en: 'Visits',
      af: 'Besoeke',
      zu: 'Izivakashi',
      xh: 'Iindwendwe'
    },
    documents: {
      en: 'Documents',
      af: 'Dokumente',
      zu: 'Amadokhumenti',
      xh: 'Amaxwebhu'
    },
    communityHealth: {
      en: 'Community Health',
      af: 'Gemeenskap Gesondheid',
      zu: 'Impilo Yomphakathi',
      xh: 'Impilo Yoluntu'
    },
    profile: {
      en: 'Profile',
      af: 'Profiel',
      zu: 'Iphrofayela',
      xh: 'Iphrofayile'
    },
    help: {
      en: 'Help',
      af: 'Hulp',
      zu: 'Usizo',
      xh: 'Uncedo'
    },
    version: {
      en: 'Version',
      af: 'Weergawe',
      zu: 'Inguqulo',
      xh: 'Uhlelo'
    },
    caringTogether: {
      en: 'Caring together in South Africa',
      af: 'Sorg saam in Suid-Afrika',
      zu: 'Sinakekela ndawonye eNingizimu Afrika',
      xh: 'Sikhathala kunye eMzantsi Afrika'
    }
  };
  // Get text based on current language
  const getText = (key) => {
    return translations[key]?.[language] || translations[key]?.['en'] || key;
  };

  const navItems = [
    { to: '/', icon: 'bi-house-door', label: getText('dashboard') },
    { to: '/updates', icon: 'bi-chat-left-text', label: getText('updates') },
    { to: '/medications', icon: 'bi-capsule', label: getText('medications') },
    { to: '/tasks', icon: 'bi-check2-square', label: getText('tasks') },
    { to: '/visits', icon: 'bi-calendar-event', label: getText('visits') },
    { to: '/documents', icon: 'bi-file-earmark-text', label: getText('documents') },
    { to: '/community-health', icon: 'bi-people', label: getText('communityHealth'), isNew: true },
    { to: '/profile', icon: 'bi-person', label: getText('profile') },
    { to: '/help', icon: 'bi-question-circle', label: getText('help') }
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
            <span className="text-primary fw-bold fs-4">Care</span>
            <span className="text-info fw-bold fs-4">Connect</span>
            <span className="ms-1 badge bg-success align-self-start">SA</span>
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
                    {item.isNew && (
                      <Badge bg="success" pill className="ms-2">New</Badge>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* App info */}
          <div className="mt-auto p-3 border-top border-light small text-muted">
            <p className="mb-1">CareConnect SA v1.0</p>
            <p className="mb-1">© 2025 CareConnect SA</p>
            <p className="mb-0">{getText('caringTogether')}</p>
            <div className="mt-2 d-flex gap-1">
              <img src="https://flagcdn.com/w20/za.png" alt="South African Flag" width="20" height="14" />
              <span className="small">Made for South Africa</span>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      
      {/* Desktop sidebar - always visible on larger screens */}
      <div className="d-none d-md-block bg-white border-end" style={{ width: '280px' }}>
        <div className="d-flex justify-content-center py-4">
          <span className="text-primary fw-bold fs-4">Care</span>
          <span className="text-info fw-bold fs-4">Connect</span>
          <span className="ms-1 badge bg-success align-self-start">SA</span>
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
                  {item.isNew && (
                    <Badge bg="success" pill className="ms-2">New</Badge>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto p-3 border-top border-light small text-muted position-fixed bottom-0" style={{ width: '280px' }}>
          <p className="mb-1">CareConnect SA v1.0</p>
          <p className="mb-1">© 2025 CareConnect SA</p>
          <p className="mb-0">{getText('caringTogether')}</p>
          <div className="mt-2 d-flex gap-1">
            <img src="https://flagcdn.com/w20/za.png" alt="South African Flag" width="20" height="14" />
            <span className="small">Made for South Africa</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
