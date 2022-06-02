import React, { useState } from 'react';



const Delete = () => {
    const handleDelete = () => {
        console.log("deleted")
    }
    
return (
    <div>
        <button onClick={() => handleDelete()}>Delete</button>
    </div>
)
}

export default Delete;