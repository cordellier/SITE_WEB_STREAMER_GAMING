import { useInView } from 'react-intersection-observer';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="about-container">
      <div className={`content ${inView ? 'animate' : ''}`} ref={ref}>
        <div className="image-container">
          <img 
            src="../assets/images/Drunge_profil.jpg" 
            alt="Profil drunge" 
            className="depth-effect"
          />
        </div>
        <div className="text-content">
          <p className="subtitle">Du Pixel à la Passion</p>
          <h2 className="title">L'Odyssée de Drunge</h2>
          <p className="description">
          De passionné de jeux vidéo à créateur de communautés, mon voyage sur Twitch est une aventure où chaque niveau franchi est une victoire partagée avec vous. Rejoignez-moi dans cette quête épique pour redéfinir ce que signifie jouer ensemble.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;