import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import PostDetails from './pages/PostDetails.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import CreatePost from './pages/CreatePost.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import EditProfile from './pages/EditProfile.jsx';
import UserPosts from './pages/UserPosts.jsx';
import CreateComment from './pages/CreateComment.jsx';
import EditComment from './pages/EditComment.jsx';
import { CommentProvider } from './contexts/CommentContext.jsx';
import { LikeProvider } from './contexts/likeContext.jsx';
import About from './About.jsx';
import LikeButton from './components/LikeButton.jsx';

const App = () => {
  return (
    <LikeProvider>
      <CommentProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/my-posts" element={<UserPosts />} />
            <Route path="/my-posts" element={<LikeButton />} />
            <Route
              path="/posts/:postId/create-comment"
              element={<CreateComment />}
            />
            <Route path="/comments/:commentId/edit" element={<EditComment />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CommentProvider>
    </LikeProvider>
  );
};

export default App;
