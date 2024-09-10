import ContentBlock from '../components/ContentBlock';
import SocialIcons from '../components/SocialIcons';
import SetupDrunge from '../assets/images/Setup/setup_drunge.jpg';
import BlobImage from '../components/SVGblob';

const setupItems = [
  { name: "Processeur", description: "Ryzen 7800x3D", image: "/src/assets/images/Setup/Ryzen.jpg" },
  { name: "RAM", description: "32gb DDR5 @6000Mhz", image: "/src/assets/images/Setup/32gb.webp" },
  { name: "Carte Graphique", description: "RTX 4070ti Super", image: "/src/assets/images/Setup/RTX.jpg" },
  { name: "SSD", description: "Samsung 990 pro 2to", image: "/src/assets/images/Setup/Samsung.jpg" },
  { name: "Carte d'acquisition", description: "Elgato 4K X", image: "/src/assets/images/Setup/Elgato.jpg" },
  { name: "Clavier", description: "Dygma Raise", image: "/src/assets/images/Setup/Dygma.png" },
  { name: "Souris", description: "Razer Viper Ultimate", image: "/src/assets/images/Setup/Razer.jpg" },
  { name: "Casque", description: "Beyerdynamic DT 990 pro 80ohm", image: "/src/assets/images/Setup/Beyerdynamic.webp" },
  { name: "Ecran principal", description: "Alienware QD-OLED AW2725DF 360hz 2K", image: "/src/assets/images/Setup/Alienware.jpg" },
  { name: "Caméra", description: "Sony a6300", image: "/src/assets/images/Setup/Sony.jpg" },
  { name: "Adaptateur Caméra", description: "Elgato cam link", image: "/src/assets/images/Setup/Adaptateur-Elgato-Cam-Link-4K-Noir.jpg" },
  { name: "Microphone", description: "Shure SM7B + GoXLR", image: "/src/assets/images/Setup/Shure SM7B.jpg" },
];

const SetupItem = () => {
  return (
    <div className="setup-page">
      <div className="blob-container">
        <BlobImage imageSrc={SetupDrunge} />
      </div>
      <ContentBlock 
        subtitle="Mon équipement de streaming"
        title="Setup de Drunge"
        description="Découvrez l'équipement que j'utilise pour créer du contenu de qualité et interagir avec ma communauté."
      />
      <div className="equipment-grid">
        {setupItems.map((item, index) => (
          <div key={index} className="equipment-item">
            <img src={item.image} alt={item.name} className="equipment-image" />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <SocialIcons />
    </div>
  );
};

export default SetupItem;