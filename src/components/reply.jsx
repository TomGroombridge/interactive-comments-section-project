import Comment from './comment';
import { React, useState } from 'react';
import DeleteReplyModal from './DeleteReplyModal';
import { useContext } from 'react';
import { UserContext } from '../contexts/comments';

const Reply = (props) => {
  const { user } = useContext(UserContext);
  const [content, setContent] = useState(props.reply.content);
  const [editClicked, setEditClicked] = useState(false);
  const [open, setOpen] = useState(false);

  const handleReplySave = (e) => {
    e.preventDefault();
    if (content === '') {
      return;
    }
    const editedReplies = props.replies.map((reply, index) => {
      if (props.id === reply.id) {
        reply.content = content;
      }
      return reply;
    });

    // props.replies = editedReplies;
    props.setReplies(editedReplies);
    setEditClicked(false);
  };

  const handleReplyPlus = () => {
    const newReplies = props.replies.map((reply, index) => {
      if (reply.id === props.reply.id) {
        reply.score += 1;
      }
      return reply;
    });
    // props.replies = newReplies;
    props.setReplies(newReplies);
  };

  const handleReplyMinus = () => {
    const newReplies = props.replies.map((reply, index) => {
      if (reply.score === 0) {
        return reply;
      }
      if (reply.id === props.reply.id) {
        reply.score -= 1;
      }
      return reply;
    });
    // props.replies = newReplies;
    props.setReplies(newReplies);
  };

  return (
    <div className="bg-slate-200 m-1 p-1 text-sm w-[500px] flex">
      <div
        id="reply-score-container"
        className="bg-gray-100 text-purple-900 m-2 rounded-lg h-[90px] w-[24px] text-xxs flex flex-col justify-center"
      >
        <button
          id="reply-plus-button"
          onClick={handleReplyPlus}
          className="p-1 m-1"
        >
          +
        </button>
        <div className="p-1 m-1" id="reply-score">
          {props.reply.score}
        </div>
        <button
          id="reply-minus-button"
          onClick={handleReplyMinus}
          className="p-1 m-1"
        >
          -
        </button>
      </div>
      <div
        // className="bg-slate-200 m-1 p-1 text-sm w-[500px]"
        id={`reply-${props.reply.id}`}
        key={props.index}
      >
        <div className="flex justify-between m-1 p-1">
          <p className="font-bold">{props.reply.user.username}</p>
          {props.reply.user.username === user.username ? (
            <div className="flex">
              <button
                className="text-xs text-purple-900 flex mx-1 items-center justify-between px-2"
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
                replies={props.replies}
                commentId={props.commentId}
              />
            </div>
          ) : null}
        </div>
        <p className="m-1 p-1" id="reply-content">
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