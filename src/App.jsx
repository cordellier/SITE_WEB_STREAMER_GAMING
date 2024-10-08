import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '.././src/assets/styles/pages/App.scss';
import Navbar from '../src/components/Navbar';
import Header from '../src/layout/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import About from './pages/About';
import SetupItem from './pages/SetupItem';
import TwitchStream from './pages/TwitchStream';
import PageTransition from './components/PageTransition';
import GameReview from './components/GameReview';
import GameReviewsGrid from './pages/GameReviewsGrid';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <PageTransition />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/setup" element={<SetupItem />} />
          <Route path="/live-stream" element={<TwitchStream channelName="drunge_" />} />
          <Route path="/reviews" element={<GameReviewsGrid />} />
          <Route path="/reviews/:gameId" element={<GameReview />} /> {/* Utilisez GameReview ici */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;