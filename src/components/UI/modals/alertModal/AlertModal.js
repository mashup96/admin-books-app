import React from 'react';
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const AlertModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpenModal}
      toggle={() => { props.toggleModal() }}
      backdrop={props.isOpenModal}>
      <ModalHeader
        toggle={() => { props.toggleModal() }}>
        {props.title}
      </ModalHeader>
      <ModalBody>
        <div className="content-modal-body mb-3">
          {props.children}
        </div>
        <Button className="pull-right" color="secondary" onClick={() => { props.toggleModal() }}>Cancel</Button>
      </ModalBody>
    </Modal>
  );
};

AlertModal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
};

export default AlertModal;