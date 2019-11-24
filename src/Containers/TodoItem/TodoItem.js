import React from "react";
import Modal from "react-modal";
import AddIconButton from "../../Components/AddIconButton";
import "./TodoItem.css";
class ModalTodo extends React.Component {
  render() {
    const { todoItem, submit, onChangeModal, handleOpenModal, handleCloseModal, open } = this.props;

    return (
      <div className="todo-item-div">
        <AddIconButton handleOpen={handleOpenModal} />
        <Modal isOpen={open}>
          <h4>Adicionar item do todo</h4>
          <div>
            <div className="form-group">
              <input
                placeholder="Titulo"
                className="form-control"
                type="text"
                maxLength="45"
                required
                name="title"
                value={todoItem.title}
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
                value={todoItem.content}
                onChange={event => onChangeModal(event)}
              />
            </div>
          </div>
          <div>
            <button color="secondary" onClick={handleCloseModal}>
              CANCELAR
            </button>
            <button color="primary" onClick={submit} disabled={!todoItem.title}>
              SALVAR
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalTodo;
