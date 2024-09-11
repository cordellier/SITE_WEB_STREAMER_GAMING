import PropTypes from 'prop-types';

const ContentTitleCenter = ({ subtitle, title, description }) => {
  return (
    <div className="content-title-center">
      <div className="text-content">
        <p className="subtitle">{subtitle}</p>
        <h2 className="title">{title}</h2>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

ContentTitleCenter.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ContentTitleCenter;