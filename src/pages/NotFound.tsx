import { Link } from "react-router";

function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[70vh] px-4">
      <h2 className="text-8xl font-bold text-blue-600">404</h2>
      <h2 className="text-2xl font-bold text-[#1A202C] mt-4">Page Not Found</h2>
      <p className="text-gray-500 mt-2 max-w-md">
        Sorry, the page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
      >
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
