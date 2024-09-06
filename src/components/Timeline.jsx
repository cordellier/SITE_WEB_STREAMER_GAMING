import { useRef } from 'react';
import useTimeline from '../javascript/useTimeline';
import '../assets/styles/components/_Timeline.scss';

const Timeline = () => {
  const timelineRef = useRef(null);
  const [activePeriodIndex, activeCardIndex] = useTimeline(timelineRef);

  const periods = [
    { year: "2018-2019", title: "Débuts sur Twitch", description: "Lancement de ma chaîne Twitch et premiers streams réguliers." },
    { year: "2020-2021", title: "Croissance de la communauté", description: "Expansion de la communauté et diversification du contenu." },
    { year: "2022-Présent", title: "Collaborations et événements", description: "Partenariats avec d'autres streamers et organisation d'événements communautaires." }
  ];

  const cards = [
    { year: "2018", title: "Premier stream", content: "Mon tout premier stream sur Twitch, jouant à mon jeu favori devant une poignée de spectateurs." },
    { year: "2020", title: "1000 followers", content: "Célébration de mon 1000ème follower avec un stream spécial de 12 heures." },
    { year: "2022", title: "Premier événement communautaire", content: "Organisation du premier tournoi en ligne pour ma communauté, avec des prix sponsorisés." }
  ];

  return (
    <div className="pres-timeline" id="drunge-timeline" ref={timelineRef}>
      <div className="periods-container">
        {periods.map((period, index) => (
          <section key={index} className={`period-single ${index === activePeriodIndex ? 'active' : ''}`} period={`period${index + 1}`}>
            <h4 className="year">{period.year}</h4>
            <h2 className="title">{period.title}</h2>
            <p>{period.description}</p>
          </section>
        ))}
      </div>
      <div className="timeline-container">
        <div className="timeline">
          <ol>
            {periods.map((_, index) => (
              <li key={index} period={`period${index + 1}`} className={index === activeCardIndex ? 'active' : ''}></li>
            ))}
          </ol>
        </div>
        <div className="btn-back">
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h30v30H0z"/>
            <path fill="#D8D8D8" fillRule="evenodd" d="M11.828 15l7.89-7.89-2.83-2.828L6.283 14.89l.11.11-.11.11L16.89 25.72l2.828-2.83"/>
          </svg>
        </div>
        <div className="btn-next">
          <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path fill="none" d="M0 0h30v30H0z"/>
            <path fill="#D8D8D8" fillRule="evenodd" d="M18.172 14.718l-7.89-7.89L13.112 4l10.606 10.607-.11.11.11.11-10.608 10.61-2.828-2.83 7.89-7.89"/>
          </svg>
        </div>
      </div>
      <div className="cards-container">
        {cards.map((card, index) => (
          <section key={index} className={`card-single ${index === activeCardIndex ? 'active' : ''}`} period={`period${index + 1}`}>
            <h4 className="year">{card.year}</h4>
            <h2 className="title">{card.title}</h2>
            <div className="content">
              <img src={`/api/placeholder/400/300?text=${card.title}`} alt={card.title} />
              <p>{card.content}</p>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Timeline;