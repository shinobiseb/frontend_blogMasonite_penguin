// Import All Our Components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";
import {useNavigate} from "react-router-dom"

// Import React and hooks
import React, { useState, useEffect } from "react";

// Import components from React Router
import { Route, Routes, Link } from "react-router-dom";

function App(props) {
////////////////////
// Style Objects
////////////////////

const h1 = {
  textAlign: "center",
  margin: "10px",
};

const button = {
  backgroundColor: "navy",
  display: "block",
  margin: "auto",
};

///////////////
// State & Other Variables
///////////////

// Our Api Url
  // Our Api Url
  const url = "https://blog-backend-seirpenguin-rnss.herokuapp.com/blogs/";

// State to Hold The List of Posts
const [posts, setPosts] = useState([]);

// an object that represents a null blog
const nullBlogs = {
  title: "",
  body: "",
};

// const state to hold blog to edit

const [targetblog, setTargetblog] = useState(nullBlogs);

//////////////
// Functions
//////////////

const navigate = useNavigate()

// Function to get list of blogs from API
const getBlogs = async () => {
  const response = await fetch(url);
  const data = await response.json();
  setPosts(data);
};

// Function to add blog from form data
const addblogs = async (newBlog) => {
  const response = await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBlog),
  });

  // get updated list of blogs
  getBlogs();
};

// Function to select Blog to edit
const getTargetBlog = (Blog) => {
  setTargetblog(Blog);
  navigate("/edit");
};

// Function to edit Blog on form submission
const updateBlog = async (Blog) => {
  const response = await fetch(url + Blog.id + "/", {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Blog),
  });

  // get updated list of Blogs
  getBlogs();
};

// Function to edit blog on form submission
const deleteblog = async (blog) => {
  const response = await fetch(url + blog.id + "/", {
    method: "delete",
  });

  // get updated list of blogs
  getBlogs();
  navigate("/");
};

//////////////
// useEffects
//////////////

// useEffect to get list of blogs when page loads
useEffect(() => {
 getBlogs();
}, []);

  //////////////////////////
  // Returned JSX
  //////////////////////////

  return (
    <div className="App">
      <h1 style={h1}>My blog List</h1>
      <Link to="/new"><button style={button}>Create New blog</button></Link>
      <Routes>
        <Route path="/" element={<AllPosts posts={posts}/>}/>
          <Route path="/post/:id" element={<SinglePost 
          posts={posts} 
          edit={getTargetBlog}deleteblog={deleteblog}/> } />
        <Route path="/new" element={
      <Form
      initialblog={nullBlogs}
      handleSubmit={addblogs}
      buttonLabel="create blog"
        />
        }/>
        <Route path="/edit" element={<Form
        initialblog={targetblog}
        handleSubmit={updateBlog}
        buttonLabel="update blog"
      /> } />
      </Routes>
    </div>
  );
}

export default App;