import { useState } from 'react';
import { Link, NavLink } from 'react-router'; // <- Use NavLink
import { Home, BarChart3, Users, Settings, User, LogOut, LayoutDashboard, Leaf } from 'lucide-react';
import useAuthContext from '../hook/useAuthContext';
import { IoLogInSharp } from 'react-icons/io5';
import { CgTrack } from 'react-icons/cg';
import { GoPasskeyFill } from 'react-icons/go';

const NavBar = () => {
  const { user, logOut } = useAuthContext();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const menuItemClasses = (isActive) =>
    `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
      isActive
        ? 'bg-green-50 text-green-700 border-r-2 border-green-600 w-full'
        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
    } ${isCollapsed ? 'justify-center px-2' : ''}`;

  return (
    <div
      className={`bg-white shadow-lg flex flex-col transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
    >
      {/* Logo Section */}
      <div className={`p-4 border-b border-gray-200 transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-6'}`}>
        <NavLink to="/">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && <span className="text-lg font-bold text-gray-800 whitespace-nowrap">Carbon Lens</span>}
          </div>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-6">
        <ul className="space-y-1">
          <li>
            <NavLink to="/" end className={({ isActive }) => menuItemClasses(isActive)}>
              <Home className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Home</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/user-dashboard" className={({ isActive }) => menuItemClasses(isActive)}>
              <BarChart3 className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Activities</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/track-activities" className={({ isActive }) => menuItemClasses(isActive)}>
              <CgTrack className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Track Your Emissions</span>}
            </NavLink>
          </li>

          <li>
            <NavLink to="/authentication" className={({ isActive }) => menuItemClasses(isActive)}>
              <GoPasskeyFill className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Authentication</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Profile Section */}
      <div className={`px-2 py-3 border-t border-gray-200 relative transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {user ? (
          <button
            onClick={toggleProfileMenu}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group ${
              isCollapsed ? 'justify-center p-2' : ''
            }`}
          >
            <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 text-left min-w-0">
                <p className="font-medium text-gray-800 text-sm truncate">{user?.first_name} {user?.last_name}</p>
                <p className="text-xs text-gray-500 truncate">{user?.is_staff ? "Admin" : "User"}</p>
              </div>
            )}
          </button>
        ) : (
          <NavLink
            to="/authentication"
            className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group ${
              isCollapsed ? 'justify-center p-2' : ''
            }`}
          >
            <div className="w-8 h-8 bg-linear-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
              <IoLogInSharp className="text-xl text-white" />
            </div>
            {!isCollapsed && <div className="text-black font-semibold">Log-In</div>}
          </NavLink>
        )}

        {/* Profile Menu */}
        {showProfileMenu && (
          <div className={`absolute bottom-16 ${isCollapsed ? 'left-8 min-w-48' : 'left-4 right-4'} bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20`}>
            <div className="py-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                <User className="w-4 h-4" /><span>Profile</span>
              </button>
              <Link to={"/user-dashboard"}>
                <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                  <LayoutDashboard className="w-4 h-4" /><span>Dashboard</span>
                </button>
              </Link>
              <button
                onClick={() => { logOut(); toggleProfileMenu(); }}
                className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm"
              >
                <LogOut className="w-4 h-4" /><span>Log Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
