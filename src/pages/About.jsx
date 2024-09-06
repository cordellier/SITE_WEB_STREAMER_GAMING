import ContentBlock from '../components/ContentBlock';
import Timeline from '../components/Timeline';
import PhotoDrunge from '../assets/images/Drunge_aventurier.jpg';

const About = () => {
  return (
    <div className="about-page">
      <ContentBlock 
        imageSrc={PhotoDrunge}
        imageAlt="Profil Drunge"
        subtitle="Du Pixel à la Passion"
        title="L'épopée de Drunge"
        description="De joueur passionné à créateur de communautés, mon aventure sur Twitch est une quête où chaque victoire est la nôtre. Rejoignez-moi dans cette épopée pour redéfinir le jeu ensemble."
      />
      <Timeline />
    </div>
  );
};

export default About;