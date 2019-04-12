import React, { Component } from "react";
import { Nav, NavItem, Navbar, NavbarBrand, Table } from "reactstrap";
import ModalTodo from "./ModalTodo";
import DeleteIconButton from "./Components/DeleteIconButton";
import UpdateIconButton from "./Components/UpdateIconButton";
import FinishTaskIconButton from "./Components/FinishTaskIconButton";
import FindIconButton from "./Components/FindIconButton";

import "./App.css";
const API = "/todos";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todo: {
        title: "",
        content: "",
        status: false,
        createdAt: 0,
        updatedAt: 0
      },
      search: "",
      open: false
    };
  }

  componentDidMount() {
    this.findAll();
  }

  handleOpenModal = () => {
    this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
    this.setState({ todo: {} });
  };

  handleFinishTask = id => {
    const todoToUpdate = this.state.todos.filter(item => item.id === id);
    let todo = todoToUpdate[0];
    todo.status = true;
    fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    }).then(this.findAll());
  };

  onChangeModal = event => {
    this.setState({
      todo: {
        ...this.state.todo,
        [event.target.name]: event.target.value
      }
    });
  };

  handleSubmit = () => {
    let data = {};
    data = this.state.todo;
    if (!!this.state.todo.id) {
      this.handleUpdate(data);
    } else {
      this.handleSave(data);
    }
    this.handleCloseModal();
  };

  handleUpdate = data => {
    fetch(`${API}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(this.findAll());
  };

  async handleSave(data) {
    data.status = false;
    try {
      await fetch(`${API}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      await this.findAll();
    } catch (err) {
      console.log(err);
    }
  }

  findAll = () => {
    fetch(API, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(todos => this.setState({ todos }));
  };

  handleFindOne = () => {
    const { search } = this.state.search;
    const todoSearchItem = this.state.todos.filter(
      item => item.title === search
    );
    this.setState({
      todos: [todoSearchItem[0]]
    });
  };

  searchInput = event => {
    this.setState({
      search: {
        [event.target.name]: event.target.value
      }
    });
  };

  handleDelete(id) {
    fetch(`${API}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        this.setState({
          todos: this.state.todos.filter(row => row.id !== id)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleOpenUpdate(id) {
    const todoToUpdate = this.state.todos.filter(item => item.id === id);
    this.setState({ todo: todoToUpdate[0] });
    this.handleOpenModal();
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <Navbar color="dark" light expand="md">
          <NavbarBrand className="todo-list-app">
            DESAFIO SUPERO - TODO LIST
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <FindIconButton
                handleFindOne={e => this.handleFindOne(e)}
                searchInput={e => this.searchInput(e)}
                refresh={e => this.findAll(e)}
              />
            </NavItem>
          </Nav>
        </Navbar>
        <ModalTodo
          todo={this.state.todo}
          submit={this.handleSubmit}
          onChangeModal={this.onChangeModal}
          handleOpenModal={e => this.handleOpenModal(e)}
          handleCloseModal={e => this.handleCloseModal(e)}
          open={this.state.open}
        />

        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Titulo</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {todos.length > 0 &&
              todos.map((row, index) => (
                <tr key={row.id}>
                  <th scope="row" width="5%">
                    {index + 1}
                  </th>
                  <td width="30%">{row.title}</td>
                  <td width="40%">{row.content}</td>
                  <td width="10%">{!row.status ? "Pendente" : "Concluído"}</td>
                  <td width="15%">
                    <FinishTaskIconButton
                      handleFinishTask={e => this.handleFinishTask(row.id, e)}
                    />
                    <DeleteIconButton
                      onClick={e => this.handleDelete(row.id, e)}
                    />
                    <UpdateIconButton
                      handleOpenUpdate={e => this.handleOpenUpdate(row.id, e)}
                      ariaLabel="Editar"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
