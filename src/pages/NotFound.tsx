import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center bg-gray-50 px-4 text-center py-12">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-6 max-w-md">
        Oops! The page you’re trying to access does not exist or may have been moved.
      </p>
      <Link
        to="/"
        className="inline-block font-semibold text-white bg-black hover:bg-gray-900 transition-colors rounded-xl px-6 py-3 border-0 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
