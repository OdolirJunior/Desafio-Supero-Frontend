import React from "react";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import "./FindIconButton.css";
class FinishTaskIconButton extends React.Component {
  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            <FaSearch />
          </span>
        </div>
        <input
          name="search"
          type="text"
          maxLength="200"
          onChange={this.props.searchInput}
          className="form-control"
          placeholder="Buscar (digite o titulo)"
        />
        <div className="input-group-append">
          <button
            onClick={this.props.handleFindOne}
            className="btn-group"
            id="basic-addon1"
          >
            Buscar
          </button>
        </div>

        <button
          className="btn-group"
          onClick={this.props.refresh}
          title="Atualizar lista"
        >
          <FaRedoAlt />
        </button>
      </div>
    );
  }
}
export default FinishTaskIconButton;
