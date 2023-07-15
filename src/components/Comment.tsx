import IComment from "../interfaces/IComment";
import timeFromatter from "../utilities/timeformatter";
import '../assets/styles/comment.css'
import { useUser } from "../context/UserContext";





const Comment: React.FC<IComment> = (props) => {
  const {user, setUser} = useUser()



  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const token: string | null = localStorage.getItem("token");
    try {
      fetch(`http://localhost:3000/api/posts/${props.post}/comments/${props._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      })
        .then(async (response) => {
          if (response.ok) {
            console.log("comment deleted");
            try {
              await  props.onCommentDeleted();
            } catch (err) {
              console.error(err);
            }
          } else {
            console.error("Deleteion failed");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="comment">
      <div className="textC">{props.text}</div>
      <div className="authorC">{props.author}</div>
      <div className="timeC">{timeFromatter(props.time)}</div>
      {user && <button onClick={deleteHandler}>delete comment</button>}
    </div>
  );
};

export default Comment;