import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
    const classes = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back!</h1>
        <p className="mt-1 text-gray-600">
          Here's what's happening with your loved one today.
        </p>
      </div>
      
      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link 
          to="/updates/new" 
          className="bg-primary-50 hover:bg-primary-100 p-6 rounded-lg border border-primary-200 flex flex-col items-center justify-center text-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <span className="font-medium text-primary-700">Post Update</span>
        </Link>
        
        <Link 
          to="/tasks/new" 
          className="bg-secondary-50 hover:bg-secondary-100 p-6 rounded-lg border border-secondary-200 flex flex-col items-center justify-center text-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="font-medium text-secondary-700">Add Task</span>
        </Link>
        
        <Link 
          to="/medications/log" 
          className="bg-green-50 hover:bg-green-100 p-6 rounded-lg border border-green-200 flex flex-col items-center justify-center text-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="font-medium text-green-700">Log Medication</span>
        </Link>
      </div>
      
      {/* Recent updates */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Updates</h2>
          <Link to="/updates" className="text-sm font-medium text-primary-600 hover:text-primary-500">
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentUpdates.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent updates</p>
          ) : (
            recentUpdates.map(update => (
              <div key={update.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <div className="flex">
                  <img 
                    src={update.avatar} 
                    alt={update.author} 
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{update.author}</h3>
                      <span className="ml-2 text-sm text-gray-500">{update.timestamp}</span>
                    </div>
                    <p className="mt-1 text-gray-600">{update.content}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Upcoming tasks and medications grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Upcoming tasks */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tasks</h2>
            <Link to="/tasks" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingTasks.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming tasks</p>
            ) : (
              upcomingTasks.map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900">{task.title}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-sm text-gray-500 mr-3">{task.dueDate}</span>
                      {renderPriorityBadge(task.priority)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    {task.assignedTo}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        
        {/* Upcoming medications */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Medications</h2>
            <Link to="/medications" className="text-sm font-medium text-primary-600 hover:text-primary-500">
              View all
            </Link>
          </div>
          
          <div className="space-y-3">
            {upcomingMeds.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No upcoming medications</p>
            ) : (
              upcomingMeds.map(med => (
                <div key={med.id} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">{med.name} ({med.dosage})</h3>
                    <span className="text-sm text-gray-600">{med.schedule}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{med.instructions}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
