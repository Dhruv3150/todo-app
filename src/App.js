import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineDoneOutline } from "react-icons/md";
import "./App.css";
import "./AppQuery.css";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setAllTodos(updatedTodoArr);

    //👇👇 local storage ma store karva mate 👇👇
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
  };

  // 👇👇 delete functionality 👇👇
  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };
  // 👇👇 Complete functionality 👇👇

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn =
      dd + "-" + mm + "-" + yyyy + "-" + " at " + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr));
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  // 👇👇 storte karela data ne screen per show karva mate 👇👇
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <h1>Resolute-Solutions-task</h1>

      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label htmlFor="task">Title</label>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <label htmlFor="task">Description</label>
            <input
              type="text"
              placeholder="Add Description as you want"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              className="primaryBtn"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>

          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>

        <div className="todo-list">
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div>
                    <MdDelete
                      className="icon"
                      onClick={() => handleDeleteTodo(index)}
                      title="Delete?"
                    />

                    <MdOutlineDoneOutline
                      className="chack-icon"
                      onClick={() => handleComplete(index)}
                      title="Complete?"
                    />
                  </div>
                </div>
              );
            })}

          {isCompleteScreen === true &&
            completedTodos.map((item, index) => {
              return (
                <div className="todo-list-item">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>
                      <small>Completed on : {item.completedOn}</small>
                    </p>
                  </div>

                  <div>
                    <MdDelete
                      className="icon"
                      onClick={() => handleDeleteCompletedTodo(index)}
                      title="Delete?"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
