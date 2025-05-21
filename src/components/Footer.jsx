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
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container-app">
        <div className="row align-items-center text-center text-md-start">
          {/* Logo and tagline */}
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <span className="text-care-primary fw-bold fs-4">Care</span>
              <span className="text-care-secondary fw-bold fs-4">Circle</span>
            </div>
            <p className="small text-muted mt-1 mb-0">
              Caring together, made easier
            </p>
          </div>
          
          {/* Links */}
          <div className="col-md-8">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 gap-md-4">
              <Link to="/privacy" className="small text-secondary text-decoration-none">
                Privacy Policy
              </Link>
              <Link to="/terms" className="small text-secondary text-decoration-none">
                Terms of Service
              </Link>
              <Link to="/contact" className="small text-secondary text-decoration-none">
                Contact Us
              </Link>
              <Link to="/help" className="small text-secondary text-decoration-none">
                Help & Support
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="mt-3 text-center text-md-end small text-muted">
              <p className="mb-0">© {currentYear} CareCircle. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
