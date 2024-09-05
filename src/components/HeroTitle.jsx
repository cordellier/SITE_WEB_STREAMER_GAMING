/* HERO TITLE.JSX */

import PropTypes from 'prop-types';

const HeroTitle = ({ title, subtitle, additionalInfo }) => {
  return (
    <div className="hero-text">
      <h1 className="hero-title">{title}</h1>
      <p className="hero-subtitle">{subtitle}</p>
      {additionalInfo && <p className="hero-subtitle">{additionalInfo}</p>}
    </div>
  );
};

HeroTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired, 
  additionalInfo: PropTypes.string, 
};

export default HeroTitle;
