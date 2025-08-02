import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Clock, Users, Plus, Minus, ShoppingCart, Heart, AlertCircle, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import { restaurants } from '../data/mockData';
import { useCart } from '../hooks/useCart';

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, isUserLoggedIn } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [food, setFood] = useState(null);
  const [restaurant, setRestaurant] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    // Find the food in all restaurants
    let foundFood = null;
    let foundRestaurant = null;
    
    for (const rest of restaurants) {
      const foodItem = rest.foods.find(f => f.id === parseInt(id));
      if (foodItem) {
        foundFood = foodItem;
        foundRestaurant = rest;
        break;
      }
    }
    
    setFood(foundFood);
    setRestaurant(foundRestaurant);
  }, [id]);

  if (!food || !restaurant) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Food item not found</h1>
            <Link to="/dashboard" className="btn-primary">
              Back to Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!isUserLoggedIn()) {
      setShowLoginPrompt(true);
      // Hide the prompt after 3 seconds
      setTimeout(() => setShowLoginPrompt(false), 3000);
      return;
    }
    
    try {
      addToCart(food, quantity);
      setShowSuccessMessage(true);
      // Hide the success message after 2 seconds
      setTimeout(() => setShowSuccessMessage(false), 2000);
      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
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
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Food Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={food.image}
                alt={food.name}
                className="w-full h-96 object-cover"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              
              {/* Action Buttons */}
              <div className="absolute top-6 right-6 flex space-x-3">
                <motion.button
                  onClick={() => setIsLiked(!isLiked)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                </motion.button>
              </div>
              
              {/* Price Badge */}
              <div className="absolute bottom-6 left-6">
                <span className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl rounded-2xl shadow-lg">
                  ₹{food.price}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Food Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-4">{food.name}</h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{food.description}</p>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(food.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900 ml-2">
                    {food.rating || 0}
                  </span>
                  <span className="text-gray-500">({food.reviews} reviews)</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500">
                  <Clock className="w-5 h-5" />
                  <span>{food.cookTime}</span>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-4">
              {food.isVegetarian && (
                <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-xl border border-green-200">
                  <span className="text-2xl">🌱</span>
                  <span className="font-semibold text-green-800">Vegetarian</span>
                </div>
              )}
              
              {food.isSpicy && (
                <div className="flex items-center space-x-2 p-3 bg-red-50 rounded-xl border border-red-200">
                  <span className="text-2xl">🌶️</span>
                  <span className="font-semibold text-red-800">Spicy</span>
                </div>
              )}
            </div>

            {/* Restaurant Info */}
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">From {restaurant.name}</h3>
              <p className="text-gray-600 mb-3">{restaurant.description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{restaurant.reviews} reviews</span>
                </div>
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-lg font-medium text-gray-900">Quantity:</span>
                <div className="flex items-center space-x-3">
                  <motion.button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <motion.button
                    onClick={() => setQuantity(quantity + 1)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  onClick={handleAddToCart}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart - ₹{(food.price * quantity).toFixed(2)}</span>
                </motion.button>
              </div>
            </div>

            {/* Login Prompt */}
            {showLoginPrompt && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">Please login to add items to cart</span>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate('/login')}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Login Now
                  </button>
                  <button
                    onClick={() => setShowLoginPrompt(false)}
                    className="text-red-600 hover:text-red-700 transition-colors text-sm"
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
                className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Added to cart successfully!</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;