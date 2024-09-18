/* eslint-disable react-refresh/only-export-components */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import './App.css';
import { ErrorBoundary } from 'react-error-boundary';

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
      <div>
        <p>An error occurred: {error.message}</p>
        <button onClick={resetErrorBoundary}>Try again</button>
      </div>
    )}>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </React.Suspense>
    </ErrorBoundary>
  </StrictMode>
);
