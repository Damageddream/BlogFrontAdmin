import IPost from "./interfaces/IPost";
import IComment from "./interfaces/IComment";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import timeFromatter from "./utilities/timeformatter";
import Comment from "./components/Comment";
import './assets/styles/post.css';


interface Params {
  id?: string;
}

const Post: React.FC = () => {
  const params: Params = useParams();
  const [post, setPost] = useState<IPost>();


  const getPost = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id as string}`
      );
      const postData = (await response.json()) as IPost;
      setPost(postData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPost().catch((err) => {
      console.error(err);
    });
  }, []);

  const [comments, setComments] = useState<IComment[]>();
  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/posts/${params.id as string}/comments`
      );
      const commentData = (await response.json()) as IComment[];
      setComments(commentData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getComments().catch((err) => {
      console.error(err);
    });
  }, []);


  return (
    <div className="mainPost">
      {post && (
        <div className="post">
          <div className="titleP">{post.title}</div>
          <div className="textP">{post.text}</div>
          <div className="dateP">Published: {timeFromatter(post.time)}</div>
        </div>
      )}
      <Link to="/">go back</Link>
      {comments &&
        comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              text={comment.text}
              time={comment.time}
              author={comment.author}
              post={comment.post}
              _id={comment._id}
            />
          );
        })}
    </div>
  );
};

export default Post;
