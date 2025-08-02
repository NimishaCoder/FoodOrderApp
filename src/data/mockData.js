export const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes",
    image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
    category: "Italian",
    rating: 4.8,
    reviews: 124,
    deliveryTime: "20-30 mins",
    minOrder: 15.00,
    cuisine: "Italian",
    isOpen: true,
    foods: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Fresh tomatoes, mozzarella cheese, basil leaves, and olive oil on a crispy thin crust",
        price: 18.99,
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.8,
        reviews: 124,
        cookTime: "15 mins",
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: 2,
        name: "Pepperoni Supreme",
        description: "Classic pepperoni with melted cheese and our signature tomato sauce",
        price: 22.50,
        image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.7,
        reviews: 89,
        cookTime: "18 mins",
        isVegetarian: false,
        isSpicy: true
      },
      {
        id: 3,
        name: "Quattro Stagioni",
        description: "Four seasons pizza with mushrooms, artichokes, ham, and olives",
        price: 24.99,
        image: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.9,
        reviews: 67,
        cookTime: "20 mins",
        isVegetarian: false,
        isSpicy: false
      }
    ]
  },
  {
    id: 2,
    name: "Spice Garden",
    description: "Authentic Indian cuisine with traditional spices and modern presentation",
    image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
    category: "Indian",
    rating: 4.9,
    reviews: 89,
    deliveryTime: "25-35 mins",
    minOrder: 20.00,
    cuisine: "Indian",
    isOpen: true,
    foods: [
      {
        id: 4,
        name: "Chicken Tikka Masala",
        description: "Tender chicken pieces in a rich, creamy tomato-based curry sauce with aromatic spices",
        price: 22.50,
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.9,
        reviews: 89,
        cookTime: "25 mins",
        isVegetarian: false,
        isSpicy: true
      },
      {
        id: 5,
        name: "Paneer Butter Masala",
        description: "Cottage cheese cubes in a rich, creamy tomato-based gravy with aromatic spices",
        price: 19.99,
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.7,
        reviews: 156,
        cookTime: "20 mins",
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: 6,
        name: "Biryani Deluxe",
        description: "Fragrant basmati rice cooked with tender meat and aromatic spices",
        price: 26.99,
        image: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.8,
        reviews: 92,
        cookTime: "30 mins",
        isVegetarian: false,
        isSpicy: true
      }
    ]
  },
  {
    id: 3,
    name: "Fresh & Healthy",
    description: "Nutritious and delicious salads, wraps, and healthy bowls",
    image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
    category: "Healthy",
    rating: 4.6,
    reviews: 67,
    deliveryTime: "15-25 mins",
    minOrder: 12.00,
    cuisine: "International",
    isOpen: true,
    foods: [
      {
        id: 7,
        name: "Caesar Salad",
        description: "Crisp romaine lettuce, parmesan cheese, croutons, and our signature Caesar dressing",
        price: 14.75,
        image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.6,
        reviews: 67,
        cookTime: "10 mins",
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: 8,
        name: "Greek Salad",
        description: "Fresh vegetables, feta cheese, olives, and olive oil dressing",
        price: 16.50,
        image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.5,
        reviews: 45,
        cookTime: "8 mins",
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: 9,
        name: "Quinoa Bowl",
        description: "Nutritious quinoa with roasted vegetables and tahini dressing",
        price: 18.99,
        image: "https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.7,
        reviews: 78,
        cookTime: "12 mins",
        isVegetarian: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 4,
    name: "Burger House",
    description: "Juicy burgers, crispy fries, and classic American comfort food",
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
    category: "American",
    rating: 4.7,
    reviews: 156,
    deliveryTime: "20-30 mins",
    minOrder: 18.00,
    cuisine: "American",
    isOpen: true,
    foods: [
      {
        id: 10,
        name: "Beef Burger Deluxe",
        description: "Juicy beef patty with lettuce, tomato, cheese, pickles, and our special sauce on a brioche bun",
        price: 19.99,
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.7,
        reviews: 156,
        cookTime: "15 mins",
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: 11,
        name: "Chicken Burger",
        description: "Grilled chicken breast with fresh vegetables and special sauce",
        price: 17.50,
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.6,
        reviews: 89,
        cookTime: "12 mins",
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: 12,
        name: "Veggie Burger",
        description: "Plant-based patty with fresh vegetables and vegan cheese",
        price: 16.99,
        image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.5,
        reviews: 67,
        cookTime: "10 mins",
        isVegetarian: true,
        isSpicy: false
      }
    ]
  },
  {
    id: 5,
    name: "Ocean Delights",
    description: "Fresh seafood and sushi prepared with premium ingredients",
    image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
    category: "Seafood",
    rating: 4.9,
    reviews: 92,
    deliveryTime: "25-35 mins",
    minOrder: 25.00,
    cuisine: "Japanese",
    isOpen: true,
    foods: [
      {
        id: 13,
        name: "Salmon Teriyaki",
        description: "Grilled salmon fillet glazed with teriyaki sauce, served with steamed vegetables and rice",
        price: 26.99,
        image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.9,
        reviews: 92,
        cookTime: "20 mins",
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: 14,
        name: "Tuna Sushi Roll",
        description: "Fresh tuna with avocado, cucumber, and rice wrapped in nori",
        price: 24.50,
        image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.8,
        reviews: 78,
        cookTime: "15 mins",
        isVegetarian: false,
        isSpicy: false
      },
      {
        id: 15,
        name: "Shrimp Tempura",
        description: "Crispy tempura shrimp served with dipping sauce and rice",
        price: 28.99,
        image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.7,
        reviews: 65,
        cookTime: "18 mins",
        isVegetarian: false,
        isSpicy: false
      }
    ]
  },
  {
    id: 6,
    name: "Sweet Dreams",
    description: "Artisanal desserts and pastries made with premium ingredients",
    image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
    category: "Dessert",
    rating: 4.8,
    reviews: 203,
    deliveryTime: "15-25 mins",
    minOrder: 10.00,
    cuisine: "International",
    isOpen: true,
    foods: [
      {
        id: 16,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
        price: 12.99,
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.8,
        reviews: 203,
        cookTime: "12 mins",
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: 17,
        name: "Tiramisu",
        description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream",
        price: 14.50,
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.9,
        reviews: 156,
        cookTime: "8 mins",
        isVegetarian: true,
        isSpicy: false
      },
      {
        id: 18,
        name: "Cheesecake",
        description: "Creamy New York style cheesecake with berry compote",
        price: 13.99,
        image: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&dpr=2",
        rating: 4.7,
        reviews: 89,
        cookTime: "10 mins",
        isVegetarian: true,
        isSpicy: false
      }
    ]
  }
];

export const categories = [
  { id: 1, name: "All", icon: "🍽️" },
  { id: 2, name: "Italian", icon: "🍕" },
  { id: 3, name: "Indian", icon: "🍛" },
  { id: 4, name: "Healthy", icon: "🥗" },
  { id: 5, name: "American", icon: "🍔" },
  { id: 6, name: "Seafood", icon: "🐟" },
  { id: 7, name: "Dessert", icon: "🍰" }
];

// Keep the old foodItems for backward compatibility (will be removed later)
export const foodItems = restaurants.flatMap(restaurant => restaurant.foods);

// Helper function to get order history from localStorage
export const getOrderHistory = () => {
  try {
    const savedOrders = localStorage.getItem('orderHistory');
    const orders = savedOrders ? JSON.parse(savedOrders) : [];
    
    // Remove duplicates based on order ID
    const uniqueOrders = orders.filter((order, index, self) => 
      index === self.findIndex(o => o.id === order.id)
    );
    
    // If we found duplicates, save the cleaned version
    if (uniqueOrders.length !== orders.length) {
      localStorage.setItem('orderHistory', JSON.stringify(uniqueOrders));
      console.log('Cleaned up duplicate orders');
    }
    
    return uniqueOrders;
  } catch (error) {
    console.error('Error loading order history:', error);
    return [];
  }
};

// Helper function to save order to localStorage
export const saveOrder = (order) => {
  try {
    const existingOrders = getOrderHistory();
    
    // Check if order with same ID already exists
    const orderExists = existingOrders.some(existingOrder => existingOrder.id === order.id);
    
    if (!orderExists) {
      const updatedOrders = [order, ...existingOrders];
      localStorage.setItem('orderHistory', JSON.stringify(updatedOrders));
      console.log('Order saved successfully:', order.id);
    } else {
      console.log('Order already exists, skipping save:', order.id);
    }
  } catch (error) {
    console.error('Error saving order:', error);
  }
};

// Helper function to clear all orders (for testing)
export const clearOrderHistory = () => {
  localStorage.removeItem('orderHistory');
  console.log('Order history cleared');
};