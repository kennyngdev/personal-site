import React from "react";
import "./App.css";
class App extends React.Component {
  constructor() {
    super();
    this.inputEl = React.createRef();
    this.state = {
      name: "red",
      taskList: [
        { task: "test", done: false },
        { task: "do a task", done: false },
      ],
    };
  }
  addTask(newTask) {
    let list = this.state.taskList;
    list.push(newTask);
    this.setState({ taskList: list });
    this.inputEl.current.value = "";
  }
  finishTask(index) {
    let list = this.state.taskList;
    list[index].done = !list[index].done;
    this.setState({ taskList: list });
  }
  render() {
    const list = this.state.taskList.map((x, index) => {
      return (
        <li
          style={{
            textDecoration: x.done ? "line-through" : "none",
          }}
          onClick={() => {
            this.finishTask(index);
          }}
        >
          {x.task}
        </li>
      );
    });
    const unfinishedTaskCount = this.state.taskList.filter(
      (task) => task.done === false
    ).length;
    const totalTaskCount = this.state.taskList.length;
    return (
      <div>
        <h1>
          {unfinishedTaskCount} remaining out of {totalTaskCount} tasks
        </h1>
        <input placeholder="Enter Your Task" ref={this.inputEl}></input>
        <button
          onClick={() => {
            if (this.inputEl.current.value !== "") {
              this.addTask({ task: this.inputEl.current.value, done: false });
            }
          }}
        >
          Add
        </button>
        <ul>{list}</ul>
      </div>
    );
  }
}

export default App;
