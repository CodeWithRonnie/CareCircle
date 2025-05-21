import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Button, Form, Badge, Accordion, ListGroup, Alert } from 'react-bootstrap';
import { LanguageContext, LocationContext } from '../App';

/**
 * CommunityHealth component for CareConnect SA
 * 
 * This component provides access to community health resources in South Africa,
 * including nearby clinics, health events, and support groups.
 */
const CommunityHealth = () => {
  const { language } = useContext(LanguageContext);
  const { userLocation } = useContext(LocationContext);
  
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [communityEvents, setCommunityEvents] = useState([]);
  const [supportGroups, setSupportGroups] = useState([]);
  const [province, setProvince] = useState('');
  const [searchRadius, setSearchRadius] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  // Translations for multilingual support
  const translations = {
    title: {
      en: 'Community Health Spaces',
      af: 'Gemeenskap Gesondheid Ruimtes',
      zu: 'Izikhala Zempilo Yomphakathi',
      xh: 'Iindawo Zempilo Zoluntu'
    },
    subtitle: {
      en: 'Find health resources in your community',
      af: 'Vind gesondheidsbronne in jou gemeenskap',
      zu: 'Thola izinsiza zempilo emphakathini wakho',
      xh: 'Fumana izibonelelo zempilo kuluntu lwakho'
    },
    nearbyFacilities: {
      en: 'Nearby Health Facilities',
      af: 'Nabye Gesondheidsfasiliteite',
      zu: 'Izikhungo Zempilo Eziseduze',
      xh: 'Amaziko Ezempilo Akufuphi'
    },
    communityEvents: {
      en: 'Community Health Events',
      af: 'Gemeenskap Gesondheid Geleenthede',
      zu: 'Imicimbi Yempilo Yomphakathi',
      xh: 'Iziganeko Zempilo Zoluntu'
    },
    supportGroups: {
      en: 'Support Groups',
      af: 'Ondersteuningsgroepe',
      zu: 'Amaqembu Okusekela',
      xh: 'Amaqela Enkxaso'
    },
    locationSettings: {
      en: 'Location Settings',
      af: 'Ligging Instellings',
      zu: 'Izilungiselelo Zendawo',
      xh: 'Imimiselo Yendawo'
    },
    province: {
      en: 'Province',
      af: 'Provinsie',
      zu: 'Isifundazwe',
      xh: 'Iphondo'
    },
    searchRadius: {
      en: 'Search Radius (km)',
      af: 'Soek Radius (km)',
      zu: 'Ibanga Lokucinga (km)',
      xh: 'Umgama Wokukhangela (km)'
    },
    update: {
      en: 'Update',
      af: 'Opdateer',
      zu: 'Buyekeza',
      xh: 'Hlaziya'
    },
    shareWhatsApp: {
      en: 'Share via WhatsApp',
      af: 'Deel via WhatsApp',
      zu: 'Yabelana nge-WhatsApp',
      xh: 'Yabelana nge-WhatsApp'
    },
    distance: {
      en: 'km away',
      af: 'km weg',
      zu: 'amakhilomitha ukude',
      xh: 'iikhilomitha ukude'
    },
    viewDetails: {
      en: 'View Details',
      af: 'Bekyk Besonderhede',
      zu: 'Buka Imininingwane',
      xh: 'Jonga Iinkcukacha'
    },
    offline: {
      en: 'You are currently offline. Some information may not be up to date.',
      af: 'Jy is tans vanlyn. Sommige inligting mag verouderd wees.',
      zu: 'Awuxhunyiwe manje. Eminye imininingwane ingahle ingabi yakamuva.',
      xh: 'Awukho kwi-intanethi ngoku. Ezinye iinkcukacha zisenokungahlaziywa.'
    }
  };

  // Get text based on current language
  const getText = (key) => {
    return translations[key][language] || translations[key]['en'];
  };

  // South African provinces
  const provinces = [
    { value: 'gauteng', label: 'Gauteng' },
    { value: 'western-cape', label: 'Western Cape' },
    { value: 'eastern-cape', label: 'Eastern Cape' },
    { value: 'kwazulu-natal', label: 'KwaZulu-Natal' },
    { value: 'free-state', label: 'Free State' },
    { value: 'north-west', label: 'North West' },
    { value: 'mpumalanga', label: 'Mpumalanga' },
    { value: 'limpopo', label: 'Limpopo' },
    { value: 'northern-cape', label: 'Northern Cape' }
  ];

  // Simulated data - in a real app, these would come from an API
  useEffect(() => {
    // Simulate API call to get nearby health facilities
    const fetchNearbyFacilities = () => {
      setIsLoading(true);
      
      // Simulated data
      setTimeout(() => {
        const facilities = [
          {
            id: 1,
            name: 'Soweto Community Clinic',
            type: 'Primary Healthcare',
            distance: 2.3,
            address: '123 Vilakazi St, Orlando West, Soweto',
            phone: '011 123 4567',
            hours: 'Mon-Fri: 8am-5pm',
            services: ['Vaccinations', 'HIV Testing', 'Maternal Care']
          },
          {
            id: 2,
            name: 'Alexandra Health Centre',
            type: 'Community Hospital',
            distance: 5.7,
            address: '45 12th Avenue, Alexandra',
            phone: '011 346 7890',
            hours: '24/7',
            services: ['Emergency Care', 'Pediatrics', 'General Medicine']
          },
          {
            id: 3,
            name: 'Diepsloot Clinic',
            type: 'Primary Healthcare',
            distance: 8.1,
            address: '78 Main Road, Diepsloot',
            phone: '011 567 8901',
            hours: 'Mon-Fri: 7am-4pm, Sat: 8am-12pm',
            services: ['TB Treatment', 'Family Planning', 'Child Health']
          }
        ];
        
        setNearbyFacilities(facilities);
        setIsLoading(false);
      }, 1000);
    };

    // Simulate API call to get community health events
    const fetchCommunityEvents = () => {
      // Simulated data
      setTimeout(() => {
        const events = [
          {
            id: 1,
            title: 'Free Diabetes Screening',
            date: '2025-06-15',
            time: '9:00 AM - 3:00 PM',
            location: 'Soweto Community Hall',
            organizer: 'Department of Health',
            description: 'Free diabetes screening and education session for all community members.'
          },
          {
            id: 2,
            title: 'Maternal Health Workshop',
            date: '2025-06-22',
            time: '10:00 AM - 12:00 PM',
            location: 'Alexandra Health Centre',
            organizer: 'Mothers2Mothers',
            description: 'Workshop for expectant mothers about prenatal care and nutrition.'
          },
          {
            id: 3,
            title: 'COVID-19 Vaccination Drive',
            date: '2025-06-30',
            time: '8:00 AM - 4:00 PM',
            location: 'Various Community Clinics',
            organizer: 'National Department of Health',
            description: 'COVID-19 vaccination for all eligible community members.'
          }
        ];
        
        setCommunityEvents(events);
      }, 1200);
    };

    // Simulate API call to get support groups
    const fetchSupportGroups = () => {
      // Simulated data
      setTimeout(() => {
        const groups = [
          {
            id: 1,
            name: 'Dementia Caregivers Support',
            meetingDay: 'Every Tuesday',
            time: '5:30 PM - 7:00 PM',
            location: 'Braamfontein Community Centre',
            contactPerson: 'Sarah Nkosi',
            phone: '082 123 4567',
            whatsappGroup: true
          },
          {
            id: 2,
            name: 'Stroke Survivors',
            meetingDay: 'First Saturday of the month',
            time: '10:00 AM - 11:30 AM',
            location: 'Sandton Clinic',
            contactPerson: 'John Dube',
            phone: '083 456 7890',
            whatsappGroup: true
          },
          {
            id: 3,
            name: 'Family Caregivers Network',
            meetingDay: 'Every Thursday',
            time: '6:00 PM - 7:30 PM',
            location: 'Online via Zoom',
            contactPerson: 'Thandi Mkhize',
            phone: '084 789 0123',
            whatsappGroup: true
          }
        ];
        
        setSupportGroups(groups);
      }, 1500);
    };

    fetchNearbyFacilities();
    fetchCommunityEvents();
    fetchSupportGroups();
  }, [province, searchRadius]);

  // Handle location settings update
  const handleUpdateLocation = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with new parameters
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // Function to share via WhatsApp
  const shareViaWhatsApp = (item, type) => {
    let text = '';
    
    if (type === 'facility') {
      text = `Check out this healthcare facility: ${item.name} - ${item.address}. Phone: ${item.phone}`;
    } else if (type === 'event') {
      text = `Community Health Event: ${item.title} on ${item.date} at ${item.time}, ${item.location}`;
    } else if (type === 'group') {
      text = `Support Group: ${item.name} meets ${item.meetingDay} at ${item.time}, ${item.location}. Contact: ${item.contactPerson} (${item.phone})`;
    }
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/?text=${encodedText}`, '_blank');
  };

  return (
    <div className="community-health-page">
      <div className="text-center mb-4">
        <h1 className="display-5 fw-bold text-primary">{getText('title')}</h1>
        <p className="lead">{getText('subtitle')}</p>
      </div>

      {/* Offline alert */}
      {!navigator.onLine && (
        <Alert variant="warning" className="mb-4">
          <i className="bi bi-wifi-off me-2"></i>
          {getText('offline')}
        </Alert>
      )}

      <Row className="mb-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">{getText('locationSettings')}</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleUpdateLocation}>
                <Form.Group className="mb-3">
                  <Form.Label>{getText('province')}</Form.Label>
                  <Form.Select 
                    value={province} 
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option value="">Select Province</option>
                    {provinces.map(p => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>{getText('searchRadius')}</Form.Label>
                  <Form.Range 
                    min={5} 
                    max={50} 
                    step={5}
                    value={searchRadius}
                    onChange={(e) => setSearchRadius(parseInt(e.target.value))}
                  />
                  <div className="d-flex justify-content-between">
                    <span>5 km</span>
                    <span>{searchRadius} km</span>
                    <span>50 km</span>
                  </div>
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        {getText('update')}...
                      </>
                    ) : (
                      getText('update')
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={8}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">{getText('nearbyFacilities')}</h5>
            </Card.Header>
            <Card.Body>
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <Row xs={1} md={2} className="g-3">
                  {nearbyFacilities.map(facility => (
                    <Col key={facility.id}>
                      <Card className="h-100 facility-card">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start">
                            <div>
                              <Card.Title>{facility.name}</Card.Title>
                              <Badge bg="info" className="mb-2">{facility.type}</Badge>
                            </div>
                            <Badge bg="secondary" pill>
                              {facility.distance} {getText('distance')}
                            </Badge>
                          </div>
                          <Card.Text>
                            <i className="bi bi-geo-alt me-2"></i>{facility.address}<br />
                            <i className="bi bi-telephone me-2"></i>{facility.phone}<br />
                            <i className="bi bi-clock me-2"></i>{facility.hours}
                          </Card.Text>
                          <div className="d-flex justify-content-between mt-3">
                            <Button variant="outline-primary" size="sm">
                              {getText('viewDetails')}
                            </Button>
                            <Button 
                              variant="success" 
                              size="sm"
                              onClick={() => shareViaWhatsApp(facility, 'facility')}
                            >
                              <i className="bi bi-whatsapp me-1"></i>
                              {getText('shareWhatsApp')}
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">{getText('communityEvents')}</h5>
            </Card.Header>
            <Card.Body>
              <ListGroup variant="flush">
                {communityEvents.map(event => (
                  <ListGroup.Item key={event.id} className="border-bottom py-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 className="mb-1">{event.title}</h5>
                        <p className="mb-1">
                          <i className="bi bi-calendar me-2"></i>{event.date} | {event.time}<br />
                          <i className="bi bi-geo-alt me-2"></i>{event.location}<br />
                          <i className="bi bi-people me-2"></i>{event.organizer}
                        </p>
                        <p className="text-muted small mb-2">{event.description}</p>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => shareViaWhatsApp(event, 'event')}
                      >
                        <i className="bi bi-whatsapp me-1"></i>
                        {getText('shareWhatsApp')}
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0">{getText('supportGroups')}</h5>
            </Card.Header>
            <Card.Body>
              <Accordion>
                {supportGroups.map((group, index) => (
                  <Accordion.Item key={group.id} eventKey={index.toString()}>
                    <Accordion.Header>
                      <div>
                        {group.name}
                        {group.whatsappGroup && (
                          <Badge bg="success" className="ms-2">
                            <i className="bi bi-whatsapp me-1"></i>
                            WhatsApp
                          </Badge>
                        )}
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <p>
                        <i className="bi bi-calendar-check me-2"></i>{group.meetingDay} | {group.time}<br />
                        <i className="bi bi-geo-alt me-2"></i>{group.location}<br />
                        <i className="bi bi-person me-2"></i>{group.contactPerson}<br />
                        <i className="bi bi-telephone me-2"></i>{group.phone}
                      </p>
                      <div className="d-flex justify-content-end">
                        <Button 
                          variant="success" 
                          size="sm"
                          onClick={() => shareViaWhatsApp(group, 'group')}
                        >
                          <i className="bi bi-whatsapp me-1"></i>
                          {getText('shareWhatsApp')}
                        </Button>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CommunityHealth;
