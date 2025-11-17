import React from 'react';
import { ChevronRight, Leaf, Car, Zap, Home, Globe } from 'lucide-react';

const App = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Image 1 - Factory Emissions */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="bg-linear-to-br from-gray-300 to-gray-400 h-64 flex items-center justify-center">
                <div className="text-center p-4">
                  <Globe className="h-12 w-12 text-gray-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-gray-800">Industrial Emissions</h3>
                  <p className="text-gray-600 mt-2">Manufacturing & Production</p>
                </div>
              </div>
            </div>

            {/* Image 2 - Transportation */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="bg-linear-to-br from-red-300 to-red-400 h-64 flex items-center justify-center">
                <div className="text-center p-4">
                  <Car className="h-12 w-12 text-red-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-gray-800">Transportation</h3>
                  <p className="text-gray-600 mt-2">Cars, Planes & Shipping</p>
                </div>
              </div>
            </div>

            {/* Image 3 - Energy Production */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
              <div className="bg-linear-to-br from-yellow-300 to-yellow-400 h-64 flex items-center justify-center">
                <div className="text-center p-4">
                  <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-gray-800">Energy Production</h3>
                  <p className="text-gray-600 mt-2">Electricity & Heating</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your Carbon Footprint
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Monitor, analyze, and reduce your carbon emissions with our comprehensive tracking platform. 
              Every decision counts in the fight against climate change.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Slide Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Carbon Emissions by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding where your emissions come from is the first step toward reduction
            </p>
          </div>

          <div className="overflow-x-auto pb-8">
            <div className="flex space-x-8 min-w-max">
              {/* Vehicle Emissions Card */}
              <div className="bg-linear-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg min-w-80 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Vehicle Emissions</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Personal Cars</span>
                      <span className="font-semibold text-gray-900">4.2 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Public Transport</span>
                      <span className="font-semibold text-gray-900">1.8 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full" style={{width: '28%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Air Travel</span>
                      <span className="font-semibold text-gray-900">2.1 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: '32%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Electricity Emissions Card */}
              <div className="bg-linear-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg min-w-80 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-green-600 p-3 rounded-lg mr-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Electricity Usage</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Home Electricity</span>
                      <span className="font-semibold text-gray-900">3.8 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '58%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Heating & Cooling</span>
                      <span className="font-semibold text-gray-900">2.4 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full" style={{width: '37%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Appliances</span>
                      <span className="font-semibold text-gray-900">1.2 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{width: '18%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Emissions Card */}
              <div className="bg-linear-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg min-w-80 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-purple-600 p-3 rounded-lg mr-4">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Other Emissions</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Food & Diet</span>
                      <span className="font-semibold text-gray-900">2.9 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{width: '44%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Goods & Services</span>
                      <span className="font-semibold text-gray-900">1.7 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full" style={{width: '26%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Waste Management</span>
                      <span className="font-semibold text-gray-900">0.8 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{width: '12%'}}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Industrial Emissions Card */}
              <div className="bg-linear-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg min-w-80 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-orange-600 p-3 rounded-lg mr-4">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Industrial</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Manufacturing</span>
                      <span className="font-semibold text-gray-900">5.1 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Construction</span>
                      <span className="font-semibold text-gray-900">1.9 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-400 h-2 rounded-full" style={{width: '29%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-700">Agriculture</span>
                      <span className="font-semibold text-gray-900">2.3 tons CO₂</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default App;
