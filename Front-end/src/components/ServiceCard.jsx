const ServiceCard = ({
  providerName,
  category,
  location,
  price,
  rating,
  onViewProfile,
}) => {
  const handleViewProfile = () => {
    // TODO: Replace with actual navigation to provider profile page
    if (onViewProfile) {
      onViewProfile();
    } else {
      console.log('View profile clicked for:', providerName);
    }
  };

  // Render star rating
  const renderStars = (rating) => {
    const fullStars = Math.round(rating);
    const emptyStars = 5 - fullStars;

    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <svg
            key={`full-${i}`}
            className="w-5 h-5 text-yellow-400 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {[...Array(emptyStars)].map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-5 h-5 text-gray-300 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        <span className="ml-2 text-sm text-gray-600 font-medium">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100">
      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {providerName}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {category}
            </span>
            <span className="flex items-center text-gray-500">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="mb-4">{renderStars(rating)}</div>

        {/* Price Section */}
        <div className="mb-6">
          <div className="flex items-baseline">
            <span className="text-2xl font-bold text-gray-900">₹{price}</span>
            <span className="ml-2 text-sm text-gray-500">per service</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleViewProfile}
          className="w-full bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;

