

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="text-center max-w-md">
        {/* 404 Number */}
        <h1 className="text-8xl font-bold text-gray-900 mb-4">
          404
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Page not found
        </h2>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-700 transition"
          >
            Go to Home
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Go Back
          </button>
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-400 mt-10">
          Error code: 404
        </p>
      </div>
    </div>
  );
}
