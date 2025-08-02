import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, MapPin, Phone, CreditCard, Truck, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { saveOrder } from '../data/mockData';
import { useCart } from '../hooks/useCart';

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const { clearCart } = useCart();

  useEffect(() => {
    console.log('OrderConfirmation: Location state:', location.state);
    console.log('OrderConfirmation: Current order from localStorage:', localStorage.getItem('currentOrder'));
    
    // Get order details from location state or localStorage
    const order = location.state?.order || JSON.parse(localStorage.getItem('currentOrder'));
    
    if (order) {
      console.log('OrderConfirmation: Setting order details:', order);
      setOrderDetails(order);
      
      try {
        // Save to order history
        saveOrder(order);
        // Clear current order from localStorage
        localStorage.removeItem('currentOrder');
        // Clear cart after order is confirmed
        clearCart();
      } catch (error) {
        console.error('Error processing order confirmation:', error);
      }
    } else {
      console.log('OrderConfirmation: No order found, redirecting to dashboard');
      navigate('/dashboard');
    }
  }, [location, clearCart, navigate]);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🍽️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">No order found</h1>
            <Link to="/dashboard" className="btn-primary">
              Back to Restaurants
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const calculateSubtotal = () => {
    return orderDetails.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateDeliveryFee = () => {
    return 3.99;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateDeliveryFee();
  };

  const getPaymentMethodDisplay = () => {
    if (orderDetails.paymentMethod === 'paypal') {
      return 'PayPal';
    } else if (orderDetails.paymentMethod === 'card') {
      return 'Credit Card ending in 1234';
    }
    return 'Credit Card ending in 1234';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Your order has been successfully placed
          </p>
          <p className="text-lg text-gray-500">
            Order #{orderDetails.id}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Truck className="w-6 h-6 mr-3 text-blue-600" />
              Order Summary
            </h2>

            {/* Restaurant Info */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">{orderDetails.restaurantName}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span>4.8</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{orderDetails.deliveryTime}</span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">${calculateTax().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">${calculateDeliveryFee().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span className="premium-gradient-text">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Delivery Info & Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Delivery Information */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                Delivery Information
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Delivery Address</p>
                    <p className="text-gray-600">{orderDetails.deliveryAddress}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Contact Number</p>
                    <p className="text-gray-600">{orderDetails.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Payment Method</p>
                    <p className="text-gray-600">{getPaymentMethodDisplay()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Status */}
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-600" />
                Order Status
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Order Confirmed</p>
                    <p className="text-sm text-gray-500">Your order has been received</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Preparing</p>
                    <p className="text-sm text-gray-500">Chef is preparing your order</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-500">On the Way</p>
                    <p className="text-sm text-gray-400">Estimated delivery in {orderDetails.deliveryTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Link
                to="/dashboard"
                className="w-full btn-primary text-center block"
              >
                Order More Food
              </Link>
              
              <Link
                to="/profile"
                className="w-full btn-secondary text-center block"
              >
                View Order History
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
