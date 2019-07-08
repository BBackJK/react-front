import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Modal from 'react-awesome-modal';

import './Modals.css';

const Modals = ({ link, title, contents, visible }) => (
  <section>
    <Modal visible={visible} width="400" height="300" effect="fadeInUp">
      <div className="modal-main">
        <br />
        <br />
        <h1 className="modal-title">{title}</h1>
        <br />
        <br />
        <br />
        <Link to={link} className="modal-link">
          {contents}
        </Link>
      </div>
    </Modal>
  </section>
);

Modals.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default Modals;
