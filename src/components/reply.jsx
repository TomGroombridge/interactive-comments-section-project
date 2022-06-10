import Comment from './comment';
import { React, useState } from 'react';

const Reply = (props) => {
  const [replies, setReplies] = useState(props.replies);

  console.log('replies', replies);

  const handleReplyPlus = () => {
    const newReplies = props.replies.map((reply, index) => {
      if (reply.id === props.reply.id) {
        reply.score += 1;
      }
      return reply;
    });
    setReplies(newReplies);
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
    setReplies(newReplies);
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
        <p className="font-bold">{props.reply.user.username}</p>
        <p id="reply-content">{props.reply.content}</p>
      </div>
    </div>
  );
};

export default Reply;
