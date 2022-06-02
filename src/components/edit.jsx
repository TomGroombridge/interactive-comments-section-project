import React, { useState } from 'react';

const Edit = (props) => {
    const [content, setContent] = useState(props.content);
    const [editClicked, setEditClicked] = useState(false);
    const [cantEdit, setCantEdit] = useState(false)


    const handleSave = (e) => {
e.preventDefault();
if (content === '') {
  return;
}
      const editedComments = props.comments.map((comment, index) => {
        if (props.id === comment.id) {  
          comment.content = content;
        }
        return comment;
      })
      props.setComments(editedComments);  
      setEditClicked(false)
    }
// console.log("props.currentUser", props.currentUser);
// console.log("props.commentUser", props.commentUser)
  return(
      <div>
  <button className="border-2 border-red-500 text-red-500 p-1 m-1" id={`edit-button-${props.id}`} onClick={() => (props.currentUser === props.commentUser) ? setEditClicked(true) : setCantEdit(true)}>Edit</button> 
    {cantEdit ? (
        <div>
            <p>You cannot edit someone else's comment</p>
        </div>
    ) : null}
    {editClicked ? (
        <div>
          <form onSubmit={(e) => handleSave(e)}>
            <input id={`edit-input-${props.id}`} type="text" value={content} onChange={(e) => setContent(e.target.value)}/>
            <button>Save</button>
          </form>
        </div>
    ) : null}
    </div>
)
}

export default Edit;