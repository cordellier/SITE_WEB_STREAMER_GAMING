import PropTypes from 'prop-types';
import '../assets/styles/pages/TwitchStream.scss';

const TwitchStream = ({ channelName = 'drunge_' }) => {
  return (
    <div className="twitch-stream-page">
      <div className="stream-container">
        <iframe
          src={`https://player.twitch.tv/?channel=${channelName}&parent=${window.location.hostname}`}
          height="480"
          width="800"
          allowFullScreen
          style={{ border: 'none' }}
          title="Twitch stream player"
        />
      </div>
      <div className="chat-container">
        <iframe
          src={`https://www.twitch.tv/embed/${channelName}/chat?parent=${window.location.hostname}&darkpopout`}
          height="480"
          width="350"
          style={{ border: 'none' }}
          title="Twitch chat"
        />
      </div>
    </div>
  );
};

TwitchStream.propTypes = {
  channelName: PropTypes.string,
};

export default TwitchStream;