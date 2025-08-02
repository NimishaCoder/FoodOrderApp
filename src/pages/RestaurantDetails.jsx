import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, MapPin, Users, ChefHat, Heart, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks/useCart';
import Navbar from '../components/Navbar';
import FoodCard from '../components/FoodCard';
import { restaurants } from '../data/mockData';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const foundRestaurant = restaurants.find(r => r.id === parseInt(id));
    setRestaurant(foundRestaurant);
  }, [id]);

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
            <Link to="/dashboard" className="btn-primary">
              Back to Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getCuisineColor = (cuisine) => {
    switch (cuisine.toLowerCase()) {
      case 'italian':
        return 'bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200';
      case 'indian':
        return 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 border-orange-200';
      case 'japanese':
        return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200';
      case 'american':
        return 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  // Create categories from the foods in this restaurant
  const foodCategories = restaurant.foods.reduce((categories, food) => {
    const category = food.category || 'Other';
    if (!categories.includes(category)) {
      categories.push(category);
    }
    return categories;
  }, []);

  const categories = ['All', ...foodCategories];
  const filteredFoods = selectedCategory === 'All' 
    ? restaurant.foods 
    : restaurant.foods.filter(food => (food.category || 'Other') === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Link 
            to="/dashboard"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Restaurants</span>
          </Link>
        </motion.div>

        {/* Restaurant Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-12"
        >
          <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            {/* Restaurant Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${restaurant.isOpen ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                      {restaurant.isOpen ? 'Open' : 'Closed'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCuisineColor(restaurant.cuisine)}`}>
                      {restaurant.cuisine}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black mb-4">{restaurant.name}</h1>
                  <p className="text-xl text-gray-200 mb-6 max-w-2xl">{restaurant.description}</p>
                  
                  {/* Restaurant Stats */}
                  <div className="flex items-center space-x-8">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold">{restaurant.rating}</span>
                      <span className="text-gray-300">({restaurant.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Min. ${restaurant.minOrder}</span>
                    </div>
                  </div>
                </div>
                
                {/* Like Button */}
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/30 transition-all duration-300 border border-white/30"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-white'}`} />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Menu Categories */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <ChefHat className="w-8 h-8 mr-3 text-blue-600" />
            Menu
          </h2>
          
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 shadow-lg hover:shadow-xl ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white border border-gray-200/50'
                }`}
              >
                <span className="font-bold">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Food Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FoodCard food={food} />
            </motion.div>
          ))}
        </motion.div>

        {/* No Foods Found */}
        {filteredFoods.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No dishes found in this category</h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails; 