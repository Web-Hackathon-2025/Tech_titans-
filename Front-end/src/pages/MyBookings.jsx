import { useEffect, useState } from 'react';
import BookingCard from '../components/BookingCard';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: API Integration - Fetch bookings for the logged-in customer
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Example API call (replace when backend is ready):
        // const response = await fetch('/api/bookings/me');
        // const data = await response.json();
        // setBookings(data);
        setBookings([]);
      } catch (err) {
        console.error('Error loading bookings:', err);
        setError('Unable to load your bookings. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (bookingId) => {
    // TODO: Navigate to booking detail page
    console.log('View booking details for:', bookingId);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          <p className="mt-4 text-gray-600">Loading your bookings...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      );
    }

    if (bookings.length === 0) {
      return (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100">
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
          <h3 className="mt-4 text-xl font-semibold text-gray-900">No bookings yet</h3>
          <p className="mt-2 text-gray-600 max-w-sm mx-auto">
            When you request a service, your bookings will appear here. Start by browsing services.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            bookingId={booking.id}
            providerName={booking.providerName}
            serviceName={booking.serviceName}
            date={booking.date}
            time={booking.time}
            status={booking.status}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Bookings</h1>
          <p className="text-lg text-gray-600">
            Track your service requests and their progress.
          </p>
        </div>

        {/* Status flow explanation */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">Booking status flow</h2>
          <p className="text-sm text-gray-700">
            Requested → Confirmed → Completed. If a booking is cancelled, the status will show as
            Cancelled. You can view details for each booking to see provider updates.
          </p>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default MyBookings;

