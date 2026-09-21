import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | DocStar",
  description: "The page you're looking for doesn't exist or may have been moved.",
  robots: {
    index: false,
    follow: true,
  },
};

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center px-4 text-center py-12">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">404</h1>
      <h2 className="text-xl sm:text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="opacity-70 mb-6 max-w-md">
        Oops! The page you're trying to access does not exist or may have been moved.
      </p>
      <Link
        href="/"
        className="inline-block font-semibold text-white bg-black hover:bg-gray-900 transition-colors rounded-xl px-6 py-3 border-0 shadow hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
