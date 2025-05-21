import { useState, useEffect } from 'react';

/**
 * Medication Tracker page for CareCircle
 * 
 * Allows users to view, add, edit, and track medications for their loved ones.
 * Includes medication schedule, history, and reminders.
 */
function MedicationTracker() {
  const [medications, setMedications] = useState([]);
  const [medicationHistory, setMedicationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: 'daily',
    time: '',
    instructions: '',
    startDate: '',
    endDate: '',
  });

  // Fetch medications data
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample medications data
        setMedications([
          {
            id: 1,
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'daily',
            time: '08:00',
            instructions: 'Take with food',
            startDate: '2025-01-15',
            endDate: '2025-07-15',
            status: 'active'
          },
          {
            id: 2,
            name: 'Metformin',
            dosage: '500mg',
            frequency: 'twice-daily',
            time: '08:00,20:00',
            instructions: 'Take with meals',
            startDate: '2025-02-01',
            endDate: '',
            status: 'active'
          },
          {
            id: 3,
            name: 'Vitamin D',
            dosage: '1000 IU',
            frequency: 'daily',
            time: '09:00',
            instructions: 'Take with breakfast',
            startDate: '2025-01-01',
            endDate: '',
            status: 'active'
          },
          {
            id: 4,
            name: 'Ibuprofen',
            dosage: '400mg',
            frequency: 'as-needed',
            time: '',
            instructions: 'Take for pain, not more than 3 times per day',
            startDate: '2025-03-10',
            endDate: '2025-03-17',
            status: 'completed'
          }
        ]);
        
        // Sample medication history
        setMedicationHistory([
          {
            id: 1,
            medicationId: 1,
            medicationName: 'Lisinopril',
            dosage: '10mg',
            takenAt: '2025-05-21T08:05:00',
            takenBy: 'Sarah Johnson',
            notes: 'Taken with breakfast'
          },
          {
            id: 2,
            medicationId: 2,
            medicationName: 'Metformin',
            dosage: '500mg',
            takenAt: '2025-05-21T08:10:00',
            takenBy: 'Sarah Johnson',
            notes: 'Taken with breakfast'
          },
          {
            id: 3,
            medicationId: 3,
            medicationName: 'Vitamin D',
            dosage: '1000 IU',
            takenAt: '2025-05-21T09:00:00',
            takenBy: 'Michael Chen',
            notes: ''
          },
          {
            id: 4,
            medicationId: 2,
            medicationName: 'Metformin',
            dosage: '500mg',
            takenAt: '2025-05-20T20:00:00',
            takenBy: 'Michael Chen',
            notes: 'Taken with dinner'
          }
        ]);
      } catch (error) {
        console.error('Error fetching medications:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMedications();
  }, []);

  // Handle input change for new medication form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for new medication
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new medication object
    const newMed = {
      id: medications.length + 1,
      ...newMedication,
      status: 'active'
    };
    
    // Add to medications list
    setMedications(prev => [...prev, newMed]);
    
    // Reset form and close modal
    setNewMedication({
      name: '',
      dosage: '',
      frequency: 'daily',
      time: '',
      instructions: '',
      startDate: '',
      endDate: '',
    });
    setIsAddModalOpen(false);
  };

  // Handle marking medication as taken
  const handleMedicationTaken = (medication) => {
    const now = new Date();
    
    const newHistoryEntry = {
      id: medicationHistory.length + 1,
      medicationId: medication.id,
      medicationName: medication.name,
      dosage: medication.dosage,
      takenAt: now.toISOString(),
      takenBy: 'You', // In a real app, this would be the current user
      notes: ''
    };
    
    setMedicationHistory(prev => [newHistoryEntry, ...prev]);
    
    // Show confirmation message (in a real app)
    alert(`${medication.name} marked as taken!`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format datetime for display
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medication Tracker</h1>
          <p className="mt-1 text-gray-600">
            Manage and track medications for your loved one
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary"
        >
          Add Medication
        </button>
      </div>
      
      {/* Active medications */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Medications</h2>
        
        {medications.filter(med => med.status === 'active').length === 0 ? (
          <p className="text-gray-500 text-center py-4">No active medications</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Schedule
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instructions
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medications
                  .filter(med => med.status === 'active')
                  .map(medication => (
                    <tr key={medication.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{medication.name}</div>
                        <div className="text-sm text-gray-500">{medication.dosage}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {medication.frequency === 'daily' && 'Once daily'}
                          {medication.frequency === 'twice-daily' && 'Twice daily'}
                          {medication.frequency === 'as-needed' && 'As needed'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {medication.time && medication.time.split(',').join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{medication.instructions}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(medication.startDate)} - {formatDate(medication.endDate)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleMedicationTaken(medication)}
                          className="text-green-600 hover:text-green-900 mr-3"
                        >
                          Mark as Taken
                        </button>
                        <button
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Medication history */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Medication History</h2>
        
        {medicationHistory.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No medication history</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Medication
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Given By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {medicationHistory.map(entry => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDateTime(entry.takenAt)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{entry.medicationName}</div>
                      <div className="text-sm text-gray-500">{entry.dosage}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{entry.takenBy}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{entry.notes || '-'}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Add Medication Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Add New Medication</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Medication Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newMedication.name}
                        onChange={handleInputChange}
                        required
                        className="input mt-1 block w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="dosage" className="block text-sm font-medium text-gray-700">
                        Dosage
                      </label>
                      <input
                        type="text"
                        id="dosage"
                        name="dosage"
                        value={newMedication.dosage}
                        onChange={handleInputChange}
                        required
                        className="input mt-1 block w-full"
                        placeholder="e.g., 10mg, 1 tablet"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">
                        Frequency
                      </label>
                      <select
                        id="frequency"
                        name="frequency"
                        value={newMedication.frequency}
                        onChange={handleInputChange}
                        className="input mt-1 block w-full"
                      >
                        <option value="daily">Once Daily</option>
                        <option value="twice-daily">Twice Daily</option>
                        <option value="three-times-daily">Three Times Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="as-needed">As Needed</option>
                      </select>
                    </div>
                    
                    {newMedication.frequency !== 'as-needed' && (
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                          Time(s)
                        </label>
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={newMedication.time}
                          onChange={handleInputChange}
                          className="input mt-1 block w-full"
                        />
                        <p className="mt-1 text-xs text-gray-500">
                          For multiple times, separate with commas (e.g., 08:00,20:00)
                        </p>
                      </div>
                    )}
                    
                    <div>
                      <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">
                        Instructions
                      </label>
                      <textarea
                        id="instructions"
                        name="instructions"
                        value={newMedication.instructions}
                        onChange={handleInputChange}
                        rows="2"
                        className="input mt-1 block w-full"
                        placeholder="e.g., Take with food"
                      ></textarea>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                          Start Date
                        </label>
                        <input
                          type="date"
                          id="startDate"
                          name="startDate"
                          value={newMedication.startDate}
                          onChange={handleInputChange}
                          required
                          className="input mt-1 block w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                          End Date (Optional)
                        </label>
                        <input
                          type="date"
                          id="endDate"
                          name="endDate"
                          value={newMedication.endDate}
                          onChange={handleInputChange}
                          className="input mt-1 block w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Add Medication
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline mt-3 sm:mt-0 w-full sm:w-auto"
                    onClick={() => setIsAddModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MedicationTracker;
