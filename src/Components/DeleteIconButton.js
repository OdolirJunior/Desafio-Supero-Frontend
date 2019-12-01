import React from "react";
import { FaTrash } from "react-icons/fa";
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
        <button
          className="btn"
          onClick={this.props.onClick}
          title="Deletar tarefa"
        >
          <FaTrash />
        </button>
    );
  }
}

export default DeleteIconButton;
