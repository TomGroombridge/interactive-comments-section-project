import { useEffect, useState } from 'react';
import Comment from '../../components/comment';

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [addedComment, setAddedComment] = useState("");
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchComments();
    // let's not forget to use state for the Promise values (data, loading, error)
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('https://api.mocki.io/v2/a20ae30b/comments');
      const data = await response.json();
      setComments(data.comments);
      setUsername(data.currentUser.username)
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleAddCommentSubmit = (e) => {
    e.preventDefault();
    if ( addedComment === '') {
      return;
    }

    const addedCommentData = {
        "id": 5,
        "content": addedComment,
        "createdAt": "now",
        "score": 0,
        "user": {
          "image": {
            "png": "",
            "webp": ""
          },
          "username": username,
        },
        "replies": []
    }
  
    let newComments = comments.concat(addedCommentData);
    setComments(newComments);
    setAddCommentClicked(false);
    setAddedComment("");
  }

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>There has been an error</h1>;

  return (
    <div className="container" id="container">
      
      {comments.map((comment, index) => {
        return (
          <Comment
            comment={comment}
            key={index}
            comments={comments}
            setComments={setComments}
            id={comment.id}
            currentUser={username}
          />
        );
      })}
      <button id="add-comment" onClick={() => setAddCommentClicked(true)}>Add comment</button>
      {addCommentClicked ? (
        <form id="add-comment-form" onSubmit={(e) => handleAddCommentSubmit(e)}>
          <input type="text" id="add-comment-input" onChange={(e) => setAddedComment(e.target.value)}/>
          <input type="submit"/>
        </form>
      ) : null}
      </div>
    
  );
};

export default Comments;
