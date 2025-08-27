import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About NK_Blog
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Discover the story behind our platform and our mission to empower
            writers and readers alike.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Story
              </h2>
              <p className="text-gray-700 mb-4">
                NK_Blog was born from a passion for storytelling and a belief in
                the power of shared ideas. Founded in 2023, our platform has
                grown into a vibrant community of writers and readers who value
                authentic content and meaningful connections.
              </p>
              <p className="text-gray-700">
                What started as a simple blog has evolved into a comprehensive
                publishing platform where voices from around the world come
                together to share knowledge, experiences, and perspectives.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-blue-400 to-indigo-600 rounded-2xl h-64 flex items-center justify-center">
                <span className="text-white text-6xl">📖</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row-reverse items-center mb-10">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pl-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 mb-4">
                Our mission is to create a space where everyone has a voice and
                can share their stories with the world. We believe in the
                transformative power of writing and reading to connect people
                across cultures and experiences.
              </p>
              <p className="text-gray-700">
                We're committed to building tools that make publishing
                accessible to all, regardless of technical expertise, and
                fostering a community built on respect, curiosity, and shared
                learning.
              </p>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-purple-400 to-pink-600 rounded-2xl h-64 flex items-center justify-center">
                <span className="text-white text-6xl">🌍</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-700 mb-4">
                At NK_Blog, we're guided by a set of core values that shape
                everything we do:
              </p>
              <ul className="text-gray-700 list-disc pl-5 space-y-2">
                <li>
                  <span className="font-semibold">Authenticity:</span> We
                  prioritize genuine voices and original content
                </li>
                <li>
                  <span className="font-semibold">Community:</span> We foster
                  connections and conversations
                </li>
                <li>
                  <span className="font-semibold">Accessibility:</span> We make
                  publishing easy for everyone
                </li>
                <li>
                  <span className="font-semibold">Innovation:</span> We
                  continuously improve our platform
                </li>
                <li>
                  <span className="font-semibold">Diversity:</span> We celebrate
                  different perspectives and experiences
                </li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-gradient-to-r from-green-400 to-blue-600 rounded-2xl h-64 flex items-center justify-center">
                <span className="text-white text-6xl">❤️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Nishant Kumar
              </h3>
              <p className="text-indigo-600 mb-2">Founder & Lead Developer</p>
              <p className="text-gray-700">
                Passionate about creating platforms that bring people together
                through storytelling.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Sarah Johnson
              </h3>
              <p className="text-indigo-600 mb-2">Content Editor</p>
              <p className="text-gray-700">
                Dedicated to helping writers refine their voice and share their
                best work.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                Michael Chen
              </h3>
              <p className="text-indigo-600 mb-2">Community Manager</p>
              <p className="text-gray-700">
                Focused on building and nurturing our vibrant community of
                readers and writers.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-10">NK_Blog by the Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-4xl font-bold mb-2">10K+</div>
              <div className="text-indigo-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5K+</div>
              <div className="text-indigo-100">Published Posts</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25+</div>
              <div className="text-indigo-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-indigo-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Join Our Community
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Whether you're a writer with stories to share or a reader looking
            for inspiration, there's a place for you in our growing community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300">
              Create Account
            </button>
            <button className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
              Explore Posts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
