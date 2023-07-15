import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Post from "./Post.tsx";
import LogIn from "./LogIn.tsx";
import AddPost from "./AddPost.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContextProvider from "./context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:id" element={<Post />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/addpost" element={<AddPost />} />
        </Routes>
      </Router>
    </ContextProvider>
  </React.StrictMode>
);
