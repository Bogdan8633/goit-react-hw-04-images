import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.unplugModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.unplugModal);
  }

  unplugModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    const { children } = this.props;
    const { unplugModal } = this;

    return createPortal(
      <div className={styles.Overlay} onClick={unplugModal}>
        <div className={styles.Modal}>{children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  close: PropTypes.func.isRequired,
};
