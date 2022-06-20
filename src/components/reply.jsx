import { React, useState, useContext } from 'react';
import DeleteReplyModal from './DeleteReplyModal';
import { CommentsContext } from '../context';
import { useAuth0 } from '@auth0/auth0-react';

const Reply = (props) => {
  const [content, setContent] = useState(props.reply.content);
  const [editClicked, setEditClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const { setComments, comments } = useContext(CommentsContext);
  const { user, isAuthenticated } = useAuth0();
  

  const { reply, index, comment } = props;

  const handleReplySave = (e) => {
    e.preventDefault();
    if (content === '') {
      return;
    }
    const newComments = [...comments];
    const updatedComment = { ...comment };
    updatedComment.replies[index] = { ...reply, content: content };

    newComments.map((c) => {
      if (c.id === comment.id) {
        return updatedComment;
      }
      return comment;
    });

    setComments(newComments);
    setEditClicked(false);
  };

  const handleReplyPlus = () => {
    const newComments = [...comments];
    const updatedComment = { ...comment };
    updatedComment.replies[index] = { ...reply, score: reply.score + 1 };
    newComments.map((c) => {
      if (c.id === comment.id) {
        return updatedComment;
      }
      return comment;
    });
    setComments(newComments);
  };

  const handleReplyMinus = () => {
    if (reply.score === 0) {
      return reply;
    }
    const newComments = [...comments];
    const updatedComment = { ...comment };
    updatedComment.replies[index] = { ...reply, score: reply.score - 1 };
    newComments.map((c) => {
      if (c.id === comment.id) {
        return updatedComment;
      }
      return comment;
    });
    setComments(newComments);
  };

  return (
    <div className="bg-white rounded-lg m-2 p-2 text-sm w-[500px] flex">
   
      <div
        id="reply-score-container"
        className="bg-[#F5F6FA] text-[#5357B6] m-2 rounded-lg h-[90px] w-[24px] text-xxs flex flex-col justify-center"
      >
        <button
          id="reply-plus-button"
          onClick={handleReplyPlus}
          className="p-1 m-1"
        >
             <img
                  src="/icons/icon-plus.svg"
                />
        </button>
        <div className="p-1 m-1 font-bold" id="reply-score">
          {props.reply.score}
        </div>
        <button
          id="reply-minus-button"
          onClick={handleReplyMinus}
          className="p-1 m-1"
        >
             <img
                  src="/icons/icon-minus.svg"
                />
        </button>
      </div>
      <div id={`reply-${props.reply.id}`}>
        <div className="flex justify-between">
          <div className="flex flex-row p-2 items-center">
          <p className="font-bold m-2">{props.reply.user.username}</p>
          <p className="text-[#67727E]">{props.reply.createdAt}</p>
          </div>
          {isAuthenticated && props.reply.user.username === user.nickname ? (
            <div className="flex flex-row">
              <button
                className="text-xs text-[#5357B6] flex mx-1 items-center justify-between px-2"
                id="reply-edit-button"
                onClick={() => setEditClicked(true)}
              >
                <img src="/icons/icon-edit.svg" className="w-[10px] mx-1" />
                <p> Edit</p>
              </button>
              <button
                className="text-xs text-red-500 flex items-center justify-between"
                onClick={() => setOpen(true)}
                id="reply-delete-button"
              >
                <img src="/icons/icon-delete.svg" className="w-[10px] mx-1" />
                <p> Delete</p>
              </button>
              <DeleteReplyModal
                setOpen={setOpen}
                open={open}
                replyId={props.reply.id}
                comment={props.comment}
              />
            </div>
          ) : null}
        </div>
        <p className="m-1 p-1 text-[#67727E]" id="reply-content">
          {props.reply.content}
        </p>        
      </div>
    </div>
  );
};

export default Reply;
