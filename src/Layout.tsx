// Layout.tsx
import { Outlet } from 'react-router-dom';
import Navbar from './partials/Navbar';

const Layout = () => (
  <div className='max-w-screen-2xl mx-auto'>
    <Navbar />
    <main>
      <Outlet /> {/* This will render the routed components */}
    </main>
  </div>
);

export default Layout;
