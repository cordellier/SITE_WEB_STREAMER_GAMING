/* SOCIAL ICONS */

const SocialIcons = () => {
  const socialLinks = [
    { href: "https://x.com/Drunge_", icon: "fa-brands fa-x-twitter", label: "X" },
    { href: "https://www.twitch.tv/drunge_", icon: "fab fa-twitch", label: "Twitch" },
    { href: "https://www.youtube.com/@Drunge_", icon: "fab fa-youtube", label: "YouTube" },
  ];

  return (
    <section className="social-icons">
      <ul className="icon-list">
        {socialLinks.map((link) => (
          <li key={link.href} className="icon-item">
            <a href={link.href} className="icon-link" target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              <i className={link.icon}></i>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SocialIcons;
