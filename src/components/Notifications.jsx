import { useState, useEffect } from 'react';
import { Offcanvas, Button, Badge, ListGroup, Spinner } from 'react-bootstrap';

/**
 * Notifications component for CareCircle
 * 
 * Displays notifications for the user, including medication reminders,
 * upcoming visits, and task deadlines.
 */
function Notifications({ isVisible, onClose }) {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // Sample notifications data
        const notificationsData = [
          {
            id: 1,
            type: 'medication',
            title: 'Medication Reminder',
            message: 'Time to take Lisinopril (10mg)',
            timestamp: new Date(new Date().getTime() - 10 * 60000).toISOString(), // 10 minutes ago
            isRead: false
          },
          {
            id: 2,
            type: 'visit',
            title: 'Upcoming Visit',
            message: 'Sarah Johnson is visiting tomorrow at 10:00 AM',
            timestamp: new Date(new Date().getTime() - 3 * 3600000).toISOString(), // 3 hours ago
            isRead: false
          },
          {
            id: 3,
            type: 'task',
            title: 'Task Reminder',
            message: 'Schedule doctor appointment (Due tomorrow)',
            timestamp: new Date(new Date().getTime() - 5 * 3600000).toISOString(), // 5 hours ago
            isRead: true
          },
          {
            id: 4,
            type: 'update',
            title: 'New Update Posted',
            message: 'Michael Chen posted a new update about Mom',
            timestamp: new Date(new Date().getTime() - 24 * 3600000).toISOString(), // 1 day ago
            isRead: true
          },
          {
            id: 5,
            type: 'document',
            title: 'New Document Uploaded',
            message: 'Emma Wilson uploaded "Insurance Policy.pdf"',
            timestamp: new Date(new Date().getTime() - 2 * 24 * 3600000).toISOString(), // 2 days ago
            isRead: true
          }
        ];
        
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (isVisible) {
      fetchNotifications();
    }
  }, [isVisible]);

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Update notification in state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  // Mark all notifications as read
  const markAllAsRead = async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update all notifications in state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    
    if (diffMins < 60) {
      return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Get icon for notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'medication':
        return (
          <div className="avatar avatar-sm bg-care-primary-light">
            <i className="bi bi-capsule text-care-primary"></i>
          </div>
        );
      case 'visit':
        return (
          <div className="avatar avatar-sm bg-care-secondary-light">
            <i className="bi bi-calendar-event text-care-secondary"></i>
          </div>
        );
      case 'task':
        return (
          <div className="avatar avatar-sm" style={{ backgroundColor: '#f3e8ff' }}>
            <i className="bi bi-check2-square" style={{ color: '#9333ea' }}></i>
          </div>
        );
      case 'update':
        return (
          <div className="avatar avatar-sm" style={{ backgroundColor: '#fef9c3' }}>
            <i className="bi bi-chat-left-text" style={{ color: '#ca8a04' }}></i>
          </div>
        );
      case 'document':
        return (
          <div className="avatar avatar-sm" style={{ backgroundColor: '#fee2e2' }}>
            <i className="bi bi-file-earmark-text" style={{ color: '#dc2626' }}></i>
          </div>
        );
      default:
        return (
          <div className="avatar avatar-sm" style={{ backgroundColor: '#f3f4f6' }}>
            <i className="bi bi-info-circle" style={{ color: '#6b7280' }}></i>
          </div>
        );
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  return (
    <Offcanvas show={isVisible} onHide={onClose} placement="end">
      <Offcanvas.Header closeButton className="bg-primary text-white">
        <Offcanvas.Title>Notifications</Offcanvas.Title>
      </Offcanvas.Header>
      <div className="px-3 py-2 bg-primary text-white d-flex justify-content-between align-items-center">
        <div>
          {unreadCount > 0 
            ? `You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` 
            : 'No new notifications'}
        </div>
        {unreadCount > 0 && (
          <Button 
            variant="outline-light" 
            size="sm" 
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        )}
      </div>
      <Offcanvas.Body className="p-0">
        {isLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{height: '200px'}}>
            <Spinner animation="border" variant="primary" className="loading-pulse" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center p-5">
            <div className="mb-3 text-secondary">
              <i className="bi bi-bell-slash" style={{ fontSize: '2rem' }}></i>
            </div>
            <p className="text-gray-500">No notifications yet</p>
          </div>
        ) : (
          <ListGroup variant="flush">
            {notifications.map(notification => (
              <ListGroup.Item 
                key={notification.id}
                className={`d-flex border-bottom notification-item ${!notification.isRead ? 'unread' : ''}`}
                action
                onClick={() => markAsRead(notification.id)}
              >
                <div className="d-flex">
                  <div className="me-3">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <h6 className="mb-1 fw-semibold">{notification.title}</h6>
                      <small className="notification-time ms-2">{formatTimestamp(notification.timestamp)}</small>
                    </div>
                    <p className="mb-1">{notification.message}</p>
                    {!notification.isRead && (
                      <Badge bg="primary" pill className="mt-1">New</Badge>
                    )}
                  </div>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
        {notifications.length > 0 && (
          <div className="p-3 border-top">
            <Button 
              variant="outline-primary" 
              className="w-100"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default Notifications;
