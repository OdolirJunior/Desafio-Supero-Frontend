import React from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
class DeleteIconButton extends React.Component {
  state = {
    open: false
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <span>
        <button
          className="btn"
          onClick={this.handleClickOpen}
          title="Deletar tarefa"
        >
          <FaTrash />
        </button>
        <Modal isOpen={this.state.open} toggle={this.handleClickOpen}>
          <ModalHeader toggle={this.handleClose}>Confirmação</ModalHeader>
          <ModalBody>Confirma a exclusão?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.handleClose}>
              CANCELAR
            </Button>
            <Button color="primary" onClick={this.props.onClick}>
              CONFIRMAR
            </Button>
          </ModalFooter>
        </Modal>
      </span>
    );
  }
}

export default DeleteIconButton;
