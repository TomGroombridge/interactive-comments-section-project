import React, { useState } from 'react';
import Edit from './edit';
import Delete from './delete'

const Comment = (props) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const [reply, setReply] = useState('');
  const [comments, setComments] = useState(props.comments);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (reply === '') {
      return;
    }

    const replyData = {
      id: 0,
      content: reply,
      createdAt: 'now',
      score: 0,
      replyingTo: '',
      user: {
        image: {
          png: '',
          webp: '',
        },
        username: '',
      },
    };
    let newComments = props.comments.map((comment, index) => {
      if (comment.id === props.comment.id) {
        comment.replies.push(replyData);
      }
      return comment;
    });

    props.setComments(newComments);
    setReplyClicked(false);
    setReply('');
  };

  const handlePlus = () => {
    const newComments = props.comments.map((comment, index) => {
      if (comment.id === props.comment.id) {
        comment.score += 1;
      }
      return comment;
    });
    props.setComments(newComments);
  };

  const handleMinus = () => {
    const newComments = props.comments.map((comment, index) => {
      if (comment.score === 0) {
        return comment;
      }
      if (comment.id === props.comment.id) {
        comment.score -= 1;
      }
      return comment;
    });
    props.setComments(newComments);
  };

  return (
    <div id="comment-container">
      <h1 className="bg-red-300" id={`comment-${props.comment.id}`}>
        {props.comment.content}
      </h1>
      
      <Edit id={props.comment.id} content={props.comment.content} commentUser={props.comment.user.username} comments={comments} setComments={props.setComments} currentUser={props.currentUser}/>
      <Delete />
      <button
        className="bg-green-300"
        id={`reply-button-${props.comment.id}`}
        onClick={() => {
          setReplyClicked(true);
        }}
      >
        Reply
      </button>
      <button
        id={`plus-button-${props.comment.id}`}
        onClick={() => handlePlus()}
      >
        +
      </button>
      <button
        id={`minus-button-${props.comment.id}`}
        onClick={() => handleMinus()}
      >
        -
      </button>
      <div id={`replies-container-${props.comment.id}`}>
        {props.comment.replies.map((reply) => {
          return <div className="bg-blue-400">{reply.content}</div>;
        })}
      </div>
      <div id={`score-${props.comment.id}`}>{props.comment.score}</div>
      {replyClicked ? (
        <form id="reply-form" onSubmit={(e) => handleReplySubmit(e)}>
          <input
            type="text"
            className="bg-yellow-500"
            value={reply ? `${reply}` : `@${props.comment.user.username}`}
            onChange={(e) => {
              setReply(e.target.value);
            }}
          ></input>

          <input type="submit" />
        </form>
      ) : null}
    </div>
  );
};

export default Comment;
