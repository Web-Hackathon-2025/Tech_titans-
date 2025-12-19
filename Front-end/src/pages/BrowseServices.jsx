import { useState, useEffect } from 'react';
import ServiceCard from '../components/ServiceCard';

const BrowseServices = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState('');
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Available categories for filter dropdown
  const categories = [
    { id: '', name: 'All Categories' },
    { id: 'plumber', name: 'Plumber' },
    { id: 'electrician', name: 'Electrician' },
    { id: 'cleaner', name: 'Cleaner' },
    { id: 'tutor', name: 'Tutor' },
  ];

  // TODO: API Integration Point 1 - Fetch services on component mount
  // Replace this useEffect with actual API call
  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // TODO: Replace with actual API endpoint
        // Example: const response = await fetch(`/api/services?category=${selectedCategory}&location=${location}`);
        // const data = await response.json();
        // setServices(data);
        
        // Placeholder: Empty array to show empty state initially
        setServices([]);
      } catch (err) {
        setError('Failed to load services. Please try again later.');
        console.error('Error fetching services:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, [selectedCategory, location]); // Re-fetch when filters change

  // TODO: API Integration Point 2 - Handle filter changes
  // This useEffect will trigger API calls when filters change
  // The API should accept category and location as query parameters

  const handleViewProfile = (providerId) => {
    // TODO: Navigate to provider profile page
    // Example: navigate(`/provider/${providerId}`);
    console.log('Navigate to provider profile:', providerId);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Browse Services</h1>
          <p className="text-lg text-gray-600">
            Find the perfect service provider for your needs
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Input */}
            <div>
              <label
                htmlFor="location-filter"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                type="text"
                id="location-filter"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter area or city"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Services Grid */}
        {!isLoading && !error && services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                providerName={service.providerName}
                category={service.category}
                location={service.location}
                price={service.price}
                rating={service.rating}
                onViewProfile={() => handleViewProfile(service.id)}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && services.length === 0 && (
          <div className="text-center py-16 bg-white rounded-lg shadow-md">
            <svg
              className="mx-auto h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-xl font-semibold text-gray-900">
              No services found
            </h3>
            <p className="mt-2 text-gray-600 max-w-sm mx-auto">
              {selectedCategory || location
                ? 'Try adjusting your filters to see more results.'
                : 'No service providers are available at the moment. Check back later!'}
            </p>
            {(selectedCategory || location) && (
              <button
                onClick={() => {
                  setSelectedCategory('');
                  setLocation('');
                }}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseServices;

