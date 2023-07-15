import IPost from "./interfaces/IPost";
import IComment from "./interfaces/IComment";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import timeFromatter from "./utilities/timeformatter";
import Comment from "./components/Comment";
import "./assets/styles/post.css";
import { useUser } from "./context/UserContext";
import UpdateForm from "./components/UpdateForm";

interface PostaDataI {
  title: string;
  text: string;
  published: boolean;
}


interface Params {
  id?: string;
}

const Post: React.FC = () => {
  const params: Params = useParams();
  const [post, setPost] = useState<IPost>();
  const { user, setUser } = useUser();
  const [showUpdate, setShowUpdate] = useState<boolean>(false)
  const navigate = useNavigate();

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

  const deleteHandler: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    const token: string | null = localStorage.getItem("token");
    try {
      fetch(`http://localhost:3000/api/posts/${params.id as string}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("post deleted");
            navigate("/");
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
  };

  const onCommentDeleted = async () => {
    try {
      await getComments();
    } catch (err) {
      console.error(err);
    }}
  const publishHandler: React.MouseEventHandler<HTMLButtonElement> = () =>{
    if(post){
    const formData: PostaDataI = {
      text: post.text,
      title: post.title,
      published: !post.published,
    };
    const token: string | null = localStorage.getItem("token");
    try {
      fetch(`http://localhost:3000/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token as string}`,
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("form submitted correctly");
            navigate("/");
          } else {
            console.error("Form submission failed");
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
    }


  }

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
      {user && <button onClick={()=>{setShowUpdate(!showUpdate)}}>Update post</button>}
      {user && <button onClick={deleteHandler}>Delete post</button>}
        {showUpdate && <UpdateForm id={params.id as string} />}
        {user && <button onClick={publishHandler}>{post?.published? "Unpublish": "Publish"}</button>}
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
              onCommentDeleted={onCommentDeleted}
            />
          );
        })}
    </div>
  );
};

export default Post;
