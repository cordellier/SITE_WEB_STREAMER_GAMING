import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gameReviewsData } from "../javascript/data/gameReviewsData";
import { getImageUrl } from "../javascript/utils/imageHelper";
import ContentTitleCenter from "../components/ContentTitleCenter";

const GameReviewsGrid = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredGames, setFilteredGames] = useState([]);
  const [gameImages, setGameImages] = useState({});
  const searchInputRef = useRef(null);

  useEffect(() => {
    const loadImages = async () => {
      const images = {};
      for (const game of gameReviewsData) {
        images[game.id] = await getImageUrl(game.coverImage);
      }
      setGameImages(images);
    };

    loadImages();
  }, []);

  useEffect(() => {
    const results = gameReviewsData.filter((game) =>
      game.title.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredGames(results);
  }, [searchTerm]);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
    <div className="game-reviews-container">
      <ContentTitleCenter
        subtitle="Explorez des expériences vidéoludiques"
        title="tests & critiques"
        description="Découvrez les avis authentiques et passionnés du streamer Drunge sur les dernières sorties et classiques du jeu vidéo. Ici, chaque jeu est passé au crible pour vous offrir une analyse claire, impartiale, et engageante. Rejoignez la communauté des gamers avertis et partagez vos opinions dans une atmosphère de respect et d'échange."
      />
      <div className="search-bar-container">
        <input
          ref={searchInputRef}
          type="text"
          className="search-bar"
          placeholder="Rechercher un jeu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="games-grid">
        {filteredGames.map((game) => (
          <Link to={`/reviews/${game.id}`} key={game.id} className="game-tile">
            {gameImages[game.id] && (
              <img src={getImageUrl(game.coverImage)} alt={game.title} />
            )}
            <div className="game-info">
              <h3>{game.title}</h3>
              <span className="rating">{game.rating}/5</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameReviewsGrid;
