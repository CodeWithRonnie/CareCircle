import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Badge, Button, Spinner, ListGroup } from 'react-bootstrap';

/**
 * Dashboard page for CareCircle
 * 
 * This is the main landing page after login, showing an overview of 
 * important information like recent updates, upcoming tasks and medications.
 */
function Dashboard() {
  // Sample data - in a real app, this would come from an API
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  const [upcomingMeds, setUpcomingMeds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate fetching data from an API
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data
        setRecentUpdates([
          {
            id: 1,
            author: 'Sarah Johnson',
            content: 'Mom had a good night\'s sleep and ate a full breakfast this morning.',
            timestamp: '2 hours ago',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
          },
          {
            id: 2,
            author: 'Michael Chen',
            content: 'Dad\'s physical therapy session went well today. The therapist said he\'s making good progress with his mobility exercises.',
            timestamp: 'Yesterday',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          {
            id: 3,
            author: 'Dr. Williams',
            content: 'Blood pressure readings are stable. Continue with current medication regimen and monitor for any changes.',
            timestamp: '2 days ago',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
          }
        ]);
        
        setUpcomingTasks([
          {
            id: 1,
            title: 'Doctor Appointment',
            dueDate: 'Today, 2:30 PM',
            assignedTo: 'You',
            priority: 'high'
          },
          {
            id: 2,
            title: 'Refill Prescriptions',
            dueDate: 'Tomorrow',
            assignedTo: 'Michael',
            priority: 'medium'
          },
          {
            id: 3,
            title: 'Weekly Grocery Shopping',
            dueDate: 'Saturday, 10:00 AM',
            assignedTo: 'Sarah',
            priority: 'low'
          }
        ]);
        
        setUpcomingMeds([
          {
            id: 1,
            name: 'Lisinopril',
            dosage: '10mg',
            schedule: 'Today, 8:00 PM',
            instructions: 'Take with food'
          },
          {
            id: 2,
            name: 'Metformin',
            dosage: '500mg',
            schedule: 'Today, 8:00 PM',
            instructions: 'Take with dinner'
          },
          {
            id: 3,
            name: 'Vitamin D',
            dosage: '1000 IU',
            schedule: 'Tomorrow, 9:00 AM',
            instructions: 'Take with breakfast'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  // Helper function to render priority badge
  const renderPriorityBadge = (priority) => {
    const variants = {
      high: 'danger',
      medium: 'warning',
      low: 'success'
    };
    
    return (
      <Badge bg={variants[priority]} className="text-white">
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <Spinner animation="border" variant="primary" className="loading-pulse" />
      </div>
    );
  }

  return (
    <div className="mb-5">
      {/* Welcome section */}
      <Card className="mb-4 shadow-sm">
        <Card.Body className="p-4">
          <h1 className="fs-3 fw-bold">Welcome back!</h1>
          <p className="text-secondary mb-0">
            Here's what's happening with your loved one today.
          </p>
        </Card.Body>
      </Card>
      
      {/* Quick actions */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="h-100 text-center border-0 shadow-sm bg-care-primary-light">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="mb-3 fs-1 text-care-primary">
                <i className="bi bi-pencil-square"></i>
              </div>
              <h5 className="card-title mb-0">Post Update</h5>
              <p className="text-muted small mt-2">Share how your loved one is doing</p>
              <Button variant="primary" as={Link} to="/updates/new" className="mt-auto">
                <i className="bi bi-plus-circle me-2"></i>New Update
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 text-center border-0 shadow-sm bg-care-secondary-light">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="mb-3 fs-1 text-care-secondary">
                <i className="bi bi-list-check"></i>
              </div>
              <h5 className="card-title mb-0">Manage Tasks</h5>
              <p className="text-muted small mt-2">Coordinate care responsibilities</p>
              <Button variant="secondary" as={Link} to="/tasks/new" className="mt-auto">
                <i className="bi bi-plus-circle me-2"></i>Add Task
              </Button>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="h-100 text-center border-0 shadow-sm" style={{ backgroundColor: '#ecfdf5' }}>
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="mb-3 fs-1" style={{ color: '#10b981' }}>
                <i className="bi bi-capsule"></i>
              </div>
              <h5 className="card-title mb-0">Track Medications</h5>
              <p className="text-muted small mt-2">Record medication administration</p>
              <Button variant="success" as={Link} to="/medications/log" className="mt-auto">
                <i className="bi bi-check-circle me-2"></i>Log Medication
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Recent updates */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
          <h2 className="fs-5 fw-semibold mb-0">Recent Updates</h2>
          <Link to="/updates" className="text-decoration-none">
            View all <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </Card.Header>
        
        <Card.Body className="p-0">
          {recentUpdates.length === 0 ? (
            <div className="text-center p-4 text-muted">
              <i className="bi bi-chat-left-text fs-4 mb-2 d-block"></i>
              <p>No recent updates</p>
            </div>
          ) : (
            <ListGroup variant="flush">
              {recentUpdates.map(update => (
                <ListGroup.Item key={update.id} className="border-bottom py-3">
                  <div className="d-flex">
                    <img 
                      src={update.avatar} 
                      alt={update.author} 
                      className="rounded-circle me-3"
                      width="48"
                      height="48"
                    />
                    <div>
                      <div className="d-flex align-items-center">
                        <h6 className="mb-0">{update.author}</h6>
                        <small className="text-muted ms-2">{update.timestamp}</small>
                      </div>
                      <p className="mt-1 mb-0">{update.content}</p>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
      
      {/* Upcoming tasks and medications */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h2 className="fs-5 fw-semibold mb-0">Upcoming Tasks</h2>
              <Link to="/tasks" className="text-decoration-none">
                View all <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </Card.Header>
            
            <Card.Body className="p-0">
              {upcomingTasks.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <i className="bi bi-list-check fs-4 mb-2 d-block"></i>
                  <p>No upcoming tasks</p>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {upcomingTasks.map(task => (
                    <ListGroup.Item key={task.id} className="border-bottom py-3">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{task.title}</h6>
                          <p className="small mb-1">
                            <span className="fw-medium">Due:</span> {task.dueDate}
                          </p>
                          <p className="small mb-0">
                            <span className="fw-medium">Assigned to:</span> {task.assignedTo}
                          </p>
                        </div>
                        {renderPriorityBadge(task.priority)}
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Header className="bg-white d-flex justify-content-between align-items-center py-3">
              <h2 className="fs-5 fw-semibold mb-0">Upcoming Medications</h2>
              <Link to="/medications" className="text-decoration-none">
                View all <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </Card.Header>
            
            <Card.Body className="p-0">
              {upcomingMeds.length === 0 ? (
                <div className="text-center p-4 text-muted">
                  <i className="bi bi-capsule fs-4 mb-2 d-block"></i>
                  <p>No upcoming medications</p>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {upcomingMeds.map(med => (
                    <ListGroup.Item key={med.id} className="border-bottom py-3">
                      <h6 className="mb-1">{med.name} ({med.dosage})</h6>
                      <p className="small mb-1">
                        <span className="fw-medium">Schedule:</span> {med.schedule}
                      </p>
                      <p className="small mb-0">
                        <span className="fw-medium">Instructions:</span> {med.instructions}
                      </p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Care summary section */}
      <Card className="mt-4 shadow-sm">
        <Card.Header className="bg-white py-3">
          <h2 className="fs-5 fw-semibold mb-0">Care Summary</h2>
        </Card.Header>
        <Card.Body>
          <Row className="text-center g-3">
            <Col md={3} sm={6}>
              <div className="p-3 rounded bg-light">
                <div className="fs-1 text-care-primary mb-2">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <h5 className="fs-6 fw-semibold">Next Appointment</h5>
                <p className="small mb-0">Dr. Williams, May 25</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3 rounded bg-light">
                <div className="fs-1 text-care-secondary mb-2">
                  <i className="bi bi-heart-pulse"></i>
                </div>
                <h5 className="fs-6 fw-semibold">Vital Signs</h5>
                <p className="small mb-0">BP: 120/80, HR: 72</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3 rounded bg-light">
                <div className="fs-1 text-success mb-2">
                  <i className="bi bi-activity"></i>
                </div>
                <h5 className="fs-6 fw-semibold">Daily Activity</h5>
                <p className="small mb-0">Walked 15 minutes</p>
              </div>
            </Col>
            <Col md={3} sm={6}>
              <div className="p-3 rounded bg-light">
                <div className="fs-1 text-warning mb-2">
                  <i className="bi bi-people"></i>
                </div>
                <h5 className="fs-6 fw-semibold">Care Team</h5>
                <p className="small mb-0">3 active members</p>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;
