// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home.jsx';
// import Register from './pages/Register.jsx';
// import Login from './pages/Login.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import PostDetails from './pages/PostDetails.jsx';
// import Navbar from './components/Navbar.jsx';
// import Footer from './components/Footer.jsx';
// import CreatePost from './pages/CreatePost.jsx';
// import Comments from './pages/Comments.jsx';
// import ProfilePage from './pages/ProfilePage.jsx';
// import EditProfile from './pages/EditProfile.jsx';
// import UserPosts from './pages/UserPosts.jsx';
// import CreateComment from './pages/CreateComment.jsx';
// import EditComment from './pages/EditComment.jsx';
// import { CommentProvider } from './contexts/CommentContext.jsx';

// const App = () => {
//   return (
//     <CommentProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/postdetails/:id" element={<PostDetails />} />
//           <Route path="/create-post" element={<CreatePost />} />
//           <Route path="/comment" element={<Comments />} />
//           <Route path="/profile" element={<ProfilePage />} />
//           <Route path="/editprofile" element={<EditProfile />} />
//           <Route path="/my-posts" element={<UserPosts />} />
//           <Route path="/create-comment" element={<CreateComment />} />
//           <Route path="/edit-comment" element={<EditComment />} />
//         </Routes>
//         <Footer />
//       </BrowserRouter>
//     </CommentProvider>
//   );
// };
// export default App;

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
import Comments from './pages/Comments.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import EditProfile from './pages/EditProfile.jsx';
import UserPosts from './pages/UserPosts.jsx';
import CreateComment from './pages/CreateComment.jsx';
import EditComment from './pages/EditComment.jsx';
import { CommentProvider } from './contexts/CommentContext.jsx';

const App = () => {
  return (
    <CommentProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/posts/:postId/comments" element={<Comments />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/my-posts" element={<UserPosts />} />
          <Route
            path="/posts/:postId/create-comment"
            element={<CreateComment />}
          />
          <Route path="/comments/:commentId/edit" element={<EditComment />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CommentProvider>
  );
};

export default App;
