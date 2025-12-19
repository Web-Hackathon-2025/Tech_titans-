import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ReviewSubmission = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!rating) newErrors.rating = 'Please select a rating.';
    if (!comment.trim()) newErrors.comment = 'Please enter your feedback.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const payload = {
      bookingId,
      rating,
      comment: comment.trim(),
    };

    if (API_BASE) {
      (async () => {
        try {
          const response = await fetch(`${API_BASE}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
          });
          if (!response.ok) throw new Error('Failed to submit review');
        } catch (error) {
          console.error('Error submitting review:', error);
        } finally {
          setIsSubmitting(false);
          setSubmitted(true);
          setComment('');
          setRating(0);
          setHoverRating(0);
        }
      })();
    } else {
      // Placeholder logging when API base is not set
      console.log('Review submitted:', payload);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setComment('');
        setRating(0);
        setHoverRating(0);
      }, 600);
    }
  };

  const renderStars = () => {
    const stars = [1, 2, 3, 4, 5];
    return stars.map((star) => (
      <button
        key={star}
        type="button"
        onClick={() => setRating(star)}
        onMouseEnter={() => setHoverRating(star)}
        onMouseLeave={() => setHoverRating(0)}
        className="focus:outline-none"
        aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
      >
        <svg
          className={`w-10 h-10 ${
            (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      </button>
    ));
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Submit a Review</h1>
          <p className="text-lg text-gray-600">
            Share your experience to help others choose the right provider.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Your Rating <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">{renderStars()}</div>
              {errors.rating && (
                <p className="mt-2 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>

            {/* Comment Input */}
            <div>
              <label
                htmlFor="comment"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Comment <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={5}
                placeholder="Tell us about the service, communication, punctuality, and quality."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition resize-none"
              />
              {errors.comment && (
                <p className="mt-2 text-sm text-red-600">{errors.comment}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-colors ${
                  isSubmitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>

          {/* Success Message */}
          {submitted && (
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">
                    Thanks for your feedback! Your review has been recorded.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewSubmission;

