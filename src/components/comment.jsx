import React, { useState} from "react"

const Comment = (props)  => {

    const [replyClicked, setReplyClicked] = useState(false);
    const [reply, setReply] = useState("")

console.log(replyClicked)

    return (
        <div>
        <h1 id={`comment-${props.comment.id}`}>{props.comment.content}</h1>
        <button id={`reply-button-${props.comment.id}`} onClick={() => {setReplyClicked(true)}}>Reply</button>
        {replyClicked ? (<input type="text" value={reply ? `${reply}` : `@${props.comment.user.username}`} 
        onChange={(e) => {setReply(e.target.value)}}
         ></input>) : null}
        </div>
    )

}

export default Comment