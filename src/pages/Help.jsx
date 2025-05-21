import React from 'react';

/**
 * Help page for CareCircle
 * 
 * Provides guidance and FAQs for users to better understand how to use the application
 */
function Help() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
        <p className="mt-1 text-gray-600">
          Find answers to common questions and learn how to use CareCircle
        </p>
      </div>
      
      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="font-medium">Getting Started</h3>
          </div>
          <p className="text-gray-600 text-sm">Learn the basics of CareCircle and how to set up your account</p>
        </div>
        
        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-medium">Managing Tasks</h3>
          </div>
          <p className="text-gray-600 text-sm">Learn how to create, assign, and track tasks for caregiving</p>
        </div>
        
        <div className="card hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-medium">Medication Tracking</h3>
          </div>
          <p className="text-gray-600 text-sm">Tips for managing medications and setting up reminders</p>
        </div>
      </div>
      
      {/* FAQs */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium text-lg text-gray-900">How do I invite family members to join?</h3>
            <p className="mt-2 text-gray-600">
              From your Dashboard, click on "Invite Members" in the sidebar. Enter their email address and they'll receive an invitation to join your care circle. They'll need to create an account using email/password authentication.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg text-gray-900">Can I use CareCircle on my mobile device?</h3>
            <p className="mt-2 text-gray-600">
              Yes! CareCircle is designed to work on both desktop and mobile devices. Simply open your web browser on your phone or tablet and navigate to the CareCircle website. The interface will automatically adjust to your screen size.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg text-gray-900">How do I set up medication reminders?</h3>
            <p className="mt-2 text-gray-600">
              Navigate to the Medication Tracker page, add a new medication, and toggle on the "Set Reminder" option. You can specify the frequency and timing of the reminders. Make sure you have notifications enabled in your profile settings.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg text-gray-900">Is my information secure?</h3>
            <p className="mt-2 text-gray-600">
              CareCircle takes security seriously. All data is encrypted, and we use secure authentication methods. Your information is only accessible to members of your care circle whom you have invited. We never share your data with third parties.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-lg text-gray-900">How do I upload documents?</h3>
            <p className="mt-2 text-gray-600">
              Go to the Documents page and click the "Upload Document" button. You can upload various file types including PDFs, images, and text documents. Add a description to help others understand what the document contains.
            </p>
          </div>
        </div>
      </div>
      
      {/* Contact support */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
        <p className="text-gray-600 mb-4">
          If you couldn't find the answer you were looking for, our support team is here to help.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <a href="#" className="btn btn-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Support
          </a>
          <a href="#" className="btn btn-outline">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Live Chat
          </a>
        </div>
      </div>
    </div>
  );
}

export default Help;
