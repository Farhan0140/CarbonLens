import { useState, useEffect } from 'react';
import { Car, Zap, Leaf, Scale, Users, Globe, TrendingUp, TrendingDown, Trophy, Star } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function App() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('week');
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mock data for dashboard
  const mockData = {
    totalCO2: 245.8,
    weeklyTrend: -12.5,
    devices: {
      total: 3,
      co2: 8.2
    },
    vehicles: {
      total: 2,
      co2: 47.0
    },
    activities: {
      total: 2,
      co2: 190.6
    },
    dailyData: [
      { date: 'Nov 12', co2: 45.2 },
      { date: 'Nov 13', co2: 38.7 },
      { date: 'Nov 14', co2: 42.1 },
      { date: 'Nov 15', co2: 35.8 },
      { date: 'Nov 16', co2: 28.4 },
      { date: 'Nov 17', co2: 32.1 },
      { date: 'Nov 18', co2: 23.5 }
    ],
    categoryData: [
      { name: 'Food Waste', value: 120.3, color: '#ef4444' },
      { name: 'Plastic', value: 70.3, color: '#3b82f6' },
      { name: 'Vehicles', value: 47.0, color: '#10b981' },
      { name: 'Electricity', value: 8.2, color: '#f59e0b' }
    ],
    globalStats: [
      { title: 'Global CO2 Emissions', value: '36.8B tons', change: '+1.1%', trend: 'up' },
      { title: 'Per Capita Emissions', value: '4.7 tons', change: '-0.3%', trend: 'down' },
      { title: 'Renewable Energy', value: '29%', change: '+2.1%', trend: 'up' },
      { title: 'Forest Loss', value: '10M ha', change: '-1.8%', trend: 'down' }
    ],
    leaderboard: [
      { rank: 1, name: 'Sarah Johnson', co2: 156.2, trend: -15.3, avatar: 'SJ' },
      { rank: 2, name: 'Mike Chen', co2: 189.7, trend: -8.2, avatar: 'MC' },
      { rank: 3, name: 'Emma Rodriguez', co2: 203.1, trend: -12.1, avatar: 'ER' },
      { rank: 4, name: 'David Kim', co2: 245.8, trend: -5.4, avatar: 'DK' },
      { rank: 5, name: 'Lisa Patel', co2: 267.3, trend: -3.8, avatar: 'LP' }
    ],
    tips: [
      {
        id: 1,
        title: "Reduce Food Waste",
        description: "Plan meals ahead and store food properly to reduce waste by up to 30%",
        co2Save: "120 kg CO2/year",
        icon: Scale,
        color: "bg-red-100 text-red-600"
      },
      {
        id: 2,
        title: "Choose Public Transport",
        description: "Using public transport instead of driving can reduce emissions by 76%",
        co2Save: "2.4 tons CO2/year",
        icon: Car,
        color: "bg-blue-100 text-blue-600"
      },
      {
        id: 3,
        title: "Switch to LED Bulbs",
        description: "LED bulbs use 75% less energy and last 25 times longer than incandescent",
        co2Save: "80 kg CO2/year",
        icon: Zap,
        color: "bg-yellow-100 text-yellow-600"
      },
      {
        id: 4,
        title: "Plant Trees",
        description: "A single tree can absorb up to 22 kg of CO2 per year",
        co2Save: "22 kg CO2/tree/year",
        icon: Leaf,
        color: "bg-green-100 text-green-600"
      }
    ]
  };

  // Auto-rotate carousel
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % mockData.tips.length);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentSlide, mockData.tips.length]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toFixed(1);
  };

  const StatCard = ({ title, value, subtitle, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 text-${color}-600`}>{value}</p>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <div className={`bg-${color}-100 p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const GlobalStatCard = ({ stat }) => (
    <div className="bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{stat.title}</p>
          <p className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</p>
        </div>
        <div className={`p-2 rounded-full ${stat.trend === 'up' ? 'bg-red-100' : 'bg-green-100'}`}>
          {stat.trend === 'up' ? (
            <TrendingUp className={`w-5 h-5 ${stat.trend === 'up' ? 'text-red-600' : 'text-green-600'}`} />
          ) : (
            <TrendingDown className={`w-5 h-5 text-green-600`} />
          )}
        </div>
      </div>
      <p className={`text-sm mt-2 ${stat.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
        {stat.change} from last year
      </p>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Carbon Footprint Dashboard</h1>
          <p className="text-gray-600">Track your environmental impact and contribute to a sustainable future</p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex justify-end mb-6">
          <div className="bg-white rounded-lg p-1 flex">
            {['day', 'week', 'month', 'year'].map((timeframe) => (
              <button
                key={timeframe}
                onClick={() => setSelectedTimeframe(timeframe)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === timeframe
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {timeframe.charAt(0).toUpperCase() + timeframe.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total CO2 Emissions"
            value={`${mockData.totalCO2} kg`}
            subtitle={`${mockData.weeklyTrend > 0 ? '+' : ''}${mockData.weeklyTrend}% this week`}
            icon={Leaf}
            color={mockData.weeklyTrend < 0 ? 'green' : 'red'}
          />
          <StatCard
            title="Electricity Usage"
            value={`${mockData.devices.co2} kg`}
            subtitle={`${mockData.devices.total} devices tracked`}
            icon={Zap}
            color="yellow"
          />
          <StatCard
            title="Vehicle Emissions"
            value={`${mockData.vehicles.co2} kg`}
            subtitle={`${mockData.vehicles.total} vehicles`}
            icon={Car}
            color="blue"
          />
          <StatCard
            title="Waste Activities"
            value={`${mockData.activities.co2} kg`}
            subtitle={`${mockData.activities.total} activities`}
            icon={Scale}
            color="red"
          />
        </div>

        {/* Carousel and Leaderboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Tips Carousel */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Leaf className="w-6 h-6 text-green-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Eco Tips & Insights</h3>
            </div>
            
            {/* Carousel */}
            <div className="relative h-48 overflow-hidden rounded-lg">
              {mockData.tips.map((tip, index) => (
                <div
                  key={tip.id}
                  className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                    index === currentSlide ? 'translate-x-0' : 'translate-x-full'
                  }`}
                >
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 h-full flex flex-col justify-between">
                    <div>
                      <div className={`${tip.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                        <tip.icon className="w-6 h-6" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">{tip.title}</h4>
                      <p className="text-gray-600 mb-3">{tip.description}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600">Save {tip.co2Save}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {mockData.tips.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Trophy className="w-6 h-6 text-yellow-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-800">Community Leaderboard</h3>
            </div>
            
            <div className="space-y-3">
              {mockData.leaderboard.map((user, index) => (
                <div key={user.rank} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3 ${
                      user.rank === 1 ? 'bg-yellow-500' : 
                      user.rank === 2 ? 'bg-gray-400' : 
                      user.rank === 3 ? 'bg-amber-700' : 'bg-blue-500'
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">{user.name}</span>
                      <span className="text-sm text-gray-600">{user.co2} kg CO2</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                    <span className="text-green-600 font-medium">{Math.abs(user.trend)}%</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Your Rank: #4</span>
                <Star className="w-4 h-4 text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily CO2 Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Daily CO2 Emissions</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px' 
                    }}
                    formatter={(value) => [`${value} kg`, 'CO2 Emissions']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="co2" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ stroke: '#10b981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: '#059669' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Emissions by Category */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Emissions by Category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {mockData.categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} kg`, 'CO2 Emissions']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb', 
                      borderRadius: '8px' 
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Global Environmental Stats */}
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <Globe className="w-6 h-6 text-blue-600 mr-2" />
            <h2 className="text-2xl font-bold text-gray-800">Global Environmental Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockData.globalStats.map((stat, index) => (
              <GlobalStatCard key={index} stat={stat} />
            ))}
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 mb-8">
          <div className="flex items-center mb-4">
            <Leaf className="w-8 h-8 text-green-600 mr-3" />
            <h3 className="text-xl font-bold text-gray-800">Your Environmental Impact</h3>
          </div>
          <p className="text-gray-700 mb-4">
            You've tracked {mockData.totalCO2} kg of CO2 emissions this period. 
            Your efforts in reducing food waste and choosing sustainable transportation 
            are making a real difference!
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Food Waste: 120.3 kg CO2</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Plastic: 70.3 kg CO2</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Vehicles: 47.0 kg CO2</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Electricity: 8.2 kg CO2</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Car className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Log Vehicle Trip</h4>
            <p className="text-gray-600 text-sm mb-4">Track your car or bike emissions</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Journey
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scale className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Log Waste Activity</h4>
            <p className="text-gray-600 text-sm mb-4">Track food waste, plastic, and more</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Add Activity
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Log Device Usage</h4>
            <p className="text-gray-600 text-sm mb-4">Track electricity consumption</p>
            <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              Add Usage
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
