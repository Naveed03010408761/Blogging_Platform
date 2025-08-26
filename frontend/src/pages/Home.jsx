import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   navigate("/login");
    // } else {
    //   navigate("/register");
    // }

    navigate('/register');
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="bg-blue-600 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg mb-6">
          This is the home page of your project. Explore and enjoy!
        </p>
        <button
          className="bg-white text-blue-600 font-semibold px-6 py-2 rounded hover:bg-gray-200"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </section>

      <section className="py-16 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <i className="fas fa-bolt text-blue-600 text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Fast</h3>
          <p>Our app is optimized for speed and performance.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <i className="fas fa-lock text-blue-600 text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">Secure</h3>
          <p>We keep your data safe with top security measures.</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <i className="fas fa-users text-blue-600 text-4xl mb-4"></i>
          <h3 className="text-xl font-semibold mb-2">User Friendly</h3>
          <p>Simple and clean interface for better experience.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
