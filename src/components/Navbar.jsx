import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import "../assets/styles/components/_NavBar.scss";
import hoverSound from "../assets/sounds/hover_4_button.mp3";
import clickSound from "../assets/sounds/clik_3_button.mp3";
import logo from "../assets/images/Elizabeth_de_Gintama.png";
import ContactForm from "./ContactForm"; // Ajout de l'import du formulaire de contact

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false); // Nouvel état pour le formulaire
  const navigate = useNavigate();
  const location = useLocation();

  const isSpecialPage = location.pathname === '/about' || location.pathname === '/contact';

  const navItems = [
    { name: "CALENDRIER", hasDropdown: false, path: "/calendar" },
    { name: "CRITIQUES", hasDropdown: true, path: "/reviews" },
    { name: "TOP JEUX", hasDropdown: true, path: "/top-games" },
    { name: "SORTIES ATTENDUES", hasDropdown: false, path: "/upcoming" },
    { name: "A PROPOS", hasDropdown: false, path: "/about" },
    { name: "CONTACT", hasDropdown: false, path: "/contact" },
  ];

  const hoverAudio = new Audio(hoverSound);
  const clickAudio = new Audio(clickSound);

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
    if (!isMuted) {
      hoverAudio.play();
    }
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = () => {
    if (!isMuted) {
      clickAudio.play();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleLogoClick = () => {
    handleClick();
    navigate("/");
  };

  const handleLiveStreamClick = () => {
    handleClick();
    navigate("/live-stream");
  };

  // Nouvelle fonction pour gérer le clic sur "CONTACT"
  const handleContactClick = (e) => {
    e.preventDefault();
    handleClick();
    setIsContactFormOpen(true);
  };

  return (
    <>
      <nav className={`Navbar ${isSpecialPage ? (location.pathname === '/about' ? 'about-page' : 'contact-page') : ''}`}>
        <div className="nav">
          <button
            className="navbar__logo"
            onClick={handleLogoClick}
            aria-label="Go to homepage"
          >
            <img src={logo} alt="Site Logo" />
          </button>
          <div className="navbar__live-stream">
            <Button
              variant="nav1"
              onClick={handleLiveStreamClick}
              onMouseEnter={() => !isMuted && hoverAudio.play()}
            >
              ▶ Live Stream
            </Button>
          </div>
          <div className="nav-items">
            {navItems.map((item) => (
              <Link to={item.path} key={item.name}>
                <Button
                  variant="nav"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                  onClick={item.name === "CONTACT" ? handleContactClick : handleClick} // Modification ici
                  className={`navbar__item ${
                    hoveredItem === item.name ? "hovered" : ""
                  }`}
                >
                  {item.name}{" "}
                  {item.hasDropdown && (
                    <span className="navbar__dropdown-arrow">▼</span>
                  )}
                </Button>
              </Link>
            ))}
            <button className="navbar__volume-control" onClick={toggleMute}>
              {isMuted ? "🔇" : "🔊"}
            </button>
          </div>
        </div>
      </nav>
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </>
  );
};

export default Navbar;