import React from 'react';

const SimpleWebsite: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-black mb-6">
          Build Your Personal Website Without Code
        </h1>
        <p className="text-lg text-gray-700 mb-10">
          With the intuitive features of <span className="font-semibold">DocStar</span>, you can create your own personal website without needing a developer team or any coding skills.
          Turn your ideas and vision into a fully functional website, and let the world explore what you've built—<span className="italic">no tech expertise required</span>!
        </p>

        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Fast, Easy, and No-Code
          </h2>
          <p className="text-gray-700 text-lg">
            Build your website in no time and showcase your ideas to the world with ease.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleWebsite;
