import React, { useState, useContext } from 'react';
import Edit from './edit';
import Delete from './delete';
import { v4 as uuidv4 } from 'uuid';
import Reply from './reply';
import { CommentsContext } from '../context';
import { useAuth0 } from '@auth0/auth0-react';

const Comment = (props) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const [replyValue, setReplyValue] = useState('');
  const [replies, setReplies] = useState(props.comment.replies);

  // const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { comments, setComments } = useContext(CommentsContext);
  const { user, isAuthenticated } = useAuth0();

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
      replyingTo: props.comment.user.username,
      user: {
        image: {
          png: user.picture,
          webp: user.picture,
        },
        username: isAuthenticated ? user.nickname : null,
      },
    };

    const newComments = comments.map((comment, index) => {
      if (comment.id === props.comment.id) {
        comment.replies.push(replyData);
      }
      return comment;
    });

    setComments(newComments);
    setReplyClicked(false);
    setReplyValue('');
  };

  const handlePlus = () => {
    const newComments = comments.map((comment, index) => {
      if (comment.id === props.comment.id) {
        comment.score += 1;
      }
      return comment;
    });
    setComments(newComments);
  };

  const handleMinus = () => {
    const newComments = comments.map((comment, index) => {
      if (comment.score === 0) {
        return comment;
      }
      if (comment.id === props.comment.id) {
        comment.score -= 1;
      }
      return comment;
    });
    setComments(newComments);
  };

  return (
    <div className="m-2 flex flex-col pt-2" id="comment-container">
      <div className="bg-white p-2 rounded-lg flex flex-row">
      <div
        id="score-container"
        className="bg-[#F5F6FA] text-[#5357B6] m-2 rounded-lg h-[130px] w-[30px] flex flex-col justify-center"
      >
        <button
          id={`plus-button-${props.comment.id}`}
          onClick={handlePlus}
          className="p-1 m-1"
        >
          <img
                  src="/icons/icon-plus.svg"
                />
        </button>
        <div className="p-1 m-1 font-bold" id={`score-${props.comment.id}`}>
          {props.comment.score}
        </div>
        <button
          id={`minus-button-${props.comment.id}`}
          onClick={handleMinus}
          className="p-1 m-1"
        >
             <img
                  src="/icons/icon-minus.svg"
                />
        </button>
      </div>

      <div className="flex flex-col">
      
        <div className="flex p-2 items-center justify-between">
          <div className="flex flex-row p-2 items-center">
            <img id="user-icon" src={props.comment.user.image.png} className="w-[64px] h-[64px] rounded-full"></img>
            <h2 className="font-extrabold text-black m-2">
              {props.comment.user.username}
            </h2>
            <h3 className="text-[#67727E] text-sm">
              {props.comment.createdAt}
            </h3>
          </div>
          <div className="flex">
            {isAuthenticated ? (
              <button
                className="text-[#5357B6] bg-white p-1 mx-1 justify-between flex items-center w-[76px]"
                id="reply-button"
                onClick={() => {
                  setReplyClicked(true);
                }}
              >
                <img
                  src="/icons/icon-reply.svg"
                  className="w-[20px] h-[20px]"
                />
                <p className="">Reply </p>
              </button>
            ) : null}

            {isAuthenticated &&
            props.comment.user.username === user.nickname ? (
              <div className="flex">
                <Edit comment={props.comment} index={props.index} />
                <Delete id={props.comment.id} />
              </div>
            ) : null}
          </div>
        </div>

        <h1 className="text-[#67727E]" id={`comment-${props.comment.id}`}>{props.comment.content}</h1>
        </div>
        
      </div>
      <div className="flex flex-col items-end" id="replies-container">
          {props.comment.replies.map((reply, index) => {
            return (
              <Reply
                reply={reply}
                key={index}
                index={index}
                comment={props.comment}
                setReplies={setReplies}
              />
            );
          })}
        </div>

        <div className="flex justify-end m-1">
          {replyClicked ? (
            <form
              id="reply-form"
              className="w-[500px] flex justify-between bg-[#F5F6FA]"
              onSubmit={(e) => handleReplySubmit(e)}
            >
              <input
                type="text"
                className="bg-[#F5F6FA] m-1 p-1 text-sm w-[300px]"
                value={
                  replyValue
                    ? `${replyValue}`
                    : `@${props.comment.user.username} `
                }
                onChange={(e) => {
                  setReplyValue(e.target.value);
                }}
              ></input>

              <input type="submit" className="bg-[#F5F6FA] m-1 p-1 text-sm" />
            </form>
          ) : null}
        </div>
        
    </div>
  );
};

export default Comment;
