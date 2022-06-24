import React from 'react';


const Edit = (props) => {
  
  const { setEditClicked } = props;


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
      
    </div>
  );
};

export default Edit;
