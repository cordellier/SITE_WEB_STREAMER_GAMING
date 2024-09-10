import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Button from "./Button";
import "../assets/styles/components/_NavBar.scss";
import hoverSoundSrc from "../assets/sounds/hover_4_button.mp3";
import clickSoundSrc from "../assets/sounds/clik_3_button.mp3";
import logo from "../assets/images/Elizabeth_de_Gintama.png";
import ContactForm from "./ContactForm";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [showScrollNav, setShowScrollNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const audioContextRef = useRef(null);
  const hoverSoundBufferRef = useRef(null);
  const clickSoundBufferRef = useRef(null);

  const navItems = [
    { name: "CRITIQUES", hasDropdown: false, path: "/reviews" },
    { name: "TOP JEUX", hasDropdown: false, path: "/top-games" },
    { name: "SORTIES ATTENDUES", hasDropdown: false, path: "/upcoming" },
    { 
      name: "A PROPOS", 
      hasDropdown: true, 
      path: "/about",
      dropdownItems: [
        { name: "Setup", path: "/about/setup" },
        { name: "Collaboration", path: "/about/collaboration" }
      ]
    },
    { name: "CONTACT", hasDropdown: false, path: "/contact" },
  ];

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();

    const loadSound = async (url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      return await audioContextRef.current.decodeAudioData(arrayBuffer);
    };

    Promise.all([
      loadSound(hoverSoundSrc),
      loadSound(clickSoundSrc)
    ]).then(([hoverBuffer, clickBuffer]) => {
      hoverSoundBufferRef.current = hoverBuffer;
      clickSoundBufferRef.current = clickBuffer;
    });

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100 && currentScrollY < lastScrollY) {
        setShowScrollNav(true);
      } else if (currentScrollY <= 30 || currentScrollY > lastScrollY) {
        setShowScrollNav(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const playSound = (buffer) => {
    if (!isMuted && audioContextRef.current && buffer) {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  };

  const handleMouseEnter = (itemName) => {
    setHoveredItem(itemName);
    playSound(hoverSoundBufferRef.current);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleClick = () => {
    playSound(clickSoundBufferRef.current);
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

  const handleContactClick = (e) => {
    e.preventDefault();
    handleClick();
    setIsContactFormOpen(true);
  };

  const handleDropdownEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    setIsDropdownOpen(false);
  };

  const handleDropdownItemHover = () => {
    playSound(hoverSoundBufferRef.current);
  };

  const getNavbarClass = () => {
    if (location.pathname.startsWith('/about/setup')) {
      return 'navbar setup-page';
    }
    if (location.pathname === '/about') {
      return 'navbar about-page';
    }
    if (location.pathname === '/contact') {
      return 'navbar contact-page';
    }
    return 'navbar';
  };

  const renderNavContent = (isScrollNav = false) => (
    <div className={`nav ${isScrollNav ? 'scroll-nav' : ''}`}>
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
          onMouseEnter={() => playSound(hoverSoundBufferRef.current)}
        >
          ▶ Live Stream
        </Button>
      </div>
      <div className="nav-items">
        {navItems.map((item) => (
          <div 
            key={item.name} 
            className="nav-item-wrapper"
            onMouseEnter={item.hasDropdown ? handleDropdownEnter : () => {}}
            onMouseLeave={item.hasDropdown ? handleDropdownLeave : () => {}}
          >
            <Link to={item.path}>
              <Button
                variant="nav"
                onMouseEnter={() => handleMouseEnter(item.name)}
                onMouseLeave={handleMouseLeave}
                onClick={item.name === "CONTACT" ? handleContactClick : handleClick}
                className={`navbar__item ${hoveredItem === item.name ? "hovered" : ""}`}
              >
                {item.name}
                {item.hasDropdown && <span className="navbar__dropdown-arrow">▼</span>}
              </Button>
            </Link>
            {item.hasDropdown && isDropdownOpen && (
              <div className="dropdown-menu">
                {item.dropdownItems.map((dropdownItem) => (
                  <Link 
                    key={dropdownItem.name} 
                    to={dropdownItem.path}
                    className="dropdown-item"
                    onClick={handleClick}
                    onMouseEnter={handleDropdownItemHover}
                  >
                    {dropdownItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
        <button className="navbar__volume-control" onClick={toggleMute}>
          {isMuted ? "🔇" : "🔊"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <nav className={getNavbarClass()}>
        {renderNavContent()}
      </nav>
      {showScrollNav && (
        <nav className="navbar scroll-navbar">
          {renderNavContent(true)}
        </nav>
      )}
      <ContactForm isOpen={isContactFormOpen} onClose={() => setIsContactFormOpen(false)} />
    </>
  );
};

export default Navbar;