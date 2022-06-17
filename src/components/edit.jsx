import React, { useState, useContext } from 'react';
import { CommentsContext } from '../context';

const Edit = (props) => {
  const [content, setContent] = useState(props.comment.content);
  const [editClicked, setEditClicked] = useState(false);
  const { index, comment } = props;

  const { comments, setComments } = useContext(CommentsContext);

  const handleSave = (e) => {
    e.preventDefault();
    if (content === '') {
      return;
    }

    const newComments = [...comments];
    console.log('index', index);
    newComments[index] = { ...comment, content: content };
    setComments(newComments);
    setEditClicked(false);
    console.log('newComments', newComments);
  };

  return (
    <div>
      <button
        className="border-2 border-[#5357B6] text-[#5357B6] p-1 m-1 flex items-center"
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
            <button className="uppercase bg-[#5357B6] text-white p-1 m-1">
              Update
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
};

export default Edit;
