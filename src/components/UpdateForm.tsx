import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

interface PostaDataI {
  title: string;
  text: string;
  published: boolean;
}

interface PropsI {
    id: string;
}

const UpdateForm:React.FC<PropsI> = (props) => {
    const navigate = useNavigate();
    const { user, setUser } = useUser();
    const [title, setTitle] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [checked, setCheked] = useState<boolean>(false);
  
    useEffect(() => {
      if (!user) {
        navigate("/login");
      }
    }, []);
  
    const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
      e.preventDefault();
      const formData: PostaDataI = {
        text,
        title,
        published: checked,
      };
      const token: string | null = localStorage.getItem("token");
      try {
        fetch(`http://localhost:3000/api/posts/${props.id}`, {
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
              setText("");
              setTitle("");
              setCheked(!checked);
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
    };
  
    const titleChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
      e
    ) => {
      setTitle(e.target.value);
    };
  
    const textChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
      e
    ) => {
      setText(e.target.value);
    };
  
    const chekcedHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      setCheked(!checked);
    };
  
    return (
      <div>
        <form onSubmit={submitHandler}>
          <label htmlFor="title">Title:</label>
          <input
            onChange={titleChangeHandler}
            id="title"
            type="text"
            value={title}
          />
          <label htmlFor="text">Text:</label>
          <textarea id="text" value={text} onChange={textChangeHandler} />
          <label htmlFor="published">Publish after adding?</label>
          <input
            type="checkbox"
            checked={checked}
            onChange={chekcedHandler}
            id="published"
            value=""
          />
          <button type="submit">Update post</button>
        </form>
      </div>
    );
}

export default UpdateForm