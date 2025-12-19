# Karigar - Service Provider Frontend

A modern React + Vite application for service providers to manage their services, availability, bookings, and profile.

## 🚀 Tech Stack

- **React 19.1** - UI library
- **Vite 7** - Build tool and dev server
- **React Router DOM 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API calls

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

## 🛠️ Installation

1. Navigate to the Front-end directory:
```bash
cd Front-end
```

2. Install dependencies:
```bash
npm install
```

## ⚙️ Configuration

Create a `.env` file in the Front-end directory to configure the API base URL:

```env
VITE_API_BASE_URL=http://localhost:8000
```

If not specified, it defaults to `http://localhost:8000`.

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

This will start the Vite dev server, typically at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Project Structure

```
Front-end/
├── public/           # Static assets
├── src/
│   ├── api/         # API service modules
│   ├── components/  # Reusable React components
│   ├── layouts/     # Layout components (Layout, Navbar)
│   ├── pages/       # Page components
│   │   └── provider/ # Provider-specific pages
│   ├── routes/      # Router configuration
│   ├── utils/       # Utility functions and API client
│   ├── App.jsx      # Main App component
│   ├── main.jsx     # Application entry point
│   └── index.css    # Global styles and Tailwind imports
├── index.html       # HTML template
├── package.json     # Dependencies and scripts
└── vite.config.js   # Vite configuration
```

## 🎯 Features

### Service Provider Features

- **Authentication**
  - Login with email and password
  - Register new provider accounts
  - JWT token-based authentication
  - Protected routes

- **Dashboard** - Overview and analytics (placeholder)

- **Profile Management** - Edit provider profile information (placeholder)

- **Services Management** - Add, edit, and manage services (placeholder)

- **Availability** - Set and manage availability schedules (placeholder)

- **Requests** - View and manage service requests (placeholder)

- **History** - View booking and service history (placeholder)

## 🛣️ Routes

- `/login` - Login/Signup page
- `/dashboard` - Provider dashboard
- `/profile` - Provider profile
- `/services` - Services management
- `/availability` - Availability management
- `/requests` - Service requests
- `/history` - Booking history

All routes except `/login` are protected and require authentication.

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in `localStorage` and automatically included in API requests.

### API Client

The API client is located in `src/utils/api.js` and provides:
- Automatic token management
- Error handling
- Base URL configuration
- Authentication helpers

## 🎨 Styling

The project uses Tailwind CSS 4 for styling. Tailwind is configured via the Vite plugin in `vite.config.js`.

Custom styles can be added to `src/index.css` which imports Tailwind.

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Development Notes

- The application is fully responsive and works on all device sizes
- All routes are protected except the login page
- Authentication state is checked on page load
- Automatic redirects for authenticated/unauthenticated users

## 👥 Team

- Faizan
- Hanzla
- Ayesha

## 📄 License

This project is part of Tech Titans Web Hackathon.
