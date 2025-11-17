import { Outlet } from 'react-router';
import Footer from './Footer';
import NavBar from './NavBar';

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <NavBar />

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          
          <Outlet />

          {/* Footer */}
          <Footer />
        </div>
      </div>

    </div>
  );
};

export default MainLayout;