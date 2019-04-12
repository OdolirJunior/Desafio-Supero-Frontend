import React from "react";
import { FaCheck } from "react-icons/fa";

class FinishTaskIconButton extends React.Component {
  render() {
    return (
      <button
        className="btn"
        onClick={this.props.handleFinishTask}
        title="Concluir tarefa"
      >
        <FaCheck />
      </button>
    );
  }
}
export default FinishTaskIconButton;
