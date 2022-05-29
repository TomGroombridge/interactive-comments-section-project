import { useEffect } from "react";

const Comments = () => {

  useEffect(() => {
    // lets fetch those comments
    // let's not forget to use state for the Promise values (data, loading, error)
  }, [])

  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">
        Hello world!!
      </h1>
    </div>
  );
}
 
export default Comments;