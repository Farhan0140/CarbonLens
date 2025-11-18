import { Leaf } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <div>
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-600 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold">CarbonTracker</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Empowering individuals and organizations to monitor, understand, and reduce their carbon footprint 
                through innovative tracking and analytics solutions.
              </p>
              <div className="flex space-x-4">
                <Link to={"/"}>
                  <div className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg font-medium transition-colors">
                    Start Tracking
                  </div>
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Analytics</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Reports</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 CarbonTracker. All rights reserved. Making carbon tracking accessible for everyone.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;