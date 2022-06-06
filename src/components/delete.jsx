import React, { useState } from 'react';

const Delete = () => {
  const handleDelete = () => {
    console.log('deleted');
  };

  return (
    <div>
      <button
        className="border-2 border-red-500 text-red-500 p-1 m-1 flex items-center"
        onClick={() => handleDelete()}
      >
        <p>Delete</p>
        <img src="/icons/icon-delete.svg" />
      </button>
    </div>
  );
};

export default Delete;
