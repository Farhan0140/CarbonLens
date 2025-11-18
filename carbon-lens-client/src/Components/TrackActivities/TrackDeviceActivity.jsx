import { useState, useEffect } from 'react';
import { Plus, Zap, Leaf, Clock } from 'lucide-react';
import useActivityContext from '../../hook/useActivityContext';
import apiClient from '../../services/apiClient';

export default function TrackDeviceActivity() {
  const [usageInputs, setUsageInputs] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [localDevices, setLocalDevices] = useState([]);

  const { devices } = useActivityContext();

  // Initialize local devices from context
  useEffect(() => {
    setLocalDevices(devices);
  }, [devices]);

  const handleInputChange = (deviceId, value) => {
    setUsageInputs(prev => ({
      ...prev,
      [deviceId]: value
    }));
  };

  const handleSubmit = async (deviceId) => {
    const hoursInput = usageInputs[deviceId];
    if (!hoursInput || hoursInput <= 0) {
      alert('Please enter a valid number of hours (greater than 0)');
      return;
    }

    const hours = parseFloat(hoursInput);
    
    setSubmitting(prev => ({ ...prev, [deviceId]: true }));
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    try {
      // Find the device to get its wattage for calculations
      const device = localDevices.find(d => d.id === deviceId);
      if (!device) {
        throw new Error('Device not found');
      }

      // Calculate energy and CO2 using the EXACT hours the user entered
      const wattageInKw = device.wattage / 1000;
      const kwhUsed = wattageInKw * hours;
      const co2Emission = kwhUsed * 0.475; // Adjust this factor as needed

      // Create the usage object with the user's exact input
      const newUserUsage = {
        device: deviceId,
        date: dateStr,
        hours_used: hours, // This is the exact value user entered
        kwh_used: kwhUsed,
        co2_emission: co2Emission,
      };

      // Make API call for persistence (don't rely on its response for UI)
      await apiClient.post(`/devices/${deviceId}/usages/`, {
        device: deviceId,
        date: dateStr,
        hours_used: hours,
      });

      // Update local state with the EXACT data we calculated from user input
      setLocalDevices(prevDevices => 
        prevDevices.map(device => 
          device.id === deviceId 
            ? { 
                ...device, 
                usages: [...device.usages, newUserUsage] 
              }
            : device
        )
      );

      // Show success feedback
      setSubmitted(prev => ({ ...prev, [deviceId]: true }));
      
      // Reset states after 2 seconds
      setTimeout(() => {
        setSubmitted(prev => ({ ...prev, [deviceId]: false }));
        setSubmitting(prev => ({ ...prev, [deviceId]: false })); // This was missing!
        setUsageInputs(prev => ({ ...prev, [deviceId]: '' }));
      }, 2000);
    } catch (error) {
      console.log("error from Track Device Activity", error);
      alert('Failed to submit usage. Please try again.');
      setSubmitting(prev => ({ ...prev, [deviceId]: false })); // Reset on error too
    }
  };

  const getTotalUsage = (usages) => {
    return usages.reduce((sum, usage) => sum + (usage.hours_used || 0), 0);
  };

  const getTotalEnergy = (usages) => {
    return usages.reduce((sum, usage) => sum + (usage.kwh_used || 0), 0).toFixed(2);
  };

  const getTotalCO2 = (usages) => {
    return usages.reduce((sum, usage) => sum + (usage.co2_emission || 0), 0).toFixed(2);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {localDevices.map((device) => (
            <div key={device.id} className="bg-white rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{device.name}</h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>{device.wattage}W</span>
                    </div>
                  </div>
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Total Hours</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalUsage(device.usages)}h
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                      <span>Energy Used</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalEnergy(device.usages)} kWh
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Leaf className="w-4 h-4 mr-2 text-green-500" />
                      <span>CO2 Emission</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalCO2(device.usages)} kg
                    </span>
                  </div>
                </div>

                {/* Usage Input Form */}
                <div className="space-y-3">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Hours used today"
                    value={usageInputs[device.id] || ''}
                    onChange={(e) => handleInputChange(device.id, e.target.value)}
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <button
                    onClick={() => handleSubmit(device.id)}
                    disabled={submitting[device.id] || submitted[device.id]}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      submitted[device.id]
                        ? 'bg-green-500 text-white'
                        : submitting[device.id]
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {submitted[device.id] ? (
                      <>
                        <span>✓ Submitted!</span>
                      </>
                    ) : submitting[device.id] ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        <span>Log Usage</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {localDevices.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <Zap className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">No devices found</h3>
            <p className="text-gray-500">Add your first device to start tracking usage</p>
          </div>
        )}
      </div>
    </div>
  );
}
