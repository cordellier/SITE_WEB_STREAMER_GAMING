/* HEADER.JSX */

import Button from '../components/Button';
import HeroTitle from '../components/HeroTitle';
import SocialIcons from '../components/SocialIcons';

const Hero = () => {
  return (
      <section className="hero">
        <div className="hero-content">
          <HeroTitle 
            title="Drunge"
            subtitle="Critique de jeux vidéos"
            additionalInfo="Streamer passionné depuis 10 ans"
          />
          <Button variant="action" className="watch-trailer-button">
            ▶ WATCH TRAILER
          </Button>
          <div className="hero-gaming">
            <h3>Streamer</h3>
            <h1>GAMING</h1>
            <SocialIcons />
          </div>
        </div>
      </section>
  );
};

export default Hero;
