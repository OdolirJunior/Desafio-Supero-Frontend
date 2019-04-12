import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./ModalTodo.css";
class ModalTodo extends React.Component {
  render() {
    const {
      todo,
      submit,
      onChangeModal,
      handleOpenModal,
      handleCloseModal,
      open
    } = this.props;

    return (
      <div>
        <Button color="success" size="lg" onClick={handleOpenModal}>
          + ADICIONAR
        </Button>
        <Modal isOpen={open} toggle={handleOpenModal}>
          <ModalHeader toggle={handleCloseModal}>
            Adicionar To Do
            <br />
            <span
              className={
                !todo.status
                  ? "tag-status-todo-pendent"
                  : "tag-status-todo-conc"
              }
            >
              {!todo.status ? "Pendente" : "Concluido"}
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <input
                placeholder="Titulo"
                className="form-control"
                type="text"
                maxLength="45"
                required
                name="title"
                value={todo.title}
                onChange={event => onChangeModal(event)}
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Descrição"
                className="form-control"
                type="text-area"
                required
                maxLength="45"
                name="content"
                value={todo.content}
                onChange={event => onChangeModal(event)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleCloseModal}>
              CANCELAR
            </Button>
            <Button color="primary" onClick={submit} disabled={!todo.title}>
              SALVAR
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalTodo;
