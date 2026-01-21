import React from 'react';

export const metadata = {
  title: "Documentation with AI | DocStar",  
  description: "Create ease free documentation with AI",
}
const DocumentationWithAI: React.FC = () => {
  return (
    <div className="min-h-screen px-6 py-20 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Organize Your Docs with Ease
        </h1>
        <p className="text-lg mb-12 opacity-80">
          You can organize your documentation by creating collections and breaking them into clear pages and subpages, making navigation a breeze.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 theme-bg">
            <h2 className="text-2xl font-semibold mb-4">
              Quick and Easy Formatting for Docs
            </h2>
            <p className="opacity-80">
              Quickly format your documentation with customizable fonts, styles, Markdown, callouts, quotes, and media to make it clear and visually engaging.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 theme-bg">
            <h2 className="text-2xl font-semibold mb-4">
              Manage Your Workspaces
            </h2>
            <p className="opacity-80">
              Easily create and manage multiple workspaces for different projects or teams, with full control over members and collaboration.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 theme-bg">
            <h2 className="text-2xl font-semibold mb-4">
              Simple Drag-and-Drop Organization
            </h2>
            <p className="opacity-80">
              With the drag-and-drop feature, organizing your documentation is simple! You can easily arrange pages and subpages to maintain a clear, structured hierarchy.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 theme-bg">
            <h2 className="text-2xl font-semibold mb-4">
              Easy Document Publishing
            </h2>
            <p className="opacity-80">
              Publishing your documentation is simple. Just click to make entire collections and all their documents instantly accessible.
            </p>
          </div>
        </div>

        <div className="mt-16 p-10 rounded-xl shadow-md theme-bg">
          <h2 className="text-2xl font-semibold mb-4">
            Smart Search with DocStar AI
          </h2>
          <p className="text-lg opacity-80">
            DocStar AI helps your users quickly find answers and solve problems by using the information in your documentation.
          </p>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-4">
            Start Your Documentation Journey with DocStar Today!
          </h2>
          <p className="text-lg opacity-80">
            Create, manage, and share your docs effortlessly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationWithAI;
