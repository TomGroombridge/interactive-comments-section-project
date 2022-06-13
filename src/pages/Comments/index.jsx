import { useEffect, useState } from 'react';
import Comment from '../../components/comment';
import { v4 as uuidv4 } from 'uuid';
import { CommentsContext, CurrentUserContext } from '../../context';

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [addedComment, setAddedComment] = useState('');
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    fetchComments();
    // let's not forget to use state for the Promise values (data, loading, error)
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('https://api.mocki.io/v2/a20ae30b/comments');
      const data = await response.json();
      setComments(data.comments);
      setCurrentUser(data.currentUser);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  const handleAddCommentSubmit = (e) => {
    e.preventDefault();
    if (addedComment === '') {
      return;
    }

    const addedCommentData = {
      id: uuidv4(),
      content: addedComment,
      createdAt: 'now',
      score: 0,
      user: {
        image: {
          png: currentUser.image.png,
          webp: currentUser.image.webp,
        },
        username: currentUser.username,
      },
      replies: [],
    };

    const newComments = comments.concat(addedCommentData);
    setComments(newComments);
    setAddCommentClicked(false);
    setAddedComment('');
  };

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>There has been an error</h1>;

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <CommentsContext.Provider value={{ comments, setComments }}>
        <div className="container" id="container">
          {comments.map((comment, index) => {
            return (
              <Comment
                comment={comment}
                key={index}
                comments={comments}
                setComments={setComments}
                id={comment.id}
              />
            );
          })}
          <div className="bg-white m-2 p-4 flex justify-between">
            <button
              id="add-comment"
              className="bg-slate-100 m-1 p-1"
              onClick={() => setAddCommentClicked(true)}
            >
              Add comment
            </button>
            {addCommentClicked ? (
              <form
                className="flex"
                id="add-comment-form"
                onSubmit={(e) => handleAddCommentSubmit(e)}
              >
                <input
                  type="text"
                  className="border-2 border-slate-100 w-[300px]"
                  id="add-comment-input"
                  onChange={(e) => setAddedComment(e.target.value)}
                />
                <button className="bg-purple-900 text-white m-1 p-1 w-[100px]">
                  Send
                </button>
              </form>
            ) : null}
          </div>
        </div>
      </CommentsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default Comments;
