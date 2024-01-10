import React, { Component } from "react";

export default class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ["Just some demo tasks", "As an example"],
      inputVal: "",
      editTodos: [],
      editVal: "",
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleInputEdit = this.handleInputEdit.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInput(e) {
    this.setState((state) => ({ ...state, inputVal: e.target.value }));
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState((state) => ({
      ...state,
      todos: [...state.todos, state.inputVal],
      inputVal: "",
    }));
  }

  deleteToDo(e) {
    const targetId = e.target.id;
    const arr = [...this.state.todos];
    arr.splice(targetId, 1);

    this.setState((state) => ({
      ...state,
      todos: [...arr],
    }));
  }

  handleEdit(e) {
    const targetId = +e.target.id;
    const targetArr = [targetId];

    const val = this.state.todos[targetId];

    this.setState((state) => ({
      ...state,
      editTodos: state.editTodos.concat(targetArr),
      editVal: val,
    }));
  }

  handleInputEdit(e) {
    this.setState((state) => ({
      ...state,
      editVal: e.target.value,
    }));
  }

  handleResubmit(e) {
    const targetId = +e.target.id;

    const allTodos = [...this.state.todos];
    allTodos[targetId] = this.state.editVal;

    this.setState((state) => ({
      ...state,
      todos: allTodos,
      editVal: "",
      editTodos: [],
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a Task:</label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInput}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All Todos</h4>
        {/* All todos displayed in a list */}
        <ul>
          {this.state.todos.map((item) => (
            <div key={item} className="item-block">
              {this.state.editTodos.includes(this.state.todos.indexOf(item)) ? (
                <>
                  <input
                    type="text"
                    id={this.state.todos.indexOf(item)}
                    value={this.state.editVal}
                    onChange={this.handleInputEdit}
                  />
                  <button
                    id={this.state.todos.indexOf(item)}
                    onClick={this.deleteToDo}
                  >
                    Delete
                  </button>
                  <button
                    id={this.state.todos.indexOf(item)}
                    onClick={this.handleResubmit}
                  >
                    Resubmit
                  </button>
                </>
              ) : (
                <>
                  <li>{item}</li>
                  <button
                    id={this.state.todos.indexOf(item)}
                    onClick={this.deleteToDo}
                  >
                    Delete
                  </button>
                  <button
                    id={this.state.todos.indexOf(item)}
                    onClick={this.handleEdit}
                  >
                    Edit
                  </button>
                </>
              )}
            </div>
          ))}
        </ul>
      </section>
    );
  }
}
