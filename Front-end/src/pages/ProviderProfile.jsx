import { useParams } from 'react-router-dom';

const ProviderProfile = () => {
  // TODO: Get provider ID from route params
  const { providerId } = useParams();
  
  // TODO: Replace with API call to fetch provider data
  // const [provider, setProvider] = useState(null);
  // useEffect(() => {
  //   fetchProviderData(providerId).then(setProvider);
  // }, [providerId]);

  // Placeholder data - will be replaced with API data
  const provider = {
    id: 'provider-1',
    name: "John's Plumbing Services",
    category: 'Plumber',
    rating: 4.7,
    totalReviews: 127,
    location: 'Downtown, City',
    isAvailable: true,
    availabilityStatus: 'Available now',
    description: 'Professional plumbing services with over 10 years of experience. Specialized in residential and commercial plumbing, leak repairs, pipe installation, and emergency services.',
    services: [
      { name: 'Leak Repair', price: 500, duration: '1-2 hours' },
      { name: 'Pipe Installation', price: 1500, duration: '2-4 hours' },
      { name: 'Drain Cleaning', price: 800, duration: '1 hour' },
      { name: 'Emergency Service', price: 2000, duration: '1-3 hours' },
    ],
    reviews: [
      {
        id: 1,
        customerName: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent service! John arrived on time and fixed the leak quickly. Very professional and reasonably priced.',
      },
      {
        id: 2,
        customerName: 'Michael Chen',
        rating: 4,
        date: '2024-01-10',
        comment: 'Good work, but took a bit longer than expected. Still satisfied with the quality.',
      },
      {
        id: 3,
        customerName: 'Emily Davis',
        rating: 5,
        date: '2024-01-05',
        comment: 'Highly recommend! Fast response and great communication throughout the process.',
      },
    ],
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
      </div>
    );
  };

  const handleRequestService = () => {
    // TODO: Navigate to booking/request page or open booking modal
    // Example: navigate(`/book-service/${provider.id}`);
    console.log('Request service for provider:', provider.id);
  };

  if (!provider) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading provider profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Basic Info Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {provider.name}
                  </h1>
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                      {provider.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {renderStars(provider.rating)}
                      <span className="text-lg font-semibold text-gray-900">
                        {provider.rating}
                      </span>
                      <span className="text-gray-600">
                        ({provider.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-4">
                <svg
                  className="w-5 h-5 mr-2"
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
                <span className="text-lg">{provider.location}</span>
              </div>

              <p className="text-gray-700 leading-relaxed">{provider.description}</p>
            </div>

            {/* Availability Status & Request Button */}
            <div className="md:w-80 flex-shrink-0">
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Availability
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        provider.isAvailable
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {provider.isAvailable ? '●' : '○'} {provider.availabilityStatus}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleRequestService}
                  disabled={!provider.isAvailable}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
                    provider.isAvailable
                      ? 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {provider.isAvailable ? 'Request Service' : 'Currently Unavailable'}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services & Pricing Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Services & Pricing
              </h2>
              <div className="space-y-4">
                {provider.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Duration: {service.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-indigo-600">
                        ₹{service.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Reviews ({provider.reviews.length})
                </h2>
                <div className="flex items-center gap-2">
                  {renderStars(provider.rating)}
                  <span className="text-lg font-semibold text-gray-900">
                    {provider.rating}
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {provider.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {review.customerName}
                        </h4>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                  </div>
                ))}
              </div>

              {/* Load More Reviews Button (Placeholder) */}
              {provider.reviews.length > 3 && (
                <div className="mt-6 text-center">
                  <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                    Load More Reviews
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Additional Info (Optional) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Provider Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Response Time</p>
                  <p className="font-medium text-gray-900">Within 1 hour</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Experience</p>
                  <p className="font-medium text-gray-900">10+ years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Languages</p>
                  <p className="font-medium text-gray-900">English, Hindi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderProfile;

