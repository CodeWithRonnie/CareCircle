import { useState, useEffect } from 'react';

/**
 * Documents page for CareCircle
 * 
 * Allows family members to upload, organize, and access important documents
 * related to their loved one's care, such as medical records, insurance information,
 * legal documents, and care instructions.
 */
function Documents() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newDocument, setNewDocument] = useState({
    name: '',
    category: 'medical',
    description: '',
    file: null
  });
  
  // Document categories
  const categories = [
    { id: 'all', name: 'All Documents' },
    { id: 'medical', name: 'Medical Records' },
    { id: 'insurance', name: 'Insurance' },
    { id: 'legal', name: 'Legal Documents' },
    { id: 'care', name: 'Care Instructions' },
    { id: 'other', name: 'Other' }
  ];

  // Fetch documents data
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Sample documents data
        setDocuments([
          {
            id: 1,
            name: 'Medical History Summary.pdf',
            category: 'medical',
            description: 'Complete medical history including past surgeries and chronic conditions',
            uploadedBy: 'Sarah Johnson',
            uploadedAt: '2025-04-15T14:30:00',
            size: 2.4, // MB
            url: '#' // In a real app, this would be a secure URL to the file
          },
          {
            id: 2,
            name: 'Insurance Policy.pdf',
            category: 'insurance',
            description: 'Current health insurance policy details and contact information',
            uploadedBy: 'Michael Chen',
            uploadedAt: '2025-04-10T09:15:00',
            size: 1.8,
            url: '#'
          },
          {
            id: 3,
            name: 'Power of Attorney.pdf',
            category: 'legal',
            description: 'Signed power of attorney document',
            uploadedBy: 'Sarah Johnson',
            uploadedAt: '2025-03-22T11:45:00',
            size: 3.2,
            url: '#'
          },
          {
            id: 4,
            name: 'Medication Schedule.docx',
            category: 'care',
            description: 'Detailed medication schedule with dosages and instructions',
            uploadedBy: 'Emma Wilson',
            uploadedAt: '2025-05-05T16:20:00',
            size: 0.5,
            url: '#'
          },
          {
            id: 5,
            name: 'Physical Therapy Exercises.pdf',
            category: 'care',
            description: 'Instructions for daily physical therapy exercises',
            uploadedBy: 'Dr. Williams',
            uploadedAt: '2025-05-10T13:40:00',
            size: 1.2,
            url: '#'
          },
          {
            id: 6,
            name: 'Living Will.pdf',
            category: 'legal',
            description: 'Signed living will document',
            uploadedBy: 'Michael Chen',
            uploadedAt: '2025-03-22T11:50:00',
            size: 2.7,
            url: '#'
          },
          {
            id: 7,
            name: 'Diet Restrictions.docx',
            category: 'care',
            description: 'List of dietary restrictions and recommended meal plans',
            uploadedBy: 'Sarah Johnson',
            uploadedAt: '2025-04-28T10:15:00',
            size: 0.3,
            url: '#'
          }
        ]);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDocuments();
  }, []);

  // Handle input change for new document form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewDocument(prev => ({
        ...prev,
        file,
        name: file.name
      }));
    }
  };

  // Handle form submission for new document
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new document object
    const now = new Date();
    const newDocObj = {
      id: documents.length + 1,
      name: newDocument.name,
      category: newDocument.category,
      description: newDocument.description,
      uploadedBy: 'You', // In a real app, this would be the current user
      uploadedAt: now.toISOString(),
      size: newDocument.file ? Math.round((newDocument.file.size / 1024 / 1024) * 10) / 10 : 0, // Convert bytes to MB
      url: '#' // In a real app, this would be the URL after upload
    };
    
    // Add to documents list
    setDocuments(prev => [...prev, newDocObj]);
    
    // Reset form and close modal
    setNewDocument({
      name: '',
      category: 'medical',
      description: '',
      file: null
    });
    setIsUploadModalOpen(false);
    
    // Show success message (in a real app)
    alert('Document uploaded successfully!');
  };

  // Filter documents based on selected category and search query
  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get icon for document based on file extension
  const getDocumentIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(extension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else if (['doc', 'docx'].includes(extension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else if (['xls', 'xlsx', 'csv'].includes(extension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
      );
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
        </svg>
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
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="mt-1 text-gray-600">
            Store and access important documents for your loved one's care
          </p>
        </div>
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="btn btn-primary sm:self-start"
        >
          Upload Document
        </button>
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0">
          {/* Search */}
          <div className="flex-1 md:mr-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="input pl-10 w-full"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  selectedCategory === category.id 
                    ? 'bg-primary-100 text-primary-800' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Documents list */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {filteredDocuments.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No documents found</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredDocuments.map(document => (
              <li key={document.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start">
                  {/* Document icon */}
                  <div className="flex-shrink-0 mr-4">
                    {getDocumentIcon(document.name)}
                  </div>
                  
                  {/* Document details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <h3 className="text-base font-medium text-gray-900 truncate">
                          {document.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {document.description}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-1">
                          <span>
                            Category: {categories.find(c => c.id === document.category)?.name || document.category}
                          </span>
                          <span>
                            Uploaded by: {document.uploadedBy}
                          </span>
                          <span>
                            {formatDate(document.uploadedAt)}
                          </span>
                          <span>
                            {document.size} MB
                          </span>
                        </div>
                      </div>
                      
                      {/* Actions */}
                      <div className="mt-2 sm:mt-0 sm:ml-4 flex-shrink-0 flex space-x-2">
                        <a
                          href={document.url}
                          className="text-primary-600 hover:text-primary-900 font-medium text-sm"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View
                        </a>
                        <a
                          href={document.url}
                          download
                          className="text-primary-600 hover:text-primary-900 font-medium text-sm"
                        >
                          Download
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Upload Document Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Upload Document</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Select File
                      </label>
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        required
                        className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-medium
                          file:bg-primary-50 file:text-primary-700
                          hover:file:bg-primary-100"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Document Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={newDocument.name}
                        onChange={handleInputChange}
                        required
                        className="input mt-1 block w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={newDocument.category}
                        onChange={handleInputChange}
                        className="input mt-1 block w-full"
                      >
                        {categories.filter(c => c.id !== 'all').map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={newDocument.description}
                        onChange={handleInputChange}
                        rows="3"
                        className="input mt-1 block w-full"
                        placeholder="Add a brief description of this document..."
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto sm:ml-3"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline mt-3 sm:mt-0 w-full sm:w-auto"
                    onClick={() => setIsUploadModalOpen(false)}
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

export default Documents;
