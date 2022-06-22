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
  const [editClicked, setEditClicked] = useState(false);
  const [content, setContent] = useState(props.comment.content);
  // const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { comments, setComments } = useContext(CommentsContext);
  const { user, isAuthenticated } = useAuth0();
  const { index, comment } = props;

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

  const handleSave = (e) => {
    e.preventDefault();
    if (content === '') {
      return;
    }

    const newComments = [...comments];
    newComments[index] = { ...comment, content: content };
    setComments(newComments);
    setEditClicked(false);
  };

  return (
    <div id="comment-container" className="appearance-none">
      <div className="bg-white p-2 rounded-lg flex flex-row mt-4 w-[900px]">
        <div
          id="score-container"
          className="bg-[#F5F6FA] text-[#5357B6] m-2 rounded-lg h-[130px] w-[32px] flex flex-col justify-center items-center"
        >
          <button
            id={`plus-button-${props.comment.id}`}
            onClick={handlePlus}
            className="p-1 m-1 flex justify-items-center"
          >
            <img src="/icons/icon-plus.svg"/>
          </button>
          <div className="p-1 m-1 font-bold" id={`score-${props.comment.id}`}>
            {props.comment.score}
          </div>
          <button
            id={`minus-button-${props.comment.id}`}
            onClick={handleMinus}
            className="p-1 m-1 justify-items-center"
          >
            <img src="/icons/icon-minus.svg"/>
          </button>
        </div>

        <div className="flex flex-col">
          <div className="flex p-2 items-center flex justify-between">
            <div className="flex flex-row p-2 items-center">
              <img
                id="user-icon"
                src={props.comment.user.image.png}
                className="w-[34px] h-[34px] rounded-full"
              ></img>
              <h2 className="font-extrabold text-black m-2">
                {props.comment.user.username}
              </h2>
              {isAuthenticated &&
              props.comment.user.username === user.nickname ? (
                <p className="hover:opacity-50 bg-[#5357B6] rounded-sm text-white mr-2 px-1 text-xs">
                  you
                </p>
              ) : null}
              <h3 className="text-[#67727E] text-sm">
                {props.comment.createdAt}
              </h3>
            </div>
            <div className="flex">
              {isAuthenticated ? (
                <button
                  className="hover:opacity-50 text-[#5357B6] bg-white p-1 mx-1 justify-between flex items-center w-[76px]"
                  id="reply-button"
                  onClick={() => {
                    setReplyClicked(true);
                  }}
                >
                  <img
                    src="/icons/icon-reply.svg"
                    className="w-[20px] h-[20px] "
                  />
                  <p>Reply </p>
                </button>
              ) : null}

              {isAuthenticated &&
              props.comment.user.username === user.nickname ? (
                <div className="flex">
                  <Edit
                    comment={props.comment}
                    index={props.index}
                    editClicked={editClicked}
                    setEditClicked={setEditClicked}
                  />
                  <Delete id={props.comment.id} />
                </div>
              ) : null}
            </div>
          </div>

          <h1
            className="text-[#67727E] mx-2"
            id={`comment-${props.comment.id}`}
          >
            {props.comment.content}
          </h1>

          {editClicked ? (
            <div>
              <img
                src={user.picture}
                className="w-[34px] h-[34px] rounded-full"
              ></img>
              <form id="edit-form" onSubmit={(e) => handleSave(e)}>
                <input
                  className="bg-[#F5F6FA] p-1 m-1"
                  id="edit-input"
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <button className="hover:opacity-50 uppercase bg-[#5357B6] text-white m-1.5 p-1.5 rounded-lg text-xs">
                  Update
                </button>
              </form>
            </div>
          ) : null}
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
          <div className="w-[500px] flex bg-white p-2 m-1 rounded-lg">
            <img
              src={user.picture}
              className="w-[34px] h-[34px] rounded-full"
            ></img>
            <form
              id="reply-form"
              className="flex justify-between"
              onSubmit={(e) => handleReplySubmit(e)}
            >
              <input
                type="text"
                className="bg-[#F5F6FA] m-1 p-1 rounded-lg text-sm w-[300px]"
                value={
                  replyValue
                    ? `${replyValue}`
                    : `@${props.comment.user.username} `
                }
                onChange={(e) => {
                  setReplyValue(e.target.value);
                }}
              ></input>

              <button className="hover:opacity-50 bg-[#5357B6] text-white m-1 p-1 text-sm uppercase rounded-lg">
                Reply
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Comment;
