import React from "react";
import Modal from "react-modal";
import "./ModalTodo.css";

class ModalTodo extends React.Component {
  render() {
    const { todo, submit, onChangeModal, handleOpenModal, handleCloseModal, open } = this.props;

    return (
      <div>
        <button color="success" size="lg" onClick={handleOpenModal}>
          + ADICIONAR
        </button>
        <Modal isOpen={open}>
          <h4>Adicionar To Do</h4>
          <div>
            <span className={!todo.status ? "tag-status-todo-pendent" : "tag-status-todo-conc"}>{!todo.status ? "Pendente" : "Concluido"}</span>

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
          </div>
          <div>
            <button color="secondary" onClick={handleCloseModal}>
              CANCELAR
            </button>
            <button color="primary" onClick={submit} disabled={!todo.title}>
              SALVAR
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ModalTodo;
