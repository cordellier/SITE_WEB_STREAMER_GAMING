import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '.././src/assets/styles/pages/App.scss';
import Navbar from '../src/components/Navbar';
import Header from '../src/layout/Header';
import '@fortawesome/fontawesome-free/css/all.min.css';
import About from './pages/About';
import TwitchStream from './pages/TwitchStream';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<About />} />
          <Route path="/live-stream" element={<TwitchStream channelName="drunge_" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;