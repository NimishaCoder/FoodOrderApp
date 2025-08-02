import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Lock, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const Payment = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
    
    // Check if user is logged in
    if (!user) {
      navigate('/login');
    }
  }, [cartItems, navigate, user]);

  const handlePayment = () => {
    console.log('Payment method:', paymentMethod);
    console.log('Cart items:', cartItems);
    console.log('User:', user);
    
    // Check if user is logged in
    if (!user) {
      alert('Please login to proceed with payment');
      navigate('/login');
      return;
    }
    
    // Check if cart has items
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      navigate('/cart');
      return;
    }
    
    setIsProcessing(true);
    
    // Create order object with proper structure
    const order = {
      id: Date.now(), // Use timestamp as order ID
      items: [...cartItems], // Create a copy of cart items
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      status: 'confirmed',
      date: new Date().toISOString(),
      deliveryTime: '25-30 mins',
      restaurantName: cartItems[0]?.restaurantName || 'Multiple Restaurants',
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || 'guest@example.com',
      paymentMethod: paymentMethod,
      deliveryAddress: '123 MG Road, Mumbai, Maharashtra 400001',
      phone: '+91 98765 43210'
    };

    console.log('Order object:', order);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Save order to localStorage for order history
      localStorage.setItem('currentOrder', JSON.stringify(order));
      
      // Navigate to order confirmation with order data
      navigate('/order-confirmation', { 
        state: { 
          order,
          paymentMethod: paymentMethod 
        } 
      });
    }, 3000); // simulate payment delay
  };

  const handlePayPalPayment = () => {
    console.log('PayPal payment initiated');
    console.log('Cart items:', cartItems);
    console.log('User:', user);
    
    // Check if user is logged in
    if (!user) {
      alert('Please login to proceed with payment');
      navigate('/login');
      return;
    }
    
    // Check if cart has items
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      navigate('/cart');
      return;
    }
    
    setIsProcessing(true);
    
    // Create order object with proper structure
    const order = {
      id: Date.now(), // Use timestamp as order ID
      items: [...cartItems], // Create a copy of cart items
      total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
      status: 'confirmed',
      date: new Date().toISOString(),
      deliveryTime: '25-30 mins',
      restaurantName: cartItems[0]?.restaurantName || 'Multiple Restaurants',
      customerName: user?.name || 'Guest',
      customerEmail: user?.email || 'guest@example.com',
      paymentMethod: 'paypal',
      deliveryAddress: '123 MG Road, Mumbai, Maharashtra 400001',
      phone: '+91 98765 43210'
    };

    console.log('PayPal order object:', order);

    // Simulate PayPal payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Save order to localStorage for order history
      localStorage.setItem('currentOrder', JSON.stringify(order));
      
      // Navigate to order confirmation with order data
      navigate('/order-confirmation', { 
        state: { 
          order,
          paymentMethod: 'paypal' 
        } 
      });
    }, 2000); // PayPal processing is usually faster
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  if (cartItems.length === 0) {
    return null;
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.08; // 8% tax
  const deliveryFee = 3.99;
  const finalTotal = total + tax + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <button
            onClick={handleBackToCart}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card p-8"
          >
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-gray-900">Payment</h1>
                <p className="text-gray-600">Complete your order securely</p>
              </div>
            </div>

            {!isProcessing ? (
              <div className="space-y-6">
                {/* Payment Method Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="text-blue-600"
                      />
                      <div className="w-5 h-5 bg-blue-600 rounded"></div>
                      <span className="font-medium">PayPal</span>
                    </label>
                  </div>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="input-field"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="input-field"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="input-field"
                      />
                    </div>
                  </div>
                )}

                {/* PayPal Info */}
                {paymentMethod === 'paypal' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-bold">P</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">PayPal</p>
                          <p className="text-sm text-gray-600">You'll be redirected to PayPal to complete your payment</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-xl border border-green-200">
                  <Lock className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">Secure Payment</p>
                    <p className="text-xs text-green-600">Your payment information is encrypted and secure</p>
                  </div>
                </div>

                {/* Pay Button */}
                <motion.button
                  onClick={paymentMethod === 'paypal' ? handlePayPalPayment : handlePayment}
                  disabled={isProcessing}
                  whileHover={{ scale: isProcessing ? 1 : 1.02 }}
                  whileTap={{ scale: isProcessing ? 1 : 0.98 }}
                  className={`w-full btn-primary flex items-center justify-center space-x-2 ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {paymentMethod === 'paypal' ? (
                    <>
                      <div className="w-5 h-5 bg-blue-600 rounded"></div>
                      <span>Pay with PayPal ₹{finalTotal.toFixed(2)}</span>
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      <span>Pay ₹{finalTotal.toFixed(2)}</span>
                    </>
                  )}
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {paymentMethod === 'paypal' ? 'Processing PayPal Payment...' : 'Processing Payment...'}
                </h3>
                <p className="text-gray-600">
                  {paymentMethod === 'paypal' 
                    ? 'Redirecting to PayPal for secure payment processing' 
                    : 'Please wait while we process your payment securely'
                  }
                </p>
              </div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="card p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item, index) => (
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
                  <span className="font-semibold text-gray-900">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-3 border-t border-gray-200 pt-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-semibold">₹{deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-3">
                <span>Total</span>
                <span className="premium-gradient-text">₹{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="font-semibold text-gray-900 mb-2">Delivery Information</h3>
              <p className="text-sm text-gray-600">123 MG Road, Mumbai, Maharashtra 400001</p>
              <p className="text-sm text-gray-600">Estimated delivery: 25-30 minutes</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
