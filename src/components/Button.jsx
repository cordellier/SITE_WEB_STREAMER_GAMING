import PropTypes from 'prop-types';
import '.././assets/styles/components/_button.scss';

const Button = ({ children, variant = 'default', className = '', ...props }) => {
  return (
    <button 
      className={`button ${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
};

export default Button;