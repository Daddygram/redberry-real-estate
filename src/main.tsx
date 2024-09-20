/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';
import { Loader } from './components/Loader';

// Lazy load components
const Layout = React.lazy(() => import('./Layout'));
const Home = React.lazy(() => import('./pages/Home'));
const ListingPage = React.lazy(() => import('./pages/ListingPage'));
const AddListing = React.lazy(() => import('./pages/AddListing'));

// Define routes with Layout as the parent component
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout component will include Navbar and routes
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'listing/:listingId',
        element: <ListingPage />,
      },
      {
        path: 'addListing',
        element: <AddListing />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary fallbackRender={({ error, resetErrorBoundary }) => (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Oops! Something went wrong.</h1>
        <p>{error.message}</p>
        <button onClick={() => window.location.href = '/'}>Go to Home</button>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )}>
      <React.Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ErrorBoundary>
  </StrictMode>
);
