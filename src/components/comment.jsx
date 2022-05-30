import React, { useState} from "react"

const Comment = (props)  => {

    const [replyClicked, setReplyClicked] = useState(false);

console.log(replyClicked)

    return (
        <div>
        <h1 id={`comment-${props.comment.id}`}>{props.comment.content}</h1>
        <button onClick={() => {setReplyClicked(true)}}>Reply</button>
        {replyClicked ? (<input type="text"></input>) : null}
        </div>
    )

}

export default Comment