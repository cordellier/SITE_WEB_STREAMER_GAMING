import { useRef } from 'react';
import useTimeline from '../javascript/useTimeline';
import '../assets/styles/components/_Timeline.scss';

const Timeline = () => {
  const timelineRef = useRef(null);
  const [activePeriodIndex, activeCardIndex] = useTimeline(timelineRef);

  const timelineData = [
    { year: "Naissance", title: "Débuts sur Twitch", description: "Lancement de ma chaîne Twitch et premiers streams réguliers." },
    { year: "2020-2021", title: "Croissance de la communauté", description: "Expansion de la communauté et diversification du contenu." },
    { year: "2022-Présent", title: "Collaborations et événements", description: "Partenariats avec d'autres streamers et organisation d'événements communautaires." }
  ];

  return (
    <div className="timeline-container">
      <div className="timeline" ref={timelineRef}>
        <div className="timeline-header">
          <h2>Chronologie de drunge</h2>
          <h1>Des premiers pas jusqu'à l'ère Twitch</h1>
          <p>Découvrez les moments clés qui ont façonné mon parcours.</p>
        </div>
        <div className="timeline-content">
          <div className="timeline-line">
            {timelineData.map((item, index) => (
              <button
                key={item.year}
                className={`timeline-point ${index === activePeriodIndex ? 'active' : ''}`}
                onClick={() => {/* Ajoutez ici la logique pour changer l'index actif */ }}
              />
            ))}
          </div>
          <div className="timeline-cards">
            {timelineData.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-card ${index === activeCardIndex ? 'active' : ''}`}
              >
                <h3>{item.year}</h3>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;