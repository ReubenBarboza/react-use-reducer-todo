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
    <div className="box-border min-h-screen bg-gray-200">
      <div className="flex flex-col items-center  p-2">
        <div className="flex flex-col items-center border-2 border-gray-300 shadow-lg rounded-xl">
          <h1 className="font-semibold text-4xl p-6 m-4 border-b-2 border-gray-300">
            Todo App using{" "}
            <span className="border-b-4 border-b-blue-400 italic">
              useReducer
            </span>
          </h1>
          <div className="w-full">
            <form className="text-center" onSubmit={handleSubmit}>
              {shouldEdit ? (
                <input
                  ref={editInputName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="input"
                ></input>
              ) : (
                <input
                  ref={inputName}
                  onChange={(e) => setName(e.target.value)}
                  className="input"
                />
              )}
              <button
                className="text-md bg-blue-400 hover:bg-blue-500 hover:shadow-md  rounded-md  p-1 align-middle"
                type="submit"
              >
                {shouldEdit ? (
                  <span className="font-bold text-slate-600 text-md w-4 px-2 text-center uppercase">
                    Edit todo
                  </span>
                ) : (
                  <span className="font-bold text-slate-600  text-md w-4 px-2  text-center uppercase">
                    Add todo
                  </span>
                )}
              </button>
            </form>
            <ol className="w-full text-center ">
              {state.map((todo) => {
                return (
                  <li
                    className={`${
                      todo.completed ? "bg-green-200" : ""
                    } mx-4 border-t-2 list-decimal list-inside  border-gray-300 marker:relative`}
                    key={todo.id}
                  >
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
    </div>
  );
}

export default App;
