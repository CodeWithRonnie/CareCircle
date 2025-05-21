import { Link } from 'react-router-dom';

/**
 * Footer component for CareConnect SA
 * 
 * Provides links to important pages and copyright information.
 * Includes South African specific features like multi-language support.
 */
function Footer({ language }) {
  const currentYear = new Date().getFullYear();
  
  // Translations for multilingual support
  const translations = {
    tagline: {
      en: 'Caring together in South Africa',
      af: 'Sorg saam in Suid-Afrika',
      zu: 'Sinakekela ndawonye eNingizimu Afrika',
      xh: 'Sikhathala kunye eMzantsi Afrika'
    },
    privacyPolicy: {
      en: 'Privacy Policy',
      af: 'Privaatheidsbeleid',
      zu: 'Inqubomgomo Yemfihlo',
      xh: 'Umgaqo-nkqubo Wabucala'
    },
    termsOfService: {
      en: 'Terms of Service',
      af: 'Diensvoorwaardes',
      zu: 'Imigomo Yesevisi',
      xh: 'Imiqathango Yenkonzo'
    },
    contactUs: {
      en: 'Contact Us',
      af: 'Kontak Ons',
      zu: 'Xhumana Nathi',
      xh: 'Qhagamshelana Nathi'
    },
    helpSupport: {
      en: 'Help & Support',
      af: 'Hulp & Ondersteuning',
      zu: 'Usizo Nokusekela',
      xh: 'Uncedo & Inkxaso'
    },
    allRightsReserved: {
      en: 'All rights reserved',
      af: 'Alle regte voorbehou',
      zu: 'Wonke amalungelo agodliwe',
      xh: 'Onke amalungelo agciniwe'
    },
    nationalHealthline: {
      en: 'National Health Hotline: 0800 012 322',
      af: 'Nasionale Gesondheidsluitlyn: 0800 012 322',
      zu: 'Ucingo Lwezempilo Lukazwelonke: 0800 012 322',
      xh: 'Umnxeba Wezempilo Wesizwe: 0800 012 322'
    }
  };
  
  // Get text based on current language
  const getText = (key) => {
    return translations[key][language] || translations[key]['en'];
  };
  
  return (
    <footer className="bg-white border-top py-4 mt-auto">
      <div className="container-app">
        <div className="row align-items-center text-center text-md-start">
          {/* Logo and tagline */}
          <div className="col-md-4 mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <span className="text-primary fw-bold fs-4">Care</span>
              <span className="text-info fw-bold fs-4">Connect</span>
              <span className="ms-1 badge bg-success align-self-start">SA</span>
            </div>
            <p className="small text-muted mt-1 mb-0">
              {getText('tagline')}
            </p>
            <div className="mt-2 d-flex align-items-center justify-content-center justify-content-md-start gap-2">
            </div>
          </div>
          
          {/* Links */}
          <div className="col-md-8">
            <div className="d-flex flex-wrap justify-content-center justify-content-md-end gap-3 gap-md-4">
              <Link to="/privacy" className="small text-secondary text-decoration-none">
                {getText('privacyPolicy')}
              </Link>
              <Link to="/terms" className="small text-secondary text-decoration-none">
                {getText('termsOfService')}
              </Link>
              <Link to="/contact" className="small text-secondary text-decoration-none">
                {getText('contactUs')}
              </Link>
              <Link to="/help" className="small text-secondary text-decoration-none">
                {getText('helpSupport')}
              </Link>
              <Link to="/community-health" className="small text-secondary text-decoration-none">
                <span className="badge bg-success me-1">New</span>
                {language === 'en' ? 'Community Health' : 
                 language === 'af' ? 'Gemeenskap Gesondheid' : 
                 language === 'zu' ? 'Impilo Yomphakathi' : 
                 language === 'xh' ? 'Impilo Yoluntu' : 'Community Health'}
              </Link>
            </div>
            
            {/* Copyright */}
            <div className="mt-3 text-center text-md-end small text-muted">
              <p className="mb-0">© {currentYear} CareConnect SA. {getText('allRightsReserved')}.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
