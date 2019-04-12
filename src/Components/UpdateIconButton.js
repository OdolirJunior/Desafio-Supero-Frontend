import React from "react";
import { FaPen } from "react-icons/fa";

class UpdateIconButton extends React.Component {
  render() {
    return (
      <button
        className="btn"
        onClick={this.props.handleOpenUpdate}
        title="Editar tarefa"
      >
        <FaPen />
      </button>
    );
  }
}
export default UpdateIconButton;
