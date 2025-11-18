import { useState } from 'react';
import { Home, BarChart3, Users, Settings, User, LogOut, LayoutDashboard, Leaf } from 'lucide-react';
import { Link } from 'react-router';
import useAuthContext from '../hook/useAuthContext';
import { IoLogInSharp } from 'react-icons/io5';

const NavBar = () => {

  const {user, logOut} = useAuthContext();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeMenu, setActiveMenu] = useState("home"); // active menu

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  // Helper classes for active/inactive state
  const menuItemClasses = (menu) =>
    `flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group ${
      activeMenu === menu
        ? "bg-green-50 text-green-700 border-r-2 border-green-600 w-full"
        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
        <Link to={"/"}>
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <span className="text-lg font-bold text-gray-800 whitespace-nowrap">Carbon Lens</span>
            )}
          </div>
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-2 py-6">
        <ul className="space-y-1">

          {/* Home */}
          <li>
            <button
              onClick={() => setActiveMenu("home")}
              className={menuItemClasses("home")}
            >
              <Home className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Home</span>}
            </button>
          </li>

          {/* Analytics */}
          <li>
            <button
              onClick={() => setActiveMenu("analytics")}
              className={menuItemClasses("analytics")}
            >
              <BarChart3 className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Analytics</span>}
            </button>
          </li>

          {/* Teams */}
          <li>
            <button
              onClick={() => setActiveMenu("teams")}
              className={menuItemClasses("teams")}
            >
              <Users className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Teams</span>}
            </button>
          </li>

          {/* Settings */}
          <li>
            <button
              onClick={() => setActiveMenu("settings")}
              className={menuItemClasses("settings")}
            >
              <Settings className={`w-5 h-5 ${isCollapsed ? 'mx-auto' : ''}`} />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">Settings</span>}
            </button>
          </li>

        </ul>
      </nav>

      {/* Profile Section */}


      <div className={`px-2 py-3 border-t border-gray-200 relative transition-all duration-300 ${isCollapsed ? 'px-2' : 'px-4'}`}>
        {
          user ? (
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
                  <p className="text-xs text-gray-500 truncate">{user?.is_staff ? "Admin": "User"}</p>
                </div>
              )}
            </button>
          ) : (
            <Link to={"authentication"}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group ${
                isCollapsed ? 'justify-center p-2' : ''
              }`}
            >
              <div className="w-8 h-8 bg-linear-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center">
                <IoLogInSharp className="text-xl text-white" />
              </div>

              {!isCollapsed && (
                <div className="text-black font-semibold">
                  Log-In
                </div>
              )}
            </Link>
          )
        }



        {/* Profile Menu (Expanded) */}
        {showProfileMenu && !isCollapsed && (
          <div className="absolute bottom-16 left-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20">
            <div className="py-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                <User className="w-4 h-4" /><span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                <LayoutDashboard className="w-4 h-4" /><span>Dashboard</span>
              </button>
              <button onClick={() => {logOut(); toggleProfileMenu(); }}  className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                <LogOut className="w-4 h-4" /><span>Log Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Profile Menu (Collapsed) */}
        {showProfileMenu && isCollapsed && (
          <div className="absolute bottom-16 left-8 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-20 min-w-48">
            <div className="py-2">
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                <User className="w-4 h-4" /><span>Profile</span>
              </button>
              <button className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
                <LayoutDashboard className="w-4 h-4" /><span>Dashboard</span>
              </button>
              <button onClick={() => {logOut(); toggleProfileMenu(); }} className="w-full flex items-center space-x-3 px-4 py-2.5 text-gray-700 hover:bg-gray-50 text-sm">
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
