import IPost from "../interfaces/IPost";
import "../assets/styles/postcard.css";
import timeFromatter from "../utilities/timeformatter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCard: React.FC<IPost> = (props) => {
    const navigate = useNavigate()

  const [time, setTime] = useState("");
  const [description, setDescription] = useState("")

  const shorter = (text: string): string => {
    return text.slice(0,200)
  }

  useEffect(() => {
    setTime(timeFromatter(props.time));
  }, [props.time]);

  useEffect(()=>{
    setDescription(shorter(props.text))
  }, [props.text])
  return (
    <div className="card">
      <div className="title">{props.title}</div>
      <div className="text">{description}......</div>
      <div className="date">published: {time}</div>
      <button onClick={()=>navigate(`/${props._id}`)} className="cardbtn">Read more</button>
    </div>
  );
};

export default PostCard;
