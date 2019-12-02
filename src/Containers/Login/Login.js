import React, { Component } from "react";
import NavBarUnlogged from "../../Components/NavBarUnlogged";
import Modal from "react-modal";
import "./Logins.css";
const API = "/users";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false , user:{
      username:'', senha:''
    }};
  }

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
    this.setState({ todo: {} });
  };

  submit() {
    try {
      await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      await this.findAllItem();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    return (
      <div>
        <NavBarUnlogged />

        <div>
          <br />
          <h1 className="center">Bem vindo!</h1>
          <h2 className="center">Faça login para acessar seus grupos.</h2>
          <br />
          <h4 className="center">Ou cadastre-se:</h4>
        </div>

        <div className="center">
          <button color="secondary" className="botaoabrircadastro" onClick={() => this.handleOpenModal()}>
            Cadastrar
          </button>
        </div>

        <Modal isOpen={this.state.open}>
          <div>
            <h1>Cadastro</h1>
            <hr />

            <label htmlFor="email">
              <b>Usuário</b>
            </label>
            <input type="text" maxLength="200" className="cadastrofield" placeholder="Digitar Usuário" name="usuario" required />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input type="password" maxLength="200" className="cadastrofield" placeholder="Digitar Senha" name="psw" required />

            <label htmlFor="psw-repeat">
              <b>Repeat Password</b>
            </label>
            <input type="password" maxLength="200" className="cadastrofield" placeholder="Repetir Senha" name="psw-repeat" required />

            <hr />

            <button type="submit" onClick={() => this.submit()} className="botaocadastro">
              Cadastrar
            </button>
            <button color="secondary" className="botaocancelar" onClick={() => this.handleCloseModal()}>
              CANCELAR
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Login;
