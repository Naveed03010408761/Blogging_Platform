import React from "react";
import { Link } from "react-router-dom";
 import axios from "axios";
const Navbar = () => {
 

const handleLogout = async () => {
  try {
    await axios.post(
      "/api/v1/auth/logout", 
      {}, 
      { withCredentials: true } 
    );

    window.location.href = "/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
};

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/"><img src="/images/logo.png" alt="logo" className="h-8 w-8" /></Link>
          <span className="font-bold text-lg text-gray-800">NK_Blog</span>
        </div>

        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" className="hover:text-blue-600 transition">
              Posts
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-blue-600 transition">
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-3">
  <div className="relative">
    <input
      type="text"
      placeholder="Search post..."
      className="pl-8 pr-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
    />
    <i className="fa fa-search absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
  </div>
  
  <Link to="/login">
    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
      Sign in
    </button>
  </Link>
  <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
  Logout
</button>
</div>

      </div>
    </nav>
  );
};

export default Navbar;
