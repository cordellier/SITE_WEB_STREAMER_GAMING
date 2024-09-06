import PropTypes from 'prop-types';
import { useInView } from 'react-intersection-observer';
import '../assets/styles/components/_ContentBlock.scss'; 

const ContentBlock = ({ imageSrc, imageAlt, subtitle, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="content-block">
      <div className={`content ${inView ? 'animate' : ''}`} ref={ref}>
        <div className="image-container">
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="depth-effect"
          />
        </div>
        <div className="text-content">
          <p className="subtitle">{subtitle}</p>
          <h2 className="title">{title}</h2>
          <p className="description">{description}</p>
        </div>
      </div>
    </div>
  );
};

// Définition des PropTypes
ContentBlock.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ContentBlock;
