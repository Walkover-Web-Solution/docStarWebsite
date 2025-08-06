import React from 'react';

const DocumentationWithAI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-20 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-black mb-6">
          Organize Your Docs with Ease
        </h1>
        <p className="text-lg text-gray-700 mb-12">
          You can organize your documentation by creating collections and breaking them into clear pages and subpages, making navigation a breeze.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Quick and Easy Formatting for Docs
            </h2>
            <p className="text-gray-700">
              Quickly format your documentation with customizable fonts, styles, Markdown, callouts, quotes, and media to make it clear and visually engaging.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Manage Your Workspaces
            </h2>
            <p className="text-gray-700">
              Easily create and manage multiple workspaces for different projects or teams, with full control over members and collaboration.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Simple Drag-and-Drop Organization
            </h2>
            <p className="text-gray-700">
              With the drag-and-drop feature, organizing your documentation is simple! You can easily arrange pages and subpages to maintain a clear, structured hierarchy.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-semibold text-black mb-4">
              Easy Document Publishing
            </h2>
            <p className="text-gray-700">
              Publishing your documentation is simple. Just click to make entire collections and all their documents instantly accessible.
            </p>
          </div>
        </div>

        <div className="bg-white mt-16 p-10 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-black mb-4">
            Smart Search with DocStar AI
          </h2>
          <p className="text-gray-700 text-lg">
            DocStar AI helps your users quickly find answers and solve problems by using the information in your documentation.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-black mb-4">
            Start Your Documentation Journey with DocStar Today!
          </h2>
          <p className="text-gray-700 text-lg">
            Create, manage, and share your docs effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationWithAI;
