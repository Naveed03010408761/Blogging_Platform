import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="/images/logo.png" alt="logo" className="h-8 w-8" />
          <span className="font-bold text-lg text-gray-800">NK_Blog</span>
        </div>

        <ul className="hidden md:flex space-x-6 font-medium text-gray-700">
          <li>
            <a href="/" className="hover:text-blue-600 transition">
              Home
            </a>
          </li>
          <li>
            <a href="/posts" className="hover:text-blue-600 transition">
              Posts
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-600 transition">
              About
            </a>
          </li>
        </ul>

        <div className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Search post..."
            className="px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
