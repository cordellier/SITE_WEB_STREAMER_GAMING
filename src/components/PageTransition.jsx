import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../assets/styles/components/_PageTransition.scss';

const PageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 2000); // Durée totale de la transition

    return () => clearTimeout(timer);
  }, [location]);

  if (!isTransitioning) return null;

  return (
    <div className="page-transition">
      <div className="loader">
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
        <div className="bar4"></div>
        <div className="bar5"></div>
        <div className="bar6"></div>
      </div>
    </div>
  );
};

export default PageTransition;