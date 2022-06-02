import React, { useState } from 'react';



const Delete = () => {
    const handleDelete = () => {
        console.log("deleted")
    }
    
return (
    <div>
        <button className="border-2 border-purple-900 text-purple-900 p-1 m-1" onClick={() => handleDelete()}>Delete</button>
    </div>
)
}

export default Delete;