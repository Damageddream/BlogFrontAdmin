import "./assets/styles/login.css";
import { useState } from "react";
import { useUser } from "./context/UserContext";
import { useNavigate } from "react-router-dom";


interface loginI {
  message: 'string';
  token: 'string';
}

const LogIn: React.FC = () => {

  const navigate = useNavigate()
  const {user, setUser} = useUser()
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const passwordHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
  };

  const usernameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };

  const login = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/posts/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: username, password: password }),
        })
        if(response.ok){
          const data= await response.json() as loginI
          localStorage.setItem("token", data.token)
          setUser(true)
          console.log(user)
          navigate('/')
        }
    } catch (err) {
      console.error(err);
    }
  };

  const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    login()
    .catch((err)=>{console.error(err)})
  };
  return (
    <>
      <form onSubmit={submitHandler} className="loginform">
        <label htmlFor="username">Username:</label>
        <input
          onChange={usernameHandler}
          type="text"
          value={username}
          id="username"
        />
        <label htmlFor="password">Password:</label>
        <input
          onChange={passwordHandler}
          type="password"
          value={password}
          id="password"
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LogIn;
