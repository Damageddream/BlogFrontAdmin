import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Post from "./Post.tsx";
import LogIn from "./LogIn.tsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:id" element={<Post />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </Router>
  </React.StrictMode>
);