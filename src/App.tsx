import "./App.css";
import PostCard from "./components/PostCard";
import IPost from "./interfaces/IPost";
import { useEffect, useState } from "react";

const App: React.FC = () => {

  const [posts, setPosts ] = useState<IPost[]>()
  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/posts");
      const postData = await response.json() as IPost[];
      setPosts(postData)
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getPosts()
    .catch((err) => {
      console.error(err);
    });
  }, []);

  return (
    <div>
      <h1>My New Blog</h1>
      <div className="postsList">
        {posts && posts.map((post) => (
          <PostCard
            title={post.title}
            text={post.text}
            key={post._id}
            published={post.published}
            time={post.time}
            _id={post._id}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
