import { useEffect, useState } from 'react';
import Comment from '../../components/comment';
import { v4 as uuidv4 } from 'uuid';
import { CommentsContext } from '../../context';
import { useAuth0 } from '@auth0/auth0-react';

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);
  const [addedComment, setAddedComment] = useState('');
  const [addCommentClicked, setAddCommentClicked] = useState(false);
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  useEffect(() => {
    fetchComments();

    // let's not forget to use state for the Promise values (data, loading, error)
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('https://api.mocki.io/v2/a20ae30b/comments');
      const data = await response.json();
      setComments(data.comments);
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
    console.log('user', user);
    const addedCommentData = {
      id: uuidv4(),
      content: addedComment,
      createdAt: 'now',
      score: 0,
      user: {
        image: {
          png: user.picture,
          webp: user.picture,
        },
        username: user.nickname,
      },
      replies: [],
    };

    const newComments = comments.concat(addedCommentData);
    setComments(newComments);
    setAddCommentClicked(false);
    setAddedComment('');
  };

  if (loading || isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>There has been an error</h1>;
  return (
    <div className="flex flex-row-reverse">
      <div id="log-buttons" className="p-2 m-2">
        {isAuthenticated ? (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-slate-100 m-1 p-1"
            id="logout-button"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="bg-slate-100 m-1 p-1"
            id="login-button"
          >
            Log In
          </button>
        )}
      </div>

      <CommentsContext.Provider value={{ comments, setComments }}>
        <div className="container flex flex-col items-center" id="container">
          {isAuthenticated ? (
            <h1 className="text-[#5357B6] text-lg font-bold mt-2 p-2">
              Hello {user.name}!
            </h1>
          ) : <h1 className="text-[#5357B6] text-lg font-bold mt-2 p-2">Hello, log in to see more</h1>}
          {comments.map((comment, index) => {
            return (
              <Comment
                comment={comment}
                key={index}
                id={comment.id}
                index={index}
              />
            );
          })}
          {isAuthenticated ? (
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
                  <button className="bg-[#5357B6] text-white m-1 p-1 w-[100px]">
                    Send
                  </button>
                </form>
              ) : null}
            </div>
          ) : null}
        </div>
      </CommentsContext.Provider>
    </div>
  );
};

export default Comments;
