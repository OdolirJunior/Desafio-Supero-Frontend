import React, { Component } from "react";
import NavBar from "../../Components/NavBar";
import ModalTodo from "./ModalTodo";
import Groups from "../Groups/Groups";
import DeleteIconButton from "../../Components/DeleteIconButton";
import UpdateIconButton from "../../Components/UpdateIconButton";
import FinishTaskIconButton from "../../Components/FinishTaskIconButton";
import "./Todo.css";
const API = "/todos";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      todos: [],
      todo: {
        title: "",
        content: "",
        status: false,
        createdAt: 0,
        updatedAt: 0
      },
      group: {
        title: ""
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
  handleSubmitGroup = () => {};

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
    const todoSearchItem = this.state.todos.filter(item => item.title === search);
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
        <NavBar />
        <Groups
          group={this.state.group}
          submit={this.handleSubmit}
          onChangeModal={this.onChangeModal}
          handleOpenModal={e => this.handleOpenModal(e)}
          handleCloseModal={e => this.handleCloseModal(e)}
          open={this.state.open}
        />
        <ModalTodo
          todo={this.state.todo}
          submit={this.handleSubmitGroup}
          onChangeModal={this.onChangeModal}
          handleOpenModal={e => this.handleOpenModal(e)}
          handleCloseModal={e => this.handleCloseModal(e)}
          open={this.state.open}
        />

        <div className="div-todos">
          {todos.length > 0 &&
            todos.map((row, index) => (
              <div class="card">
                <div class="container">
                  {!row.status ? "Pendente" : "Concluído"}
                  <h4>{row.title}</h4>
                  <FinishTaskIconButton handleFinishTask={e => this.handleFinishTask(row.id, e)} />
                  <DeleteIconButton onClick={e => this.handleDelete(row.id, e)} />
                  <UpdateIconButton handleOpenUpdate={e => this.handleOpenUpdate(row.id, e)} ariaLabel="Editar" />
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Todo;
