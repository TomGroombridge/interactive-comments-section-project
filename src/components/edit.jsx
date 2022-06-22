import React, { useState, useContext } from 'react';
import { CommentsContext } from '../context';

const Edit = (props) => {
  // const [content, setContent] = useState(props.comment.content);
  // const [editClicked, setEditClicked] = useState(false);
  const { index, comment, editClicked, setEditClicked } = props;

  const { comments, setComments } = useContext(CommentsContext);

  // const handleSave = (e) => {
  //   e.preventDefault();
  //   if (content === '') {
  //     return;
  //   }

  //   const newComments = [...comments];
  //   newComments[index] = { ...comment, content: content };
  //   setComments(newComments);
  //   setEditClicked(false);
  // };

  return (
    <div>
      <button
        className="hover:opacity-50 text-[#5357B6] flex p-1 mx-1 justify-between items-center w-[56px]"
        id="edit-button"
        onClick={() => setEditClicked(true)}
      >
        <img src="/icons/icon-edit.svg" />
        <p className="md:text-sm text-xs" >Edit</p>
      </button>
      {/* {editClicked ? (
        <div>
          <form onSubmit={(e) => handleSave(e)}>
            <input
              className="bg-[#F5F6FA] p-1 m-1"
              id="edit-input"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="uppercase bg-[#5357B6] text-white m-1.5 p-1.5 rounded-lg text-xs">
              Update
            </button>
          </form>
        </div>
      ) : null} */}
    </div>
  );
};

export default Edit;
