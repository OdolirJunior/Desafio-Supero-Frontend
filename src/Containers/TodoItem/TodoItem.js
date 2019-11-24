import React from "react";
import Modal from "react-modal";

class ModalTodo extends React.Component {
  render() {
    const { todoItem, submit, onChangeModal, handleOpenModal, handleCloseModal, open, groups } = this.props;

    return (
      <div>
        <button color="success" size="lg" onClick={handleOpenModal}>
          + ADICIONAR ITEM
        </button>
        <Modal isOpen={open}>
          <h4>Adicionar item</h4>
          <div>
            <span className={!todoItem.status ? "tag-status-todo-pendent" : "tag-status-todo-conc"}>
              {!todoItem.status ? "Pendente" : "Concluido"}
            </span>

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
