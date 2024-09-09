import { useState, useRef, useEffect } from 'react';
import Button from '../components/Button';
import HeroTitle from '../components/HeroTitle';
import SocialIcons from '../components/SocialIcons';
import YouTubePopup from '../components/YouTubePopup';
import hoverSound from '../assets/sounds/hover_4_button.mp3';
import clickSound from '../assets/sounds/clik_3_button.mp3'; 
import { fetchLatestVideoId } from '../javascript/youtubeFetcher';

const Hero = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [videoId, setVideoId] = useState("_EGLbuy7GzU");
  const hoverSoundRef = useRef(null);
  const clickSoundRef = useRef(new Audio(clickSound));

  useEffect(() => {
    // Précharger le son hover
    const audio = new Audio(hoverSound);
    audio.load();
    hoverSoundRef.current = audio;

    const getLatestVideo = async () => {
      const latestVideoId = await fetchLatestVideoId();
      if (latestVideoId) {
        setVideoId(latestVideoId);
      }
    };

    getLatestVideo();
  }, []);

  const handleOpenPopup = () => {
    clickSoundRef.current.play();
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const playHoverSound = () => {
    if (hoverSoundRef.current) {
      hoverSoundRef.current.currentTime = 0;
      hoverSoundRef.current.play();
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <HeroTitle 
          title="Drunge"
          subtitle="Critique de jeux vidéos"
          additionalInfo="Streamer passionné depuis 10 ans"
        />
        <Button 
          variant="action" 
          className="watch-trailer-button" 
          onClick={handleOpenPopup}
          onMouseEnter={playHoverSound}
        >
          ▶ DERNIÉRE VIDÉO
        </Button>
        <div className="hero-gaming">
          <h3>Streamer</h3>
          <h1>GAMING</h1>
          <SocialIcons />
        </div>
      </div>
      <YouTubePopup 
        videoId={videoId}
        isOpen={isPopupOpen} 
        onClose={handleClosePopup} 
      />
    </section>
  );
};

export default Hero;
