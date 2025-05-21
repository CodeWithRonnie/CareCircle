import { useState, useEffect } from 'react';

/**
 * Updates page for CareCircle
 * 
 * Allows family members to share and view updates about their loved one.
 * Updates can include text, photos, and important information about
 * daily activities, mood, health status, etc.
 */
function Updates() {
  const [updates, setUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newUpdate, setNewUpdate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fetch updates data
  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample updates data
        setUpdates([
          {
            id: 1,
            author: {
              name: 'Sarah Johnson',
              avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
              relationship: 'Daughter'
            },
            content: 'Mom had a good night\'s sleep and ate a full breakfast this morning. She seems to be in good spirits today and is looking forward to her physical therapy session this afternoon.',
            timestamp: '2025-05-21T10:30:00',
            likes: 2,
            comments: [
              {
                id: 1,
                author: {
                  name: 'Michael Chen',
                  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
                  relationship: 'Son'
                },
                content: 'That\'s great to hear! I\'ll stop by after work today.',
                timestamp: '2025-05-21T11:15:00'
              }
            ]
          },
          {
            id: 2,
            author: {
              name: 'Dr. Williams',
              avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
              relationship: 'Doctor'
            },
            content: 'Had a good checkup with Mrs. Johnson today. Blood pressure readings are stable at 130/82. Continue with current medication regimen and monitor for any changes. Next appointment scheduled for June 15th.',
            timestamp: '2025-05-20T16:45:00',
            likes: 3,
            comments: [
              {
                id: 1,
                author: {
                  name: 'Sarah Johnson',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                  relationship: 'Daughter'
                },
                content: 'Thank you for the update, Dr. Williams. I\'ve added the next appointment to our shared calendar.',
                timestamp: '2025-05-20T17:30:00'
              }
            ]
          },
          {
            id: 3,
            author: {
              name: 'Michael Chen',
              avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
              relationship: 'Son'
            },
            content: 'Dad\'s physical therapy session went well today. The therapist said he\'s making good progress with his mobility exercises. We practiced walking with the walker for about 15 minutes, and he was able to go a bit further than last time.',
            timestamp: '2025-05-19T14:20:00',
            likes: 2,
            comments: []
          },
          {
            id: 4,
            author: {
              name: 'Emma Wilson',
              avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
              relationship: 'Nurse'
            },
            content: 'Administered evening medications at 8pm. Mr. Johnson was comfortable and settled for the night. He mentioned having a slight headache earlier, but it subsided after taking his regular pain medication.',
            timestamp: '2025-05-18T20:15:00',
            likes: 1,
            comments: [
              {
                id: 1,
                author: {
                  name: 'Sarah Johnson',
                  avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
                  relationship: 'Daughter'
                },
                content: 'Thanks for letting us know about the headache, Emma. Has he mentioned any other pain recently?',
                timestamp: '2025-05-18T21:00:00'
              },
              {
                id: 2,
                author: {
                  name: 'Emma Wilson',
                  avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
                  relationship: 'Nurse'
                },
                content: 'No other pain mentioned. He said the headache was mild and might have been from reading too long without his glasses.',
                timestamp: '2025-05-18T21:10:00'
              }
            ]
          }
        ]);
      } catch (error) {
        console.error('Error fetching updates:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUpdates();
  }, []);

  // Handle posting a new update
  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    
    if (!newUpdate.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new update object
      const newUpdateObj = {
        id: updates.length + 1,
        author: {
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
          relationship: 'Son/Daughter'
        },
        content: newUpdate,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: []
      };
      
      // Add to updates list
      setUpdates(prev => [newUpdateObj, ...prev]);
      
      // Clear input
      setNewUpdate('');
    } catch (error) {
      console.error('Error posting update:', error);
      alert('Failed to post update. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle liking an update
  const handleLikeUpdate = (updateId) => {
    setUpdates(prev => 
      prev.map(update => {
        if (update.id === updateId) {
          return {
            ...update,
            likes: update.likes + 1
          };
        }
        return update;
      })
    );
  };

  // Handle adding a comment
  const handleAddComment = (updateId, commentText) => {
    if (!commentText.trim()) return;
    
    setUpdates(prev => 
      prev.map(update => {
        if (update.id === updateId) {
          const newComment = {
            id: update.comments.length + 1,
            author: {
              name: 'You',
              avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
              relationship: 'Son/Daughter'
            },
            content: commentText,
            timestamp: new Date().toISOString()
          };
          
          return {
            ...update,
            comments: [...update.comments, newComment]
          };
        }
        return update;
      })
    );
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 1) {
      return 'Just now';
    } else if (diffMins < 60) {
      return `${diffMins} minute${diffMins === 1 ? '' : 's'} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
        hour: '2-digit',
        minute: '2-digit'
      });
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
        <h1 className="text-2xl font-bold text-gray-900">Updates</h1>
        <p className="mt-1 text-gray-600">
          Share and view updates about your loved one
        </p>
      </div>
      
      {/* New update form */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmitUpdate}>
          <div className="mb-4">
            <label htmlFor="update" className="block text-sm font-medium text-gray-700 mb-2">
              Post an update
            </label>
            <textarea
              id="update"
              rows="3"
              className="input block w-full"
              placeholder="Share an update about your loved one's day, health, or activities..."
              value={newUpdate}
              onChange={(e) => setNewUpdate(e.target.value)}
              required
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !newUpdate.trim()}
              className="btn btn-primary"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Posting...
                </>
              ) : 'Post Update'}
            </button>
          </div>
        </form>
      </div>
      
      {/* Updates feed */}
      <div className="space-y-6">
        {updates.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-gray-500">No updates yet</p>
          </div>
        ) : (
          updates.map(update => (
            <div key={update.id} className="bg-white rounded-lg shadow-sm p-6">
              {/* Update header */}
              <div className="flex items-start">
                <img
                  src={update.author.avatar}
                  alt={update.author.name}
                  className="h-10 w-10 rounded-full mr-3"
                />
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{update.author.name}</h3>
                    <span className="ml-2 text-sm text-gray-500">{update.author.relationship}</span>
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(update.timestamp)}</p>
                </div>
              </div>
              
              {/* Update content */}
              <div className="mt-4">
                <p className="text-gray-800 whitespace-pre-line">{update.content}</p>
              </div>
              
              {/* Update actions */}
              <div className="mt-4 flex items-center space-x-4">
                <button
                  onClick={() => handleLikeUpdate(update.id)}
                  className="text-gray-500 hover:text-primary-600 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>{update.likes}</span>
                </button>
                
                <button
                  className="text-gray-500 hover:text-primary-600 flex items-center"
                  onClick={() => {
                    const commentEl = document.getElementById(`comment-${update.id}`);
                    if (commentEl) {
                      commentEl.focus();
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                  <span>{update.comments.length}</span>
                </button>
              </div>
              
              {/* Comments section */}
              {update.comments.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Comments</h4>
                  <div className="space-y-4">
                    {update.comments.map(comment => (
                      <div key={comment.id} className="flex items-start">
                        <img
                          src={comment.author.avatar}
                          alt={comment.author.name}
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="flex items-center">
                            <h5 className="text-sm font-medium text-gray-900">{comment.author.name}</h5>
                            <span className="ml-2 text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-800 mt-1">{comment.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Add comment form */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const commentText = e.target.elements.comment.value;
                    handleAddComment(update.id, commentText);
                    e.target.reset();
                  }}
                  className="flex"
                >
                  <input
                    type="text"
                    id={`comment-${update.id}`}
                    name="comment"
                    className="input flex-1 py-1"
                    placeholder="Add a comment..."
                    required
                  />
                  <button
                    type="submit"
                    className="ml-2 text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Updates;
