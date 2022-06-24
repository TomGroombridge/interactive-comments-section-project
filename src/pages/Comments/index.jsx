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
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();

  useEffect(() => {
    fetchComments();
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
    setAddedComment('');
  };

  if (loading || isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>There has been an error</h1>;
  return (
    <div>
      <div className="flex justify-end mt-4 mr-4 " id="log-buttons">
        {isAuthenticated ? (
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="hover:opacity-50 bg-white p-1 rounded-lg z-10"
            id="logout-button"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => loginWithRedirect()}
            className="hover:opacity-50 bg-white m-1 p-1 rounded-lg z-10"
            id="login-button"
          >
            Log In
          </button>
        )}
      </div>

      <CommentsContext.Provider value={{ comments, setComments }}>
        <div
          className="flex flex-col items-center w-screen"
          id="container"
        >
          {isAuthenticated ? (
            <h1 className="text-[#5357B6] text-lg mb-2">
              Hello {user.name}!
            </h1>
          ) : (
            <h1 className="text-[#5357B6] text-lg mb-2">
              Hello! Log in to see more
            </h1>
          )}
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
       

            <div className="bg-white p-4 rounded-lg flex md:justify-between md:w-[900px] w-[300px] mt-4 items-end md:items-start">
              <img
                src={user.picture}
                className=" w-[34px] h-[34px] rounded-full mx-1"
              ></img>
              <form
                className="flex flex-wrap justify-end md:flex-no-wrap"
                id="add-comment-form"
                onSubmit={(e) => handleAddCommentSubmit(e)}
              >
                <textarea
                  // rows="5"
                  // cols="60"
                  className="border-2 border-[#F5F6FA] h-[100px] rounded-lg p-2 md:min-w-[700px] w-[220px]"
                  id="add-comment-input"
                  placeholder="Add a comment..."
                  onChange={(e) => setAddedComment(e.target.value)}
                  value={addedComment}
                />
                <button className="hover:opacity-50 bg-[#5357B6] uppercase rounded-lg text-white md:ml-4 md:mr-0 md:my-0 m-3 p-2 w-[100px] h-[50px]">
                  Send
                </button>
              </form>
            </div>
          ) : 
          null}
        </div>
      </CommentsContext.Provider>
    </div>
  );
};

export default Comments;
