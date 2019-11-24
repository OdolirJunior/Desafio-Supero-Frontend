import React from "react";
import Modal from "react-modal";
import "./Groups.css"

class Groups extends React.Component {
  render() {
    const { group, submit, onChangeModal, handleOpenModal, handleCloseModal, open } = this.props;

    return (
      <div>
        <button color="secondary" className="botaoadicionartodo" onClick={handleOpenModal}>
          ADICIONAR GRUPO
        </button>
        <Modal isOpen={open}>
          <h4>Adicionar Grupo</h4>
          <div className="form-group">
            <input
              placeholder="Titulo"
              className="form-control"
              type="text"
              maxLength="45"
              required
              name="title"
              value={group.title}
              onChange={event => onChangeModal(event)}
            />
          </div>
          <div>
            <button color="secondary" onClick={handleCloseModal}>
              CANCELAR
            </button>
            <button color="primary" onClick={submit} disabled={!group.title}>
              SALVAR
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Groups;
