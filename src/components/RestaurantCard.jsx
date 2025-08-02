import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, MapPin, Users, ChefHat } from 'lucide-react';

const RestaurantCard = ({ restaurant }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <Link to={`/restaurant/${restaurant.id}`} className="block group">
        <div className="card overflow-hidden group-hover:shadow-2xl transition-all duration-500">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${restaurant.isOpen ? 'bg-green-100 text-green-800 border-green-200' : 'bg-red-100 text-red-800 border-red-200'}`}>
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            {/* Cuisine Badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCuisineColor(restaurant.cuisine)}`}>
                {restaurant.cuisine}
              </span>
            </div>

            {/* Restaurant Info Overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-700">{restaurant.rating}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                  {restaurant.description}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Restaurant Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">{restaurant.reviews} reviews</span>
              </div>
            </div>

            {/* Menu Preview */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center">
                <ChefHat className="w-4 h-4 mr-2" />
                Popular Dishes
              </h4>
              <div className="flex space-x-2">
                {restaurant.foods.slice(0, 3).map((food, index) => (
                  <div key={index} className="flex-1 bg-gray-50 rounded-lg p-2">
                    <p className="text-xs font-medium text-gray-700 truncate">{food.name}</p>
                    <p className="text-xs text-gray-500">${food.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Min. order: <span className="font-semibold text-gray-900">${restaurant.minOrder}</span>
              </div>
              <div className="text-sm text-gray-600">
                {restaurant.foods.length} items
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RestaurantCard; 