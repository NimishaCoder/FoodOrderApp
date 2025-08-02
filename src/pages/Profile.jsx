import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, MapPin, Edit3, Save, X, Clock, Truck, CheckCircle, Package } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../contexts/AuthContext';
import { getOrderHistory } from '../data/mockData';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+91 98765 43210',
    address: '123 MG Road, Mumbai, Maharashtra 400001'
  });

  // Memoize the order loading function
  const loadOrderHistory = useCallback(() => {
    try {
      const orders = getOrderHistory();
      // Remove duplicates based on order ID
      const uniqueOrders = orders.filter((order, index, self) => 
        index === self.findIndex(o => o.id === order.id)
      );
      setOrderHistory(uniqueOrders);
    } catch (error) {
      console.error('Error loading order history:', error);
      setOrderHistory([]);
    }
  }, []);

  useEffect(() => {
    // Load order history from localStorage only once
    loadOrderHistory();
  }, [loadOrderHistory]);

  // Update form data when user changes
  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: '+91 98765 43210',
      address: '123 MG Road, Mumbai, Maharashtra 400001'
    });
  }, [user]);

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'on-the-way':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'preparing':
        return <Package className="w-4 h-4" />;
      case 'on-the-way':
        return <Truck className="w-4 h-4" />;
      case 'confirmed':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  // If user is not logged in, redirect to login
  if (!user) {
    navigate('/login');
    return null;
  }

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
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Restaurants</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="card p-8">
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2">{user?.name}</h2>
                <p className="text-gray-600 text-lg">Food Enthusiast</p>
                <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-500">
                  <span>Member since 2024</span>
                  <span>•</span>
                  <span>{orderHistory.length} orders</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="flex-1 input-field"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-gray-900">{formData.name}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="flex-1 input-field"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-semibold text-gray-900">{formData.email}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Phone className="w-5 h-5 text-purple-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="flex-1 input-field"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-semibold text-gray-900">{formData.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-orange-600" />
                    </div>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="flex-1 input-field"
                      />
                    ) : (
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-semibold text-gray-900">{formData.address}</p>
                      </div>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={handleSave}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </motion.button>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full btn-secondary text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="card p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Order History</h3>
                <div className="text-sm text-gray-500">
                  {orderHistory.length} {orderHistory.length === 1 ? 'order' : 'orders'}
                </div>
              </div>
              
              {orderHistory.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h4>
                  <p className="text-gray-600 mb-6">Start ordering delicious food to see your order history here!</p>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="btn-primary"
                  >
                    Browse Restaurants
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {orderHistory.map((order, index) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-gray-900">Order #{order.id}</h4>
                          <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-sm font-bold border flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                          </span>
                          <p className="text-sm text-gray-600 mt-2">{order.deliveryTime}</p>
                        </div>
                      </div>

                      <div className="space-y-3 mb-4">
                        {order.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                            <div className="flex items-center space-x-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">{item.name}</p>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-semibold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">Total</span>
                          <span className="text-xl font-bold premium-gradient-text">₹{order.total.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">From {order.restaurantName}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;