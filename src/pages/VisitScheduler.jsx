import { useState, useEffect } from 'react';

/**
 * Visit Scheduler page for CareCircle
 * 
 * Allows family members to schedule and coordinate visits for their loved ones
 */
function VisitScheduler() {
  const [visits, setVisits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingVisit, setIsAddingVisit] = useState(false);
  const [newVisit, setNewVisit] = useState({
    visitorName: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: '',
  });
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  // Fetch visits data
  useEffect(() => {
    const fetchVisits = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample visits data
        const visitsData = [
          {
            id: 1,
            visitorName: 'Sarah Johnson',
            date: '2025-05-25',
            startTime: '10:00',
            endTime: '12:00',
            notes: 'Bringing homemade soup and new books',
            createdBy: 'sarah.johnson@example.com'
          },
          {
            id: 2,
            visitorName: 'Michael Chen',
            date: '2025-05-27',
            startTime: '14:00',
            endTime: '16:00',
            notes: 'Doctor appointment follow-up',
            createdBy: 'michael.chen@example.com'
          },
          {
            id: 3,
            visitorName: 'Emma Wilson',
            date: '2025-05-30',
            startTime: '11:00',
            endTime: '13:30',
            notes: 'Lunch and medication review',
            createdBy: 'emma.wilson@example.com'
          },
          {
            id: 4,
            visitorName: 'Robert Garcia',
            date: '2025-06-02',
            startTime: '15:00',
            endTime: '17:00',
            notes: 'Bringing grandchildren for a visit',
            createdBy: 'robert.garcia@example.com'
          }
        ];
        
        setVisits(visitsData);
      } catch (error) {
        console.error('Error fetching visits:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVisits();
  }, []);

  // Handle input change for new visit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVisit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Validate form
      if (!newVisit.visitorName || !newVisit.date || !newVisit.startTime || !newVisit.endTime) {
        alert('Please fill in all required fields');
        return;
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new visit with generated ID
      const createdVisit = {
        ...newVisit,
        id: visits.length + 1,
        createdBy: 'john.doe@example.com' // Current user email (would come from auth in real app)
      };
      
      // Add to visits list
      setVisits(prev => [...prev, createdVisit]);
      
      // Reset form and close modal
      setNewVisit({
        visitorName: '',
        date: '',
        startTime: '',
        endTime: '',
        notes: '',
      });
      setIsAddingVisit(false);
      
      // Show success message (in a real app)
      alert('Visit scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling visit:', error);
      alert('Failed to schedule visit. Please try again.');
    }
  };

  // Delete a visit
  const handleDeleteVisit = async (id) => {
    if (window.confirm('Are you sure you want to delete this visit?')) {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Remove from visits list
        setVisits(prev => prev.filter(visit => visit.id !== id));
        
        // Show success message (in a real app)
        alert('Visit deleted successfully!');
      } catch (error) {
        console.error('Error deleting visit:', error);
        alert('Failed to delete visit. Please try again.');
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get visits for the selected month
  const getVisitsForSelectedMonth = () => {
    return visits.filter(visit => {
      const visitDate = new Date(visit.date);
      return visitDate.getMonth() === selectedMonth && visitDate.getFullYear() === selectedYear;
    });
  };

  // Generate calendar days for the selected month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    
    return days;
  };

  // Get visits for a specific day
  const getVisitsForDay = (day) => {
    if (!day) return [];
    
    const dateString = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return visits.filter(visit => visit.date === dateString);
  };

  // Navigate to previous month
  const goToPreviousMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Navigate to next month
  const goToNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Get month name
  const getMonthName = (month) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month];
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
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Visit Scheduler</h1>
        <p className="mt-1 text-gray-600">
          Schedule and coordinate visits for your loved one
        </p>
      </div>
      
      {/* Calendar view */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <h2 className="text-xl font-semibold">
            {getMonthName(selectedMonth)} {selectedYear}
          </h2>
          
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {/* Day headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-gray-700 py-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {generateCalendarDays().map((day, index) => {
            const dayVisits = day ? getVisitsForDay(day) : [];
            const isToday = day && 
              new Date().getDate() === day && 
              new Date().getMonth() === selectedMonth && 
              new Date().getFullYear() === selectedYear;
            
            return (
              <div 
                key={index} 
                className={`
                  min-h-24 border rounded-md p-1 
                  ${day ? 'bg-white' : 'bg-gray-50'} 
                  ${isToday ? 'border-primary-500 border-2' : 'border-gray-200'}
                `}
              >
                {day && (
                  <>
                    <div className="text-right">
                      <span className={`inline-block rounded-full w-6 h-6 text-center ${isToday ? 'bg-primary-500 text-white' : ''}`}>
                        {day}
                      </span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {dayVisits.map(visit => (
                        <div 
                          key={visit.id} 
                          className="text-xs p-1 rounded bg-primary-100 text-primary-800 truncate"
                          title={`${visit.visitorName}: ${visit.startTime} - ${visit.endTime}`}
                        >
                          {visit.startTime} - {visit.visitorName}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Upcoming visits list */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Upcoming Visits</h2>
          <button 
            onClick={() => setIsAddingVisit(true)}
            className="btn btn-primary"
          >
            Schedule Visit
          </button>
        </div>
        
        {visits.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No upcoming visits scheduled</p>
        ) : (
          <div className="space-y-4">
            {visits
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map(visit => (
                <div key={visit.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{visit.visitorName}</h3>
                      <p className="text-gray-600">
                        {formatDate(visit.date)} • {visit.startTime} to {visit.endTime}
                      </p>
                      {visit.notes && (
                        <p className="text-gray-600 mt-2">{visit.notes}</p>
                      )}
                    </div>
                    <button 
                      onClick={() => handleDeleteVisit(visit.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete visit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      
      {/* Add visit modal */}
      {isAddingVisit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Schedule a Visit</h2>
              <button 
                onClick={() => setIsAddingVisit(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="visitorName" className="block text-sm font-medium text-gray-700">
                    Visitor Name*
                  </label>
                  <input
                    type="text"
                    id="visitorName"
                    name="visitorName"
                    value={newVisit.visitorName}
                    onChange={handleInputChange}
                    required
                    className="input mt-1 block w-full"
                    placeholder="Enter visitor name"
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Visit Date*
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newVisit.date}
                    onChange={handleInputChange}
                    required
                    className="input mt-1 block w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">
                      Start Time*
                    </label>
                    <input
                      type="time"
                      id="startTime"
                      name="startTime"
                      value={newVisit.startTime}
                      onChange={handleInputChange}
                      required
                      className="input mt-1 block w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">
                      End Time*
                    </label>
                    <input
                      type="time"
                      id="endTime"
                      name="endTime"
                      value={newVisit.endTime}
                      onChange={handleInputChange}
                      required
                      className="input mt-1 block w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={newVisit.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="input mt-1 block w-full"
                    placeholder="Any additional information about the visit"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddingVisit(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Schedule Visit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default VisitScheduler;
