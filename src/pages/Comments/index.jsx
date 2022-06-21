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
            className="hover:opacity-50 bg-white m-1 p-1 rounded-lg z-10"
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
          className="container flex flex-col items-center w-max"
          id="container"
        >
          {isAuthenticated ? (
            <h1 className="text-[#5357B6] text-lg mt-2 p-2">
              Hello {user.name}!
            </h1>
          ) : (
            <h1 className="text-[#5357B6] text-lg mt-2 p-2">
              Hello, log in to see more
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
            // <div className="bg-white max-w-full m-2 p-4 rounded-lg flex justify-between md">
            //   <div className="flex items-center w-full">
            //
            //     <button
            //       id="add-comment"
            //       className="hover:opacity-50 bg-[#F5F6FA] m-2 p-2 rounded-lg "
            //       onClick={() => setAddCommentClicked(true)}
            //     ></button>
            //   </div>
            //   {addCommentClicked ? (

            <div className="bg-white w-full m-2 p-4 rounded-lg flex justify-between md ">
              <img
                src={user.picture}
                className=" w-[34px] h-[34px] rounded-full m-2"
              ></img>
              <form
                className="flex"
                id="add-comment-form"
                onSubmit={(e) => handleAddCommentSubmit(e)}
              >
                <textarea
                  rows="5"
                  cols="60"
                  className="border-2 border-[#F5F6FA] h-[120px] rounded-lg m-2 p-2"
                  id="add-comment-input"
                  placeholder="Add a comment..."
                  onChange={(e) => setAddedComment(e.target.value)}
                />
                <button className="hover:opacity-50 bg-[#5357B6] uppercase rounded-lg text-white m-2 p-2 w-[100px] h-[50px]">
                  Send
                </button>
              </form>
            </div>
          ) : // ) : null}
          // </div>
          null}
        </div>
      </CommentsContext.Provider>
    </div>
  );
};

export default Comments;
