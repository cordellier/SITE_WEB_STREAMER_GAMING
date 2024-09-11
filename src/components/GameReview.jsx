import { FaStar, FaPlus, FaMinus, FaShare, FaShoppingCart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { gameReviewsData } from '../javascript/data/gameReviewsData';
import ContentTitleCenter from "../components/ContentTitleCenter";

const GameReview = () => {
  const { gameId } = useParams();
  const game = gameReviewsData.find(g => g.id === gameId);

  if (!game) return <div>Critique non trouvée</div>;

  return (
    <div className="game-review">
      <ContentTitleCenter
        subtitle="Explorez des expériences vidéoludiques"
        title={game.title}
        description=""
      />
      <header className="game-header" style={{backgroundImage: `url(${game.coverImage})`}}>
      </header>

      <section className="video-section">
        <iframe 
          src={game.videoUrl} 
          title={`${game.title} gameplay`} 
          frameBorder="0" 
          allowFullScreen
        ></iframe>
        <button className="cta-button">Vidéo Avis & Tests</button>
      </section>

      <section className="game-summary">
        <h2>Résumé du jeu</h2>
        <p>{game.summary}</p>
      </section>

      <section className="pros-cons">
        <div className="pros">
          <h3><FaPlus /> Points forts</h3>
          <ul>
            {game.pros.map((pro, index) => (
              <li key={index}>{pro}</li>
            ))}
          </ul>
        </div>
        <div className="cons">
          <h3><FaMinus /> Points faibles</h3>
          <ul>
            {game.cons.map((con, index) => (
              <li key={index}>{con}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rating">
        <h2>Note globale</h2>
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <FaStar key={index} className={index < Math.floor(game.rating) ? 'filled' : ''} />
          ))}
        </div>
        <span className="rating-value">{game.rating}/5</span>
      </section>

      <section className="conclusion">
        <h2>Conclusion</h2>
        <p>{game.conclusion}</p>
      </section>

      <footer className="review-footer">
        <button className="share-button"><FaShare /> Partager</button>
        <a href={game.purchaseLink} className="purchase-button"><FaShoppingCart /> Acheter le jeu</a>
      </footer>
    </div>
  );
};

export default GameReview;
