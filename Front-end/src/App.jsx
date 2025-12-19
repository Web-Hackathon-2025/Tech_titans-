<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import BrowseServices from './pages/BrowseServices';
import MyBookings from './pages/MyBookings';
import ProviderProfile from './pages/ProviderProfile';
import CreateServiceRequest from './pages/CreateServiceRequest';
import ReviewSubmission from './pages/ReviewSubmission';
import Signup from './pages/Signup';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse-services" element={<BrowseServices />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/provider/:providerId" element={<ProviderProfile />} />
          <Route path="/request-service/:providerId?" element={<CreateServiceRequest />} />
          <Route path="/review/:bookingId?" element={<ReviewSubmission />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
=======
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return <RouterProvider router={router} />;
>>>>>>> 5c50c9625a6ef305fd3556f2a4d28ce1c999fa00
}

export default App;
