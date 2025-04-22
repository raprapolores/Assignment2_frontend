import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import NavHeader from "./components/NavHeader";
import ViewMyBlog from "./components/ViewMyBlog";
import EditMyProfile from "./components/EditMyProfile";
import AllBlogPosts from "./components/table/blog-posts.component";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <NavHeader isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" />} />
        <Route path="/homepage" element={<AllBlogPosts />} />
        <Route path="/viewmyblog" element={isLoggedIn ? <ViewMyBlog /> : <Navigate to="/login" />} />
        <Route path="/editmyprofile" element={isLoggedIn ? <EditMyProfile /> : <Navigate to="/login" />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
