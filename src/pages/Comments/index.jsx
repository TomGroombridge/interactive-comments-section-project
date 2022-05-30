import { useEffect, useState } from "react";
import Comment from "../../components/comment";

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
      setLoading(false)
      setError(true)
    }
  }

  if (loading) return <h1>Loading...</h1>
  
  if (error) return <h1>There has been an error</h1>

  return (
    <div className="container">
      {comments.map((comment, index) => {
        return (
          <Comment comment={comment} key={index}/>
        )
        
      })}
    </div>
  );
}
 
export default Comments; 