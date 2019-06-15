import React from 'react';
import PropTypes from "prop-types";
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';

const ConfirmModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpenModal}
      toggle={(event) => { props.toggleDelete(event, null) }}
      backdrop={props.isOpenModal}>
      <ModalHeader
        toggle={(event) => { props.toggleDelete(event, null) }}>
        {props.title}
      </ModalHeader>
      <ModalBody>
        <div className="mb-3">
          {props.children}
        </div>
        <Button color="primary" onClick={() => { props.confirm() }}>
          Confirm
        </Button>
        &nbsp;&nbsp;
        <Button color="secondary" onClick={(event) => { props.toggleDelete(event, null) }}>
          Cancel
        </Button>
      </ModalBody>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  title: PropTypes.string.isRequired,
  isOpenModal: PropTypes.bool.isRequired,
  confirm: PropTypes.func.isRequired,
  toggleDelete: PropTypes.func.isRequired
};

export default ConfirmModal;