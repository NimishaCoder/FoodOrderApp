import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Plus, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const FoodCard = ({ food }) => {
  const { addToCart, isUserLoggedIn } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isUserLoggedIn()) {
      setShowLoginPrompt(true);
      // Hide the prompt after 3 seconds
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    
    try {
      addToCart(food);
      setShowSuccessMessage(true);
      // Hide the success message after 2 seconds
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner':
        return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200';
      default:
        return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="relative group"
    >
      <Link to={`/food/${food.id}`} className="block">
        <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
          {/* Image Container */}
          <div className="relative overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* Rating Badge */}
            <div className="absolute top-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-bold text-gray-900">{food.rating}</span>
            </div>

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <motion.button
                onClick={handleLike}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
              </motion.button>
              
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 text-white"
              >
                <Plus className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Price Badge */}
            <div className="absolute bottom-4 left-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg">
                ₹{food.price}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {food.name}
              </h3>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {food.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{food.cookTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span>{food.reviews} reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Login Prompt */}
      {showLoginPrompt && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg z-50 min-w-64"
        >
          <div className="flex items-center space-x-2 mb-3">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-800">Please login to add items to cart</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => navigate('/login')}
              className="text-xs bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="text-xs text-red-600 hover:text-red-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg z-50 min-w-64"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">Added to cart successfully!</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FoodCard;