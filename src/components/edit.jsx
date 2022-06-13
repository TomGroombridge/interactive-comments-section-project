import React, { useState, useContext } from 'react';
import { CommentsContext } from '../context';

const Edit = (props) => {
  const [content, setContent] = useState(props.comment.content);
  const [editClicked, setEditClicked] = useState(false);
  const {
    comment: { id },
  } = props;

  const { comments, setComments } = useContext(CommentsContext);

  const handleSave = (e) => {
    e.preventDefault();
    if (content === '') {
      return;
    }
    const editedComments = comments.map((comment, index) => {
      if (id === comment.id) {
        comment.content = content;
      }
      return comment;
    });
    setComments(editedComments);
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
            <button className="uppercase bg-purple-900 text-white p-1 m-1">
              Update
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Edit;
