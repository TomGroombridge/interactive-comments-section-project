import { useEffect, useState } from "react";

const Comments = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
    // let's not forget to use state for the Promise values (data, loading, error)
  }, [])

  const fetchComments = async () => {
    try {
      const response = await fetch("https://api.mocki.io/v2/a20ae30b/comments")
      
      const data = await response.json();
      setComments(data.comments)
      setLoading(false)
      console.log(comments)

    }
    catch (error) {
      setError(true)
    }
  }

  if (loading) return <h1>Loading...</h1>
  
  if (error) return <h1>There has been an error</h1>

  return (
    <div className="container">
      {comments.map((comment, index) => {
        return <h1 key={index}>{comment.content}</h1>
      })}
    </div>
  );
}
 
export default Comments;