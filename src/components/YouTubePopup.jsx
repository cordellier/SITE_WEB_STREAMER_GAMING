import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/components/_YouTubePopup.scss';
import hoverSound from '../assets/sounds/hover_4_button.mp3';
import closeSound from '../assets/sounds/clik_3_button.mp3';
import expandSound from '../assets/sounds/clik_3_button.mp3';

const YouTubePopup = ({ videoId, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const hoverSoundRef = useRef(new Audio(hoverSound));
  const closeSoundRef = useRef(new Audio(closeSound));
  const expandSoundRef = useRef(new Audio(expandSound));

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    closeSoundRef.current.play();
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsExpanded(false);
      setIsClosing(false);
    }, 500);
  };

  const toggleExpand = () => {
    expandSoundRef.current.play();
    setIsExpanded(!isExpanded);
  };

  const playHoverSound = () => {
    hoverSoundRef.current.currentTime = 0;
    hoverSoundRef.current.play();
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div className={`youtube-popup-overlay ${isExpanded ? 'expanded' : ''} ${isClosing ? 'closing' : ''}`}>
      <div className={`youtube-popup-container ${isExpanded ? 'expanded' : ''}`}>
        <button className="close-button" onClick={handleClose} onMouseEnter={playHoverSound}>&times;</button>
        <button className="expand-button" onClick={toggleExpand} onMouseEnter={playHoverSound}>
          {isExpanded ? '⇲' : '⇱'}
        </button>
        <div className="youtube-embed">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            style={{ border: 0 }}
            title={`YouTube video player - ${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

YouTubePopup.propTypes = {
  videoId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default YouTubePopup;
