import React from "react";
import { ACTIONS } from "./App";

const Note = ({
  state,
  dispatch,
  setShouldEdit,
  shouldEdit,
  setSendEditId,
  sendEditId,
}) => {
  return (
    <>
      <div
        style={{
          backgroundColor: state.completed ? "lightgreen" : "",
          border:
            shouldEdit && state.id === sendEditId ? "3px solid green" : "",
          fontSize: "1.5rem",
        }}
      >
        {state.name}
        <span style={{ position: "fixed", right: "300px" }}>
          <button
            style={{}}
            onClick={() =>
              dispatch({ type: ACTIONS.DONE_TODO, payload: { id: state.id } })
            }
          >
            Done
          </button>
          <button
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: state.id } })
            }
          >
            Delete
          </button>
          <button
            onClick={(e) => {
              setShouldEdit(true);
              setSendEditId(state.id);
            }}
          >
            Edit
          </button>
        </span>
      </div>
    </>
  );
};

export default Note;
