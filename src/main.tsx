import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from './partials/Navbar.tsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Home from './pages/Home.tsx';
import ListingPage from './pages/ListingPage.tsx';
import AddListing from './pages/AddListing.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/listing",
    element: <ListingPage />
  },
  {
    path: "/addListing",
    element: <AddListing />
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar />
    <div className='max-w-screen-2xl mx-auto'>
      <RouterProvider router={router} />
    </div>
  </StrictMode>,
)
