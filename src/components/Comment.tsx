import IComment from "../interfaces/IComment";
import timeFromatter from "../utilities/timeformatter";
import '../assets/styles/comment.css'

const Comment: React.FC<IComment> = (props) => {
  return (
    <div className="comment">
      <div className="textC">{props.text}</div>
      <div className="authorC">{props.author}</div>
      <div className="timeC">{timeFromatter(props.time)}</div>
    </div>
  );
};

export default Comment;