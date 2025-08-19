import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
       
        <div className="flex items-center mb-4 md:mb-0">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="/images/logo.png"
            className="h-8 w-8 mr-2"
          />
          <span className="text-lg font-semibold">MyWebsite</span>
        </div>

       
        <ul className="flex space-x-6 mb-4 md:mb-0">
          <li>
            <a href="/" className="hover:text-white transition">
              Home
            </a>
          </li>
          <li>
            <a href="/posts" className="hover:text-white transition">
              Posts
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-white transition">
              About
            </a>
          </li>
        </ul>

       
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-facebook"></i> 
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="hover:text-white transition">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      
      <div className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} NK_Blog. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
