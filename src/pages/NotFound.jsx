import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-screen bg-gray-50 text-gray-900 px-4">
      <h1 className="text-9xl font-extrabold text-blue-600 mb-4 animate-pulse">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        The page you are looking for does not exist, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
