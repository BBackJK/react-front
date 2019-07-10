import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';

import Button from '../Button/Button';
import './Modals.css';

const Modals = ({ link, title, contents, visible, tag }) => (
  <section>
    <Modal visible={visible} width="400" height="300" effect="fadeInUp">
      <div className="modal-main">
        <br />
        <br />
        <h1 className="modal-title">{title}</h1>
        <br />
        <br />
        <br />
        {tag === 'register' ? (
          <a href={link} className="modal-link">
            {contents}
          </a>
        ) : (
          <Link to={link} className="modal-link">
            {contents}
          </Link>
        )}
      </div>
    </Modal>
  </section>
);

Modals.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  tag: PropTypes.string,
};

export default Modals;
