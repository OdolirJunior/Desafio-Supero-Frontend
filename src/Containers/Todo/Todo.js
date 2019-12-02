import React, { Component } from "react";
import NavBarLogged from "../../Components/NavBarLogged";
import ModalTodo from "./ModalTodo";
import Groups from "../Groups/Groups";
import TodoItem from "../TodoItem/TodoItem";
import DeleteIconButton from "../../Components/DeleteIconButton";
import UpdateIconButton from "../../Components/UpdateIconButton";
import FinishTaskIconButton from "../../Components/FinishTaskIconButton";
import "./Todo.css";
const API = "/todos";
const API_GROUP = "/grouptodos";
const API_GROUP_FIND = "/grouptodosbyuser";
const API_ITEM = "/todositem";

class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
      todos: [],
      items: [],
      todo: {
        title: "",
        content: "",
        status: false,
        groupId: {},
        createdAt: 0,
        updatedAt: 0
      },
      group: {
        title: ""
      },
      todoItem: {
        title: "",
        content: "",
        todoId: {}
      },
      search: "",
      open: false,
      openGroup: false,
      openTodoItem: false
    };
  }

  componentDidMount() {
    this.findAll();
    this.findAllGroup();
    this.findAllItem();
  }

  handleOpenModal = async id => {
    let group = await this.state.groups.filter(item => item.id === id)[0];
    await this.setState({
      todo: {
        ...this.state.todo,
        groupId: group
      }
    });
    await this.setState({ open: true });
  };

  handleCloseModal = () => {
    this.setState({ open: false });
    this.setState({ todo: {} });
  };

  handleOpenModalGroup = () => {
    this.setState({ openGroup: true });
  };

  handleOpenModalItem = async id => {
    let group = await this.state.todos.filter(item => item.id === id)[0];
    await this.setState({
      todoItem: {
        ...this.state.todoItem,
        todoId: group
      }
    });
    await this.setState({ openTodoItem: true });
  };

  handleCloseModalGroup = () => {
    this.setState({ openGroup: false });
    this.setState({ group: {} });
  };
  handleCloseModalItem = () => {
    this.setState({ openTodoItem: false });
    this.setState({ todoItem: {} });
  };

  handleFinishTask = async id => {
    const todoToUpdate = await this.state.todos.filter(item => item.id === id);
    let todo = await todoToUpdate[0];
    todo.status = await true;
    await fetch(`${API}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo)
    }).then(this.findAllGroup());
  };

  onChangeModal = async event => {
    await this.setState({
      todo: {
        ...this.state.todo,
        [event.target.name]: event.target.value
      }
    });
  };
  onChangeModalGroup = event => {
    this.setState({
      group: {
        ...this.state.group,
        [event.target.name]: event.target.value
      }
    });
  };
  onChangeModalItem = event => {
    this.setState({
      todoItem: {
        ...this.state.todoItem,
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
  handleSubmitGroup = async () => {
    let data = {};
    data = this.state.group;
    let id = await "";
    let cookie = (await document.cookie) && document.cookie.split("; ");
    if (cookie && cookie.length > 0) {
      await cookie.forEach(data => {
        if (data.includes("user=")) {
          let info = data.split("=");
          if (info && info[1]) {
            id = info[1];
          }
        }
      });
    }
    if (!!this.state.group.id) {
      await this.handleUpdateGroup(data);
    } else {
      data = await { ...data, userId: id };
      await this.handleSaveGroup(data);
    }
    await this.handleCloseModalGroup();
  };

  handleSubmitItem = () => {
    let data = {};
    data = this.state.todoItem;
    if (!!this.state.todoItem.id) {
      this.handleUpdateItem(data);
    } else {
      this.handleSaveItem(data);
    }
    this.handleCloseModalItem();
  };
  handleUpdateItem(data) {
    fetch(`${API_ITEM}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(this.findAllItem());
  }
  async handleSaveItem(data) {
    data.status = false;
    try {
      await fetch(`${API_ITEM}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      await this.findAllItem();
    } catch (err) {
      console.log(err);
    }
  }

  handleOpenUpdateGroup(id) {
    const todoToUpdate = this.state.groups.filter(item => item.id === id);
    this.setState({ group: todoToUpdate[0] });
    this.handleOpenModalGroup();
  }

  handleUpdateGroup = data => {
    fetch(`${API_GROUP}/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    }).then(this.findAllGroup());
    this.findAllGroup();
  };

  async handleSaveGroup(data) {
    data.status = false;
    try {
      await fetch(`${API_GROUP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      await this.findAllGroup();
    } catch (err) {
      console.log(err);
    }
  }

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
      .then(todos => {
        this.setState({ todos });
      });
  };

  findAllGroup = async () => {
    let id = await "";
    let cookie = (await document.cookie) && document.cookie.split("; ");
    if (cookie && cookie.length > 0) {
      await cookie.forEach(data => {
        if (data.includes("user=")) {
          let info = data.split("=");
          if (info && info[1]) {
            id = info[1];
          }
        }
      });
    }
    await fetch(`${API_GROUP_FIND}/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(groups => this.setState({ groups }));
  };

  findAllItem = () => {
    fetch(API_ITEM, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then(response => response.json())
      .then(items => this.setState({ items }));
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
  handleDeleteGroup(id) {
    fetch(`${API_GROUP}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then(() => {
        this.setState({
          groups: this.state.groups.filter(row => row.id !== id)
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  async handleOpenUpdateItem(id) {
    const todoToUpdate = await this.state.items.filter(item => item.id === id);
    await this.setState({ todoItem: todoToUpdate[0] });
    await this.handleOpenModalItem(todoToUpdate[0].todoId.id);
  }
  async handleOpenUpdate(id) {
    const todoToUpdate = await this.state.todos.filter(item => item.id === id);
    await this.setState({ todo: todoToUpdate[0] });
    await this.handleOpenModal(todoToUpdate[0].groupId.id);
  }

  render() {
    const { todos, groups, items } = this.state;
    return (
      <div>
        <NavBarLogged />
        <Groups
          group={this.state.group}
          submit={this.handleSubmitGroup}
          onChangeModal={this.onChangeModalGroup}
          handleOpenModal={e => this.handleOpenModalGroup(e)}
          handleCloseModal={e => this.handleCloseModalGroup(e)}
          open={this.state.openGroup}
        />
        <div className="div-todos">
          {groups &&
            groups.length > 0 &&
            groups.map((group, index) => (
              <div key={group.id} className="card">
                <div className="container">
                  <h2>{group.title}</h2>
                  <DeleteIconButton onClick={e => this.handleDeleteGroup(group.id, e)} />
                  <UpdateIconButton handleOpenUpdate={e => this.handleOpenUpdateGroup(group.id, e)} ariaLabel="Editar" />
                  <ModalTodo
                    todo={this.state.todo}
                    groups={this.state.groups}
                    submit={this.handleSubmit}
                    onChangeModal={this.onChangeModal}
                    handleOpenModal={() => this.handleOpenModal(group.id)}
                    handleCloseModal={e => this.handleCloseModal(e)}
                    open={this.state.open}
                  />
                  <hr />
                </div>
                {todos &&
                  todos.length > 0 &&
                  todos.map((row, index) =>
                    row.groupId.id === group.id ? (
                      <div key={group.id} className="card-todo">
                        <div className="container">
                          <span className={!row.status ? "tag-status-todo-pendent" : "tag-status-todo-conc"}>
                            {!row.status ? "Pendente" : "Concluído"}
                          </span>
                          <h5>{row.title}</h5>
                          <FinishTaskIconButton handleFinishTask={e => this.handleFinishTask(row.id, e)} />
                          <UpdateIconButton handleOpenUpdate={e => this.handleOpenUpdate(row.id, e)} ariaLabel="Editar" />
                          <TodoItem
                            todoItem={this.state.todoItem}
                            submit={this.handleSubmitItem}
                            onChangeModal={this.onChangeModalItem}
                            handleOpenModal={() => this.handleOpenModalItem(row.id)}
                            handleCloseModal={e => this.handleCloseModalItem(e)}
                            open={this.state.openTodoItem}
                          />
                          {items &&
                            items.length > 0 &&
                            items.map((item, index) =>
                              item.todoId.id === row.id ? (
                                <div className="todo-item-card" key={item.id}>
                                  <hr />
                                  <h6>{item.title}</h6>
                                  <UpdateIconButton handleOpenUpdate={e => this.handleOpenUpdateItem(item.id, e)} ariaLabel="Editar" />
                                  <hr />
                                </div>
                              ) : (
                                ""
                              )
                            )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )
                  )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Todo;
