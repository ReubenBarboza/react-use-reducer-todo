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
  const toggleShouldEdit = () => {
    if (shouldEdit) setShouldEdit(false);
    else setShouldEdit(true);
  };
  return (
    <>
      <div
        className={`${
          shouldEdit && state.id === sendEditId
            ? "border-2 border-green-500"
            : ""
        } text-lg py-2  inline-flex items-center text-center`}
      >
        <span className="text-lg p-3">{state.name}</span>
        <span>
          <button
            className="btn"
            onClick={() =>
              dispatch({ type: ACTIONS.DONE_TODO, payload: { id: state.id } })
            }
          >
            Done
          </button>
          <button
            className="btn"
            onClick={() =>
              dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: state.id } })
            }
          >
            Delete
          </button>
          <button
            className="btn"
            onClick={(e) => {
              toggleShouldEdit();

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
