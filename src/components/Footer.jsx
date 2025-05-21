import { Link } from 'react-router-dom';

/**
 * Footer component for CareCircle
 * 
 * Provides links to important pages and copyright information.
 * Appears at the bottom of every page in the app.
 */
function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6">
      <div className="container-app">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          {/* Logo and tagline */}
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="text-primary-600 text-xl font-bold">Care</span>
              <span className="text-secondary-600 text-xl font-bold">Circle</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Caring together, made easier
            </p>
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link to="/privacy" className="text-sm text-gray-600 hover:text-primary-600">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-600 hover:text-primary-600">
              Terms of Service
            </Link>
            <Link to="/contact" className="text-sm text-gray-600 hover:text-primary-600">
              Contact Us
            </Link>
            <Link to="/help" className="text-sm text-gray-600 hover:text-primary-600">
              Help & Support
            </Link>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>© {currentYear} CareCircle. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
