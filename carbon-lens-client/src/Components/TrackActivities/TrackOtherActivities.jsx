import { useState, useEffect } from 'react';
import { Plus, Leaf, Scale } from 'lucide-react';
import useActivityContext from '../../hook/useActivityContext';
import apiClient from '../../services/apiClient';

export default function TrackOtherActivities() {
  const [usageInputs, setUsageInputs] = useState({});
  const [submitting, setSubmitting] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [localActivities, setLocalActivities] = useState([]);

  const { activities } = useActivityContext();

  // Initialize local activities from context
  useEffect(() => {
    setLocalActivities(activities);
  }, [activities]);

  const handleInputChange = (activityId, value) => {
    setUsageInputs(prev => ({
      ...prev,
      [activityId]: value
    }));
  };

  const handleSubmit = async (activityId) => {
    const amountInput = usageInputs[activityId];
    if (!amountInput || amountInput <= 0) {
      alert('Please enter a valid amount (greater than 0)');
      return;
    }

    const amount = parseFloat(amountInput);
    
    setSubmitting(prev => ({ ...prev, [activityId]: true }));
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];

    try {
      // Find the activity to get its emission factor
      const activity = localActivities.find(a => a.id === activityId);
      if (!activity) {
        throw new Error('Activity not found');
      }

      // Calculate CO2 emission using the EXACT amount the user entered
      const co2Emission = activity.emission_factor * amount;

      // Create the usage object with the user's exact input
      const newActivityUsage = {
        activity: activityId,
        date: dateStr,
        amount: amount, // This is the exact value user entered
        co2_emission: co2Emission,
      };

      // Make API call for persistence
      await apiClient.post(`/activities/${activityId}/records/`, {
        activity: activityId,
        date: dateStr,
        quantity: amount,
      });

      // Update local state with the EXACT data we calculated from user input
      setLocalActivities(prevActivities => 
        prevActivities.map(activity => 
          activity.id === activityId 
            ? { 
                ...activity, 
                usages: [...(activity.usages || []), newActivityUsage] 
              }
            : activity
        )
      );

      // Show success feedback
      setSubmitted(prev => ({ ...prev, [activityId]: true }));
      
      // Reset input after 2 seconds
      setTimeout(() => {
        setSubmitted(prev => ({ ...prev, [activityId]: false }));
        setUsageInputs(prev => ({ ...prev, [activityId]: '' }));
      }, 2000);
    } catch (error) {
      console.log("error from Track Waste Activity", error);
      alert('Failed to submit activity. Please try again.\nYou have to remember that in an activity, you can only add one time');
      setSubmitting(prev => ({ ...prev, [activityId]: false }));
    }
  };

  const getTotalAmount = (usages) => {
    return (usages || []).reduce((sum, usage) => sum + (usage.amount || 0), 0);
  };

  const getTotalCO2 = (usages) => {
    return (usages || []).reduce((sum, usage) => sum + (usage.co2_emission || 0), 0).toFixed(2);
  };

  // Get category display names
  const getCategoryDisplayName = (category) => {
    const categoryMap = {
      'food_waste': 'Food Waste',
      'plastic_bottle': 'Plastic Bottle',
      'cooking_gas': 'Cooking Gas'
    };
    return categoryMap[category] || category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="min-h-screen">
      <h1 className='text-black'>akflkasdfjsdkf</h1>
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          {localActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-xl shadow-xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 capitalize">{activity.name}</h2>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Scale className="w-4 h-4 mr-1 text-green-500" />
                      <span>{getCategoryDisplayName(activity.category)}</span>
                    </div>
                  </div>
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                </div>

                {/* Usage Statistics */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Scale className="w-4 h-4 mr-2" />
                      <span>Total {activity.unit}</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalAmount(activity.usages)} {activity.unit}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Leaf className="w-4 h-4 mr-2 text-green-500" />
                      <span>CO2 Emission</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {getTotalCO2(activity.usages)} kg
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-600">
                      <Scale className="w-4 h-4 mr-2 text-yellow-500" />
                      <span>Emission Factor</span>
                    </div>
                    <span className="font-semibold text-gray-800">
                      {activity.emission_factor} kg CO2/{activity.unit}
                    </span>
                  </div>
                </div>

                {/* Usage Input Form */}
                <div className="space-y-3">
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder={`Amount in ${activity.unit}`}
                    value={usageInputs[activity.id] || ''}
                    onChange={(e) => handleInputChange(activity.id, e.target.value)}
                    className="text-black w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <button
                    onClick={() => handleSubmit(activity.id)}
                    disabled={submitting[activity.id] || submitted[activity.id]}
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      submitted[activity.id]
                        ? 'bg-green-500 text-white'
                        : submitting[activity.id]
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {submitted[activity.id] ? (
                      <>
                        <span>✓ Submitted!</span>
                      </>
                    ) : submitting[activity.id] ? (
                      <span>Submitting...</span>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        <span>Log Activity</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {localActivities.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full p-4 inline-block mb-4">
              <Leaf className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-600">No activities found</h3>
            <p className="text-gray-500">Add your first activity to start tracking emissions</p>
          </div>
        )}
      </div>
    </div>
  );
}
