import React, { useState } from 'react';
import DeleteModal from './DeleteModal';

const Delete = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="border-2 border-red-500 text-red-500 p-1 m-1 flex items-center"
        onClick={() => setOpen(true)}
        id="delete-button"
      >
        <p>Delete</p>
        <img src="/icons/icon-delete.svg" />
      </button>
      <DeleteModal
        setOpen={setOpen}
        open={open}
        commentId={props.id}
      />
    </div>
  );
};

export default Delete;
