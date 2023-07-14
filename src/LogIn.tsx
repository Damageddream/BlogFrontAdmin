import "./assets/styles/login.css";
import { useState } from "react";

const LogIn: React.FC = () => {
    const [password, setPassword] = useState<string>('')
    const [username, setUsername] = useState<string>('')

    const passwordHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setPassword(e.target.value)
    }

    const usernameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setUsername(e.target.value)
    }

    const login = async () => {
        try{
            const respone = fetch('http://localhost:3000/api/posts/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username: username, password: password})
            })
        }catch(err){console.error(err)}
    }

    const submitHandler: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()

    }
  return (
    <>
      <form onSubmit={submitHandler} className="loginform">
        <label htmlFor="username">Username:</label>
        <input onChange={usernameHandler} type="text" value={username}id="username" />
        <label htmlFor="password">Password:</label>
        <input onChange={passwordHandler} type="password" value={password} id="password" />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default LogIn;
