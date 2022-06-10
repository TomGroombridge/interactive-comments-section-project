import React, { useState } from 'react';
import Edit from './edit';
import Delete from './delete';
import { v4 as uuidv4 } from 'uuid';
import Comments from '../pages/Comments';
import Reply from './reply';

const Comment = (props) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const [replyValue, setReplyValue] = useState('');
  const [comment, setComment] = useState(props.comment);
  const [replies, setReplies] = useState(props.comment.replies);

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyValue === '') {
      return;
    }

    const replyData = {
      id: uuidv4(),
      content: replyValue,
      createdAt: 'now',
      score: 0,
      replyingTo: comment.user.username,
      user: {
        image: {
          png: props.currentUser.image.png,
          webp: props.currentUser.image.webp,
        },
        username: props.currentUser.username,
      },
    };
    const newComments = props.comments.map((comment, index) => {
      if (comment.id === props.comment.id) {
        comment.replies.push(replyData);
      }
      return comment;
    });

    props.setComments(newComments);
    setReplyClicked(false);
    setReplyValue('');
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
    <div className="bg-white m-2 flex flex-row p-2" id="comment-container">
      <div
        id="score-container"
        className="bg-gray-100 text-purple-900 m-2 rounded-lg h-[130px] w-[30px] flex flex-col justify-center"
      >
        <button
          id={`plus-button-${props.comment.id}`}
          onClick={handlePlus}
          className="p-1 m-1"
        >
          +
        </button>
        <div className="p-1 m-1" id={`score-${props.comment.id}`}>
          {props.comment.score}
        </div>
        <button
          id={`minus-button-${props.comment.id}`}
          onClick={handleMinus}
          className="p-1 m-1"
        >
          -
        </button>
      </div>

      <div>
        <div className="flex p-2 items-center justify-between">
          <div className="flex p-2 items-center">
            <img id="user-icon" src={props.comment.user.image.png}></img>
            <h2 className="font-extrabold text-black m-2">
              {props.comment.user.username}
            </h2>
            <h3 className="font-light text-slate-500 text-sm">
              {props.comment.createdAt}
            </h3>
          </div>
          <div>
            <button
              className="text-purple-900 bg-white p-1 mx-1 justify-between flex items-center w-[76px]"
              id="reply-button"
              onClick={() => {
                setReplyClicked(true);
              }}
            >
              {/* <div className="flex items-center mx-1 w-[70px] justify-between"> */}
              <img src="/icons/icon-reply.svg" className="w-[20px] h-[20px]" />
              <p className="">Reply </p>
              {/* </div> */}
            </button>
            {props.comment.user.username === props.currentUser.username ? (
              <div>
                <Edit
                  id={props.comment.id}
                  content={props.comment.content}
                  commentUser={props.comment.user.username}
                  comments={props.comments}
                  setComments={props.setComments}
                  currentUser={props.currentUser}
                />
                <Delete
                  id={props.comment.id}
                  comments={props.comments}
                  setComments={props.setComments}
                />
              </div>
            ) : null}
          </div>
        </div>

        <h1 id={`comment-${props.comment.id}`}>{props.comment.content}</h1>

        <div className="flex flex-col items-end" id="replies-container">
          {props.comment.replies.map((reply, index) => {
            return (
              <Reply
                reply={reply}
                index={index}
                replies={props.comment.replies}
                id={reply.id}
                setReplies={setReplies}
                currentUser={props.currentUser}
              />
            );
          })}
        </div>

        <div className="flex justify-end m-1">
          {replyClicked ? (
            <form
              id="reply-form"
              className="w-[500px] flex justify-between bg-slate-400"
              onSubmit={(e) => handleReplySubmit(e)}
            >
              <input
                type="text"
                className="bg-slate-200 m-1 p-1 text-sm w-[300px]"
                value={
                  replyValue
                    ? `${replyValue}`
                    : `@${props.comment.user.username} `
                }
                onChange={(e) => {
                  setReplyValue(e.target.value);
                }}
              ></input>

              <input type="submit" className="bg-slate-200 m-1 p-1 text-sm" />
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Comment;
