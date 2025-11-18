import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Leaf, Lightbulb, Trophy, TreePine, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import useActivityContext from '../hook/useActivityContext';
import { useEffect, useState } from 'react';
import useAuthContext from '../hook/useAuthContext';

const UserDashboard = () => {
  const {user} = useAuthContext();
  const {totalActivityEmission, totalDevicesEmission, totalVehiclesEmission} = useActivityContext();
  const [totalCo2Emission, setTotalCo2Emission] = useState(0);

  useEffect(() => {
    const total = (totalActivityEmission + totalDevicesEmission + totalVehiclesEmission).toFixed(2);
    setTotalCo2Emission(total);
  }, [totalActivityEmission, totalDevicesEmission, totalVehiclesEmission])

  // Today's activity logs
  const todayLogs = [
    { id: 1, activity: "Drove by vehicles", co2: totalVehiclesEmission, category: "transport", color: '#FF6B6B' },
    { id: 2, activity: "Used electricity", co2: totalDevicesEmission, category: "energy", color: '#4ECDC4' },
    { id: 3, activity: "Others", co2: totalActivityEmission, category: "food", color: '#45B7D1' },
  ];

  // Emissions by category - TODAY ONLY
  const emissionsData = [
    { name: 'Transport', value: totalVehiclesEmission, color: '#FF6B6B' },
    { name: 'Electronic Devices', value: totalDevicesEmission, color: '#4ECDC4' },
    { name: 'Lifestyle', value: totalActivityEmission, color: '#45B7D1' },
  ].filter(d => d.value > 0);

  // Fun suggestions
  const suggestions = [
    "🚲 Try biking to work tomorrow - you'll cut 2.3 kg CO₂e and get fit!",
    "💡 Switch to LED bulbs - bright idea, low emissions!",
    "🥦 Add one more plant-based meal this week - Earth (and your gut) will thank you!",
    "🔌 Unplug idle devices - phantom power is real (and sneaky)!"
  ];

  // Environmental impact score
  const impactScore = Math.min(100, Math.max(0, 100 - (totalCo2Emission / 4800) * 100));
  const isEcoFriendly = impactScore > 70;

  // Trees needed
  const treesNeeded = Math.ceil(totalCo2Emission / 22);

  // Greeting
  const now = new Date();
  const hour = now.getHours();
  let greeting;
  if (hour < 12) greeting = `Good morning, ${user?.first_name} ${user?.last_name}! 🌞`;
  else if (hour < 17) greeting = `Good afternoon,  ${user?.first_name} ${user?.last_name}! ☀️`;
  else greeting = `Good evening,  ${user?.first_name} ${user?.last_name}! 🌙`;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50 to-cyan-100 font-sans">
      {/* Greeting Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-linear-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-6 text-center shadow-xl"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center justify-center gap-3">
          <Leaf size={40} />
          {greeting}
        </h1>
        <p className="mt-2 text-lg opacity-95 font-medium max-w-2xl mx-auto">
          You're making a real difference—one green choice at a time! 🌍
        </p>
      </motion.div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Environmental Impact Score */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`rounded-3xl p-7 mb-10 text-center shadow-2xl ${
            isEcoFriendly 
              ? 'bg-linear-to-br from-green-100 via-emerald-100 to-teal-100 border-2 border-emerald-200' 
              : 'bg-linear-to-br from-amber-100 via-orange-100 to-red-100 border-2 border-amber-200'
          }`}
        >
          <div className="flex flex-col items-center">
            <Trophy size={50} className={isEcoFriendly ? "text-emerald-600" : "text-amber-600"} />
            <h2 className="text-2xl font-bold text-gray-800 mt-3">Your Environmental Impact Score</h2>
            <div className="mt-5">
              <span className="text-6xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-emerald-600 to-teal-700">
                {Math.round(impactScore)}
              </span>
              <span className="text-gray-600 ml-3">/100</span>
            </div>
            <p className="mt-3 text-lg text-gray-700 max-w-2xl px-4 font-medium">
              {isEcoFriendly 
                ? "🌿 Amazing! You're a true eco-champion in this year" 
                : "🌱 Great start! Keep going—you're on the right path."}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Your footprint: <span className="font-semibold">{totalActivityEmission} kg CO₂e</span> • National avg: 2,920 kg
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Charts & Logs */}
          <div className="lg:col-span-2 space-y-8">
            {/* Enhanced Pie Chart with vibrant background */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl shadow-2xl p-7 border border-white/70 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar size={28} className="text-indigo-600" />
                  Total Emissions Breakdown
                </h3>
                <div className="bg-white/80 px-4 py-2 rounded-full shadow-sm">
                  <span className="font-bold text-indigo-700">{totalCo2Emission} kg CO₂e</span>
                </div>
              </div>
              <div className="h-96 flex items-center justify-center relative">
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/30 to-transparent blur-sm"></div>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <defs>
                      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.15" />
                      </filter>
                    </defs>
                    <Pie
                      data={emissionsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={90}
                      outerRadius={130}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      labelLine={({ percent }) => percent > 0.04}
                      filter="url(#shadow)"
                    >
                      {emissionsData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color} 
                          stroke="white"
                          strokeWidth={3}
                        />
                      ))}
                    </Pie>
                    <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-center">
                      <tspan x="50%" dy="-0.6em" className="text-3xl font-extrabold fill-gray-900">{totalCo2Emission}</tspan>
                      <tspan x="50%" dy="1.4em" className="text-lg font-semibold fill-gray-700">kg CO₂e</tspan>
                      <tspan x="50%" dy="1.4em" className="text-sm fill-gray-600">Today's Total</tspan>
                    </text>
                    <Tooltip 
                      formatter={(value) => [`${value} kg CO₂e`, 'Emissions']}
                      labelFormatter={(name) => `Category: ${name}`}
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '16px',
                        border: 'none',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        fontSize: '14px',
                        fontWeight: '600',
                        padding: '12px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Colorful Activity Log */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/50"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Activities</h3>
              <div className="space-y-4">
                {todayLogs.map((log) => (
                  <motion.div 
                    key={log.id}
                    whileHover={{ scale: 1.01 }}
                    className="flex justify-between items-center p-4 rounded-2xl shadow-sm border-l-4 transition-all duration-300"
                    style={{ borderLeftColor: log.color, backgroundColor: `${log.color}10` }}
                  >
                    <div>
                      <span className="font-semibold text-gray-800">{log.activity}</span>
                      <div className="mt-1">
                        <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ backgroundColor: `${log.color}25`, color: log.color }}>
                          {log.category.charAt(0).toUpperCase() + log.category.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold" style={{ color: log.color }}>{log.co2} kg</span>
                      <p className="text-xs text-gray-600 mt-1">CO₂e</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Suggestions & Trees */}
          <div className="space-y-8">
            {/* Tree Offset Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-linear-to-br from-green-600 to-emerald-700 text-white rounded-3xl shadow-2xl p-7 text-center"
            >
              <div className="flex flex-col items-center">
                <TreePine size={50} className="text-white drop-shadow-lg" />
                <h3 className="text-2xl font-bold mt-3">Offset Your Footprint</h3>
                <p className="mt-4 text-lg opacity-95">
                  To neutralize total emissions, you'd need to plant
                </p>
                <div className="mt-3">
                  <span className="text-5xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-yellow-200 to-amber-200">
                    {treesNeeded}
                  </span>
                  <span className="block mt-1 text-lg">tree{treesNeeded > 1 ? 's' : ''}</span>
                </div>
                <p className="mt-3 text-sm opacity-85 max-w-xs">
                  *Based on average annual CO₂ absorption of a mature tree (~22 kg/year)
                </p>
                <button className="mt-5 bg-white text-emerald-800 font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-gray-100 transition transform hover:scale-105">
                  🌱 Plant Trees with Our Partners
                </button>
              </div>
            </motion.div>

            {/* Fun Eco Suggestions */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 border border-white/50"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Lightbulb className="text-yellow-500" size={26} />
                Fun Ways to Reduce Emissions
              </h3>
              <div className="space-y-4">
                {suggestions.map((suggestion, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 bg-linear-to-r from-yellow-50/90 to-amber-50/90 rounded-2xl border border-yellow-200/70 shadow-sm"
                  >
                    <p className="text-gray-800 font-medium">{suggestion}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Eco Fact */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-linear-to-br from-blue-600 to-cyan-600 text-white rounded-3xl p-6 shadow-2xl"
            >
              <p className="text-center italic text-white font-medium">
                💡 <strong>Did you know?</strong> If everyone reduced their daily footprint by just 1 kg CO₂e, 
                we'd cut global emissions by over 7 billion tons per year!
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;