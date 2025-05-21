import { useState, useEffect } from 'react';

/**
 * Profile page for CareCircle
 * 
 * Allows users to view and edit their profile information,
 * manage notification preferences, and view their activity history.
 */
function Profile() {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  
  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample profile data
        const profileData = {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: '(555) 123-4567',
          role: 'caregiver',
          relationship: 'Son',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          joinedAt: '2025-01-15T10:30:00',
          notificationPreferences: {
            email: true,
            push: true,
            sms: false
          },
          recentActivity: [
            {
              id: 1,
              type: 'update',
              description: 'Posted an update',
              timestamp: '2025-05-20T15:30:00'
            },
            {
              id: 2,
              type: 'medication',
              description: 'Logged medication: Lisinopril',
              timestamp: '2025-05-19T08:15:00'
            },
            {
              id: 3,
              type: 'task',
              description: 'Completed task: Schedule doctor appointment',
              timestamp: '2025-05-18T14:45:00'
            },
            {
              id: 4,
              type: 'document',
              description: 'Uploaded document: Insurance Policy.pdf',
              timestamp: '2025-05-15T11:20:00'
            }
          ]
        };
        
        setProfile(profileData);
        setEditedProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  // Handle input change for profile editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    setEditedProfile(prev => {
      if (name.startsWith('notification.')) {
        const notificationType = name.split('.')[1];
        return {
          ...prev,
          notificationPreferences: {
            ...prev.notificationPreferences,
            [notificationType]: e.target.checked
          }
        };
      }
      
      return {
        ...prev,
        [name]: value
      };
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update profile
      setProfile(editedProfile);
      setIsEditing(false);
      
      // Show success message (in a real app)
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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

  // Get icon for activity type
  const getActivityIcon = (type) => {
    switch (type) {
      case 'update':
        return (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'medication':
        return (
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'task':
        return (
          <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'document':
        return (
          <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
        );
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
        <p className="mt-1 text-gray-600">
          View and manage your personal information and preferences
        </p>
      </div>
      
      {/* Profile information */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center">
            {/* Profile image */}
            <div className="sm:mr-6 mb-4 sm:mb-0 flex-shrink-0">
              <img
                src={profile.avatar}
                alt={`${profile.firstName} ${profile.lastName}`}
                className="h-24 w-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
            
            {/* Profile details */}
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-gray-600">{profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} • {profile.relationship}</p>
              <p className="text-gray-600 mt-1">Member since {formatDate(profile.joinedAt)}</p>
              
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="btn btn-outline mt-4"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {/* Profile edit form */}
          {isEditing ? (
            <form onSubmit={handleSubmit} className="mt-6 border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={editedProfile.firstName}
                    onChange={handleInputChange}
                    required
                    className="input mt-1 block w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={editedProfile.lastName}
                    onChange={handleInputChange}
                    required
                    className="input mt-1 block w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={editedProfile.email}
                    onChange={handleInputChange}
                    required
                    className="input mt-1 block w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={editedProfile.phone}
                    onChange={handleInputChange}
                    className="input mt-1 block w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={editedProfile.role}
                    onChange={handleInputChange}
                    className="input mt-1 block w-full"
                  >
                    <option value="caregiver">Family Caregiver</option>
                    <option value="professional">Healthcare Professional</option>
                    <option value="patient">Patient/Care Recipient</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="relationship" className="block text-sm font-medium text-gray-700">
                    Relationship to care recipient
                  </label>
                  <input
                    type="text"
                    id="relationship"
                    name="relationship"
                    value={editedProfile.relationship}
                    onChange={handleInputChange}
                    className="input mt-1 block w-full"
                    placeholder="e.g., Son, Daughter, Nurse, etc."
                  />
                </div>
              </div>
              
              {/* Notification preferences */}
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Choose how you'd like to receive notifications
                </p>
                
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notification-email"
                        name="notification.email"
                        type="checkbox"
                        checked={editedProfile.notificationPreferences.email}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notification-email" className="font-medium text-gray-700">Email notifications</label>
                      <p className="text-gray-500">Get notified via email for important updates and reminders</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notification-push"
                        name="notification.push"
                        type="checkbox"
                        checked={editedProfile.notificationPreferences.push}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notification-push" className="font-medium text-gray-700">Push notifications</label>
                      <p className="text-gray-500">Receive push notifications on your devices</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="notification-sms"
                        name="notification.sms"
                        type="checkbox"
                        checked={editedProfile.notificationPreferences.sms}
                        onChange={handleInputChange}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="notification-sms" className="font-medium text-gray-700">SMS notifications</label>
                      <p className="text-gray-500">Get text messages for urgent notifications</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Form actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setEditedProfile(profile);
                  }}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-6 border-t border-gray-200 pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email address</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                  <dd className="mt-1 text-sm text-gray-900">{profile.phone}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Notification preferences</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <ul className="space-y-1">
                      {profile.notificationPreferences.email && <li>Email notifications</li>}
                      {profile.notificationPreferences.push && <li>Push notifications</li>}
                      {profile.notificationPreferences.sms && <li>SMS notifications</li>}
                      {!profile.notificationPreferences.email && 
                       !profile.notificationPreferences.push && 
                       !profile.notificationPreferences.sms && 
                       <li>No notifications enabled</li>}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </div>
      
      {/* Recent activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
        
        {profile.recentActivity.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {profile.recentActivity.map(activity => (
              <div key={activity.id} className="flex items-start">
                {getActivityIcon(activity.type)}
                <div className="ml-4">
                  <p className="text-gray-900">{activity.description}</p>
                  <p className="text-sm text-gray-500">{formatDateTime(activity.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Account settings */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Account Settings</h2>
        
        <div className="space-y-4">
          <div>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Change Password
            </button>
          </div>
          <div>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              Privacy Settings
            </button>
          </div>
          <div>
            <button className="text-red-600 hover:text-red-700 font-medium">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
