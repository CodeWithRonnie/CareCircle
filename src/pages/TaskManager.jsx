import { useState, useEffect } from 'react';

/**
 * Task Manager page for CareCircle
 * 
 * Allows family members to create, assign, and track tasks related to
 * caring for their loved one. Tasks can be filtered by status and assigned person.
 */
function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    assignedTo: '',
    priority: 'medium',
  });
  
  // Sample family members for task assignment
  const familyMembers = [
    { id: 1, name: 'You' },
    { id: 2, name: 'Sarah Johnson' },
    { id: 3, name: 'Michael Chen' },
    { id: 4, name: 'Emma Wilson' },
  ];

  // Fetch tasks data
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample tasks data
        setTasks([
          {
            id: 1,
            title: 'Schedule doctor appointment',
            description: 'Call Dr. Smith to schedule the quarterly checkup',
            createdAt: '2025-05-18T10:30:00',
            dueDate: '2025-05-22T17:00:00',
            assignedTo: 'Sarah Johnson',
            assignedBy: 'You',
            priority: 'high',
            status: 'pending'
          },
          {
            id: 2,
            title: 'Refill prescriptions',
            description: 'Pick up new prescriptions from the pharmacy',
            createdAt: '2025-05-19T14:20:00',
            dueDate: '2025-05-21T18:00:00',
            assignedTo: 'Michael Chen',
            assignedBy: 'You',
            priority: 'medium',
            status: 'pending'
          },
          {
            id: 3,
            title: 'Weekly grocery shopping',
            description: 'Buy groceries according to the shared shopping list',
            createdAt: '2025-05-17T09:15:00',
            dueDate: '2025-05-25T12:00:00',
            assignedTo: 'Sarah Johnson',
            assignedBy: 'You',
            priority: 'medium',
            status: 'pending'
          },
          {
            id: 4,
            title: 'Change bed sheets',
            description: 'Change and wash bed sheets',
            createdAt: '2025-05-15T16:45:00',
            dueDate: '2025-05-18T20:00:00',
            assignedTo: 'You',
            assignedBy: 'You',
            priority: 'low',
            status: 'completed',
            completedAt: '2025-05-18T15:30:00',
            completedBy: 'You'
          },
          {
            id: 5,
            title: 'Schedule physical therapy',
            description: 'Call the physical therapist to schedule next week\'s sessions',
            createdAt: '2025-05-14T11:20:00',
            dueDate: '2025-05-16T17:00:00',
            assignedTo: 'Emma Wilson',
            assignedBy: 'You',
            priority: 'high',
            status: 'completed',
            completedAt: '2025-05-16T14:25:00',
            completedBy: 'Emma Wilson'
          }
        ]);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  // Handle input change for new task form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission for new task
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new task object
    const now = new Date();
    const newTaskObj = {
      id: tasks.length + 1,
      ...newTask,
      createdAt: now.toISOString(),
      assignedBy: 'You', // In a real app, this would be the current user
      status: 'pending'
    };
    
    // Add to tasks list
    setTasks(prev => [...prev, newTaskObj]);
    
    // Reset form and close modal
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      assignedTo: '',
      priority: 'medium',
    });
    setIsAddModalOpen(false);
  };

  // Handle marking task as complete
  const handleCompleteTask = (taskId) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            status: 'completed',
            completedAt: new Date().toISOString(),
            completedBy: 'You' // In a real app, this would be the current user
          };
        }
        return task;
      })
    );
  };

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'pending') return task.status === 'pending';
    if (filter === 'completed') return task.status === 'completed';
    if (filter === 'mine') return task.assignedTo === 'You' && task.status === 'pending';
    if (filter === 'high-priority') return task.priority === 'high' && task.status === 'pending';
    return true;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if a task is overdue
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && filter !== 'completed';
  };

  // Get priority badge classes
  const getPriorityClasses = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
          <p className="mt-1 text-gray-600">
            Create, assign, and track tasks for your loved one's care
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary sm:self-start"
        >
          Add New Task
        </button>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'all' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            All Tasks
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'pending' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'completed' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('mine')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'mine' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            Assigned to Me
          </button>
          <button
            onClick={() => setFilter('high-priority')}
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              filter === 'high-priority' 
                ? 'bg-primary-100 text-primary-800' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            High Priority
          </button>
        </div>
      </div>
      
      {/* Tasks list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredTasks.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No tasks found</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map(task => (
              <li key={task.id} className={`p-6 ${task.status === 'completed' ? 'bg-gray-50' : ''}`}>
                <div className="flex flex-col sm:flex-row sm:items-start">
                  {/* Task status checkbox */}
                  <div className="sm:mr-4 mb-2 sm:mb-0">
                    {task.status === 'completed' ? (
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        className="h-6 w-6 rounded-full border-2 border-gray-300 hover:border-primary-500 transition-colors"
                        aria-label="Mark as complete"
                      ></button>
                    )}
                  </div>
                  
                  {/* Task details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                      <div>
                        <h3 className={`font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </h3>
                        <p className={`mt-1 text-sm ${task.status === 'completed' ? 'text-gray-400' : 'text-gray-600'}`}>
                          {task.description}
                        </p>
                      </div>
                      
                      <div className="mt-2 sm:mt-0 sm:ml-4 flex flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityClasses(task.priority)}`}>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                        
                        {isOverdue(task.dueDate) && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Overdue
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-col sm:flex-row text-sm text-gray-500 space-y-1 sm:space-y-0 sm:space-x-4">
                      <div>
                        <span className="font-medium">Due:</span> {formatDate(task.dueDate)}
                      </div>
                      <div>
                        <span className="font-medium">Assigned to:</span> {task.assignedTo}
                      </div>
                      {task.status === 'completed' && (
                        <div>
                          <span className="font-medium">Completed:</span> {formatDate(task.completedAt)} by {task.completedBy}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Add Task Modal */}
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
                    <h3 className="text-lg font-medium text-gray-900">Add New Task</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Task Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newTask.title}
                        onChange={handleInputChange}
                        required
                        className="input mt-1 block w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={newTask.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="input mt-1 block w-full"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
                        Due Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        id="dueDate"
                        name="dueDate"
                        value={newTask.dueDate}
                        onChange={handleInputChange}
                        required
                        className="input mt-1 block w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
                        Assign To
                      </label>
                      <select
                        id="assignedTo"
                        name="assignedTo"
                        value={newTask.assignedTo}
                        onChange={handleInputChange}
                        required
                        className="input mt-1 block w-full"
                      >
                        <option value="">Select a person</option>
                        {familyMembers.map(member => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                        Priority
                      </label>
                      <select
                        id="priority"
                        name="priority"
                        value={newTask.priority}
                        onChange={handleInputChange}
                        className="input mt-1 block w-full"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Add Task
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

export default TaskManager;
