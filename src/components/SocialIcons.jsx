/* SOCIAL ICONS */

import React, { useEffect, useRef } from 'react';
import hoverSound from "../assets/sounds/hover_4_button.mp3";
import clickSound from "../assets/sounds/clik_3_button.mp3";

const SocialIcons = () => {
  const hoverAudioRef = useRef(null);
  const clickAudioRef = useRef(null);

  const socialLinks = [
    { href: "https://x.com/Drunge_", icon: "fa-brands fa-x-twitter", label: "X" },
    { href: "https://www.twitch.tv/drunge_", icon: "fab fa-twitch", label: "Twitch" },
    { href: "https://www.youtube.com/@Drunge_", icon: "fab fa-youtube", label: "YouTube" },
  ];

  useEffect(() => {
    hoverAudioRef.current = new Audio(hoverSound);
    clickAudioRef.current = new Audio(clickSound);
  }, []);

  const playHoverSound = () => {
    if (hoverAudioRef.current) {
      hoverAudioRef.current.currentTime = 0;
      hoverAudioRef.current.play().catch(error => console.error("Error playing hover sound:", error));
    }
  };

  const playClickSound = () => {
    if (clickAudioRef.current) {
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.play().catch(error => console.error("Error playing click sound:", error));
    }
  };

  return (
    <section className="social-icons">
      <ul className="icon-list">
        {socialLinks.map((link) => (
          <li key={link.href} className="icon-item">
            <a
              href={link.href}
              className="icon-link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              onMouseEnter={playHoverSound}
              onClick={playClickSound}
            >
              <i className={link.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SocialIcons;