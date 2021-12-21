import "./App.css";
import { useReducer, useState, useRef } from "react";
import Note from "./Note";

export const ACTIONS = {
  ADD_TODO: "add_todo",
  DELETE_TODO: "delete_todo",
  DONE_TODO: "done_todo",
  UPDATE_TODO: "update_todo",
};

function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [name, setName] = useState("");
  const [shouldEdit, setShouldEdit] = useState(false);
  const [editName, setEditName] = useState("");
  const [sendEditId, setSendEditId] = useState("");
  const inputName = useRef(null);
  const editInputName = useRef(null);

  function newTodo(name) {
    return { id: Date.now(), name: name, completed: false };
  }

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.ADD_TODO:
        return [...state, newTodo(action.payload.name)];
      case ACTIONS.DELETE_TODO:
        return state.filter((todo) =>
          todo.id !== action.payload.id ? true : false
        );
      case ACTIONS.DONE_TODO:
        return state.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: true }
            : { ...todo }
        );
      case ACTIONS.UPDATE_TODO:
        return state.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, name: action.payload.name, completed: false }
            : { ...todo }
        );

      default:
        return;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!shouldEdit) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
      inputName.current.value = "";
    } else {
      dispatch({
        type: ACTIONS.UPDATE_TODO,
        payload: { id: sendEditId, name: editName },
      });
      editInputName.current.value = "";
      setShouldEdit(false);
    }
  }

  return (
    <>
      <div className="container">
        <div className="innerContainer">
          <h1>Todo App using useReducer</h1>
          <div className="todoContainer">
            <form onSubmit={handleSubmit}>
              {shouldEdit ? (
                <input
                  ref={editInputName}
                  onChange={(e) => setEditName(e.target.value)}
                ></input>
              ) : (
                <input
                  ref={inputName}
                  onChange={(e) => setName(e.target.value)}
                />
              )}
              <button type="submit">
                {shouldEdit ? "Edit todo" : "Add todo"}
              </button>
            </form>
            <ol>
              {state.map((todo) => {
                return (
                  <li key={todo.id}>
                    <Note
                      key={todo.id}
                      state={todo}
                      dispatch={dispatch}
                      setShouldEdit={setShouldEdit}
                      setSendEditId={setSendEditId}
                      sendEditId={sendEditId}
                      shouldEdit={shouldEdit}
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
