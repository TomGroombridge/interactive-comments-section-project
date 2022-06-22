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
    <div className="bg-white rounded-lg mt-4 p-2 text-sm md:w-[800px] w-[270px] flex md:flex-row flex-col-reverse">
      <div
        id="reply-score-container"
        className="bg-[#F5F6FA] m-2 text-[#5357B6] rounded-lg md:h-[90px] md:w-[24px] w-[80px] flex md:flex-col text-xxs flex justify-center items-center"
      >
        <button
          id="reply-plus-button"
          onClick={handleReplyPlus}
          className="p-1 m-1"
        >
          <img src="/icons/icon-plus.svg" />
        </button>
        <div className="p-1 m-1 font-bold" id="reply-score">
          {props.reply.score}
        </div>
        <button
          id="reply-minus-button"
          onClick={handleReplyMinus}
          className="p-1 m-1"
        >
          <img src="/icons/icon-minus.svg" />
        </button>
      </div>
      <div id={`reply-${props.reply.id}`} className="w-full">
        <div className="w-full flex justify-between mr-2 pr-2">
          <div className="flex flex-row p-2 items-center">
            <img
              id="reply-user-icon"
              src={props.reply.user.image.png}
              className="w-[34px] h-[34px] rounded-full"
            ></img>
            <p className="font-bold m-2">{props.reply.user.username}</p>
            {isAuthenticated && props.reply.user.username === user.nickname ? (
              <p className="hover:opacity-50 bg-[#5357B6] rounded-sm text-white mr-2 px-1 text-xs">
                you
              </p>
            ) : null}

            <p className="text-[#67727E]">{props.reply.createdAt}</p>
          </div>
          <div className="flex flex-row ">
          {isAuthenticated && props.reply.user.username === user.nickname ? (
            <div className="flex flex-row">
              <button
                className="hover:opacity-50 text-xs text-[#5357B6] flex mx-1 items-center justify-between px-2"
                id="reply-edit-button"
                onClick={() => setEditClicked(true)}
              >
                <img src="/icons/icon-edit.svg" className="w-[10px] mx-1" />
                <p> Edit</p>
              </button>
              <button
                className="hover:opacity-50 text-xs text-red-500 flex items-center justify-between"
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
        </div>
        <p className="m-1 p-1 text-[#67727E] w-full" id="reply-content">
          {props.reply.content}
        </p>
        {editClicked ? (
          <div>
            <form onSubmit={(e) => handleReplySave(e)}>
              <input
                className="bg-slate-100 p-1 m-1 border-[1px] border-purple-900"
                id="reply-input"
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <button className="uppercase text-xs rounded-lg bg-purple-900 text-white p-1 m-1">
                Update
              </button>
            </form>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Reply;
