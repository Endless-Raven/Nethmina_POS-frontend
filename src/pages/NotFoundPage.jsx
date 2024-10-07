import React from "react";


export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 border rounded-lg bg-white shadow-lg">
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          Oops, this file does not exist. Try look for something else.
        </p>
        <a
        href="/"
          className="mt-6 cursor-pointer inline-block px-6 py-3 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}
