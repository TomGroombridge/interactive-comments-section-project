import React, { useState } from 'react';
import DeleteModal from './DeleteModal';

const Delete = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className="text-[#ED6368] flex p-1 mx-1 justify-between items-center w-[74px]"
        onClick={() => setOpen(true)}
        id="delete-button"
      >
             <img src="/icons/icon-delete.svg" />
        <p>Delete</p>
   
      </button>
      <DeleteModal setOpen={setOpen} open={open} commentId={props.id} />
    </div>
  );
};

export default Delete;
