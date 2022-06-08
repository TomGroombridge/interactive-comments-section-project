import React, { useState, Fragment, useRef } from 'react';

import DeleteModal from './DeleteModal';


const Delete = () => {
  const [open, setOpen] = useState(false);
  
  // const handleDelete = () => {
  //   console.log("deleted")
  // }
  return (
    <div>
      <button
        className="border-2 border-red-500 text-red-500 p-1 m-1 flex items-center"
        onClick={() => setOpen(true)}
      >
        <p>Delete</p>
        <img src="/icons/icon-delete.svg" />
      </button>
      <DeleteModal setOpen={setOpen} open={open}/>
    </div>
  );
};

export default Delete;
