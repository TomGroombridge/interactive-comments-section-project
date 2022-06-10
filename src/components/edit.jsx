import React, { useState } from 'react';

const Edit = (props) => {
  const [content, setContent] = useState(props.content);
  const [editClicked, setEditClicked] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (content === '') {
      return;
    }
    const editedComments = props.comments.map((comment, index) => {
      if (props.id === comment.id) {
        comment.content = content;
      }
      return comment;
    });
    props.setComments(editedComments);
    setEditClicked(false);
  };

  return (
    <div>
      <button
        className="border-2 border-purple-900 text-purple-900 p-1 m-1 flex items-center"
        id="edit-button"
        onClick={() => setEditClicked(true)}
      >
        <p>Edit</p>
        <img src="/icons/icon-edit.svg" />
      </button>
      {editClicked ? (
        <div>
          <form onSubmit={(e) => handleSave(e)}>
            <input
              className="bg-slate-100 p-1 m-1"
              id="edit-input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="border-2 border-purple-900 text-purple-900 p-1 m-1">
              Save
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Edit;
