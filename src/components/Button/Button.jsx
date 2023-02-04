import PropTypes from 'prop-types';
import styles from './button.module.css';

const Button = ({ onloadMore }) => {
  return (
    <button type="button" className={styles.Button} onClick={onloadMore}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
