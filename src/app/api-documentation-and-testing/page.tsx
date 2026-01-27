// app/api-documentation/page.tsx
import React from "react";

const APIDocumentationPage = () => {
  return (
    <div className="min-h-screen px-6 py-20 lg:px-20">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">
          Document Your API Easily
        </h1>
        <p className="text-lg mb-12 opacity-80">
          No OAS file? No worries! You can document your API directly in{" "}
          <span className="font-semibold">DocStar</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-left">
          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 ">
            <h2 className="text-2xl font-semibold mb-4">
              One-Stop API Learning Docs Hub
            </h2>
            <p className="opacity-80">
              Provide developers with everything they need in one place: API reference, helpful guides, sample code, tutorials, and more.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 ">
            <h2 className="text-2xl font-semibold mb-4">
              Quick API Testing for Users
            </h2>
            <p className="opacity-80">
              DocStar offers an easy-to-use interface for sending HTTPS and GraphQL API requests, making it simple for developers and testers to handle both basic data retrieval and complex GraphQL queries.
            </p>
          </div>

          <div className="p-8 rounded-xl shadow hover:shadow-lg transition duration-300 ">
            <h2 className="text-2xl font-semibold mb-4">
              Built-In Testing + Docs
            </h2>
            <p className="opacity-80">
              Start documenting your API and allow developers and testers to test it directly within the platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIDocumentationPage;
