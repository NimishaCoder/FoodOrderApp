import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, Sparkles, TrendingUp, Clock, Star, MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { restaurants, categories } from '../data/mockData';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    let filtered = restaurants;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(restaurant => restaurant.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRestaurants(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl md:text-6xl font-black text-gray-900">
              {user ? (
                <>
                  Welcome back, <span className="premium-gradient-text">{user.name.split(' ')[0]}</span>! 👋
                </>
              ) : (
                <>
                  Discover <span className="premium-gradient-text">Amazing Restaurants</span> 👋
                </>
              )}
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore the finest restaurants in your area. From authentic Italian pizzas to spicy Indian curries, 
            find your perfect dining experience.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {[
            { icon: <TrendingUp className="w-6 h-6" />, title: "Top Rated", value: `${restaurants.filter(r => r.rating >= 4.8).length} restaurants`, color: "from-blue-500 to-indigo-600" },
            { icon: <Clock className="w-6 h-6" />, title: "Fast Delivery", value: "15-30 min", color: "from-green-500 to-emerald-600" },
            { icon: <Star className="w-6 h-6" />, title: "Total Restaurants", value: `${restaurants.length} places`, color: "from-yellow-500 to-orange-600" }
          ].map((stat, index) => (
            <div key={index} className="card p-6 text-center group hover:glow-effect">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center text-white mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{stat.title}</h3>
              <p className="text-2xl font-black premium-gradient-text">{stat.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for restaurants, cuisines, or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field pl-12"
            />
          </div>

          {/* Filter Button */}
          <motion.button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-3 px-8 py-4 border border-gray-200/50 rounded-2xl hover:bg-white/80 transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-semibold">Filter</span>
          </motion.button>
        </motion.div>

        {/* Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex overflow-x-auto space-x-4 mb-8 pb-4 scrollbar-hide"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.name)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-3 px-6 py-4 rounded-2xl whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200/50'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-bold">{category.name}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* Restaurants Grid */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedCategory}-${searchTerm}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <RestaurantCard restaurant={restaurant} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredRestaurants.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6 animate-bounce-subtle">🍽️</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No restaurants found</h3>
            <p className="text-gray-600 text-lg max-w-md mx-auto">
              Try adjusting your search criteria or explore different categories to discover amazing restaurants
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;