import { useState, useEffect } from 'react';
import { Plus, Car, Fuel, Leaf, MapPin } from 'lucide-react';
import useActivityContext from '../../hook/useActivityContext';
import apiClient from '../../services/apiClient';

export default function TrackVehiclesActivity() {
  const [usageInputs, setUsageInputs] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [localVehicles, setLocalVehicles] = useState([]);

  const { vehicles } = useActivityContext();

  // Initialize local vehicles from context
  useEffect(() => {
    setLocalVehicles(vehicles);
  }, [vehicles]);

  const handleInputChange = (vehicleId, value) => {
    setUsageInputs(prev => ({
      ...prev,
      [vehicleId]: value
    }));
  };

  const handleSubmit = async (vehicleId) => {
    const distanceInput = usageInputs[vehicleId];
    if (!distanceInput || distanceInput <= 0) {
      alert('Please enter a valid distance (greater than 0)');
      return;
    }

    const distance = parseFloat(distanceInput);
    
    setSubmitting(prev => ({ ...prev, [vehicleId]: true }));
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    try {
      // Find the vehicle to get its mileage for calculations
      const vehicle = localVehicles.find(v => v.id === vehicleId);
      if (!vehicle) {
        throw new Error('Vehicle not found');
      }

      // Calculate fuel used and CO2 emission using the EXACT distance the user entered
      const fuelUsed = distance / vehicle.mileage;
      
      // CO2 emission factors (kg CO2 per liter)
      const co2Factors = {
        'petrol': 2.31,
        'diesel': 2.68,
        'cng': 2.0,
        'electric': 0.0
      };
      
      const co2Factor = co2Factors[vehicle.fuel_type.toLowerCase()] || 2.31; // Default to petrol
      const co2Emission = fuelUsed * co2Factor;

      // Create the usage object with the user's exact input
      const newVehicleUsage = {
        vehicle: vehicleId,
        date: dateStr,
        distance_km: distance, // This is the exact value user entered
        fuel_used: fuelUsed,
        co2_emission: co2Emission,
      };

      // Make API call for persistence (don't rely on its response for UI)
      await apiClient.post(`/vehicles/${vehicleId}/usages/`, {
        vehicle: vehicleId,
        date: dateStr,
        distance_km: distance,
      });

      // Update local state with the EXACT data we calculated from user input
      setLocalVehicles(prevVehicles => 
        prevVehicles.map(vehicle => 
          vehicle.id === vehicleId 
            ? { 
                ...vehicle, 
                usages: [...vehicle.usages, newVehicleUsage] 
              }
            : vehicle
        )
      );

      // Show success feedback
      setSubmitted(prev => ({ ...prev, [vehicleId]: true }));
      
      // Reset states after 2 seconds
      setTimeout(() => {
        setSubmitted(prev => ({ ...prev, [vehicleId]: false }));
        setSubmitting(prev => ({ ...prev, [vehicleId]: false }));
        setUsageInputs(prev => ({ ...prev, [vehicleId]: '' }));
      }, 2000);
    } catch (error) {
      console.log("error from Track Vehicle Activity", error);
      alert('Failed to submit vehicle usage. Please try again.');
      setSubmitting(prev => ({ ...prev, [vehicleId]: false }));
    }
  };

  const getTotalDistance = (usages) => {
    return usages.reduce((sum, usage) => sum + (usage.distance_km || 0), 0);
  };

  const getTotalFuel = (usages) => {
    return usages.reduce((sum, usage) => sum + (usage.fuel_used || 0), 0).toFixed(2);
  };

  const getTotalCO2 = (usages) => {
    return usages.reduce((sum, usage) => sum + (usage.co2_emission || 0), 0).toFixed(2);
  };

  const getVehicleTypeIcon = (vehicleType) => {
    switch (vehicleType.toLowerCase()) {
      case 'car':
        return <Car className="w-6 h-6 text-blue-600" />;
      case 'bike':
      case 'motorcycle':
        return <Car className="w-6 h-6 text-red-600" />;
      default:
        return <Car className="w-6 h-6 text-gray-600" />;
    }
  };

  const getVehicleTypeColor = (vehicleType) => {
    switch (vehicleType.toLowerCase()) {
      case 'car':
        return 'bg-blue-100';
      case 'bike':
      case 'motorcycle':
        return 'bg-red-100';
      default:
        return 'bg-gray-100';
    }
  };

  const getFuelTypeColor = (fuelType) => {
    switch (fuelType.toLowerCase()) {
      case 'petrol':
        return 'text-orange-500';
      case 'diesel':
        return 'text-gray-700';
      case 'cng':
        return 'text-green-500';
      case 'electric':
        return 'text-blue-500';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {localVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{vehicle.name}</h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Car className="w-4 h-4 mr-1 text-blue-500" />
                      <span className="capitalize">{vehicle.vehicle_type}</span>
                      <span className="mx-2">•</span>
                      <Fuel className="w-4 h-4 mr-1" />
                      <span className={`capitalize ${getFuelTypeColor(vehicle.fuel_type)}`}>{vehicle.fuel_type}</span>
                    </div>
                  </div>
                  <div className={getVehicleTypeColor(vehicle.vehicle_type) + " p-2 rounded-lg"}>
                    {getVehicleTypeIcon(vehicle.vehicle_type)}
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>Total Distance</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalDistance(vehicle.usages)} km
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Fuel className="w-4 h-4 mr-2" />
                      <span>Fuel Used</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalFuel(vehicle.usages)} L
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Leaf className="w-4 h-4 mr-2 text-green-500" />
                      <span>CO2 Emission</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalCO2(vehicle.usages)} kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Car className="w-4 h-4 mr-2 text-blue-500" />
                      <span>Mileage</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {vehicle.mileage} km/L
                    </span>
                  </div>
                </div>

                {/* Usage Input Form */}
                <div className="space-y-3">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Distance traveled (km)"
                    value={usageInputs[vehicle.id] || ''}
                    onChange={(e) => handleInputChange(vehicle.id, e.target.value)}
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  
                  <button
                    onClick={() => handleSubmit(vehicle.id)}
                    disabled={submitting[vehicle.id] || submitted[vehicle.id]}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      submitted[vehicle.id]
                        ? 'bg-green-500 text-white'
                        : submitting[vehicle.id]
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {submitted[vehicle.id] ? (
                      <>
                        <span>✓ Submitted!</span>
                      </>
                    ) : submitting[vehicle.id] ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        <span>Log Journey</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {localVehicles.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <Car className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">No vehicles found</h3>
            <p className="text-gray-500">Add your first vehicle to start tracking emissions</p>
          </div>
        )}
      </div>
    </div>
  );
}
