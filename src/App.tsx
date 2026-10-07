import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import Restaurants from './pages/Restaurants';
import RestaurantDetails from './pages/RestaurantDetails';
import FoodDetails from './pages/FoodDetails';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Recipes from './pages/Recipes';
import RecipeDetails from './pages/RecipeDetails';
import AIAssistant from './pages/AIAssistant';
import Tracking from './pages/Tracking';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Reservation from './pages/Reservation';
import Offers from './pages/Offers';
import Rewards from './pages/Rewards';
import Explore from './pages/Explore';
import About from './pages/About';
import Contact from './pages/Contact';
import RestaurantDashboard from './pages/RestaurantDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import ScrollToTop from './components/ScrollToTop';
import CartDrawer from './components/CartDrawer';
import AIAssistantDrawer from './components/AIAssistantDrawer';

import { LocationProvider } from './context/LocationContext';
import LocationModal from './components/LocationModal';

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <CartProvider>
          <WishlistProvider>
            <LocationProvider>
              <Router>
                <ScrollToTop />
                <CartDrawer />
                <LocationModal />
                <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Route>

                {/* Main App Routes */}
                <Route path="/" element={<MainLayout />}>
                  <Route index element={<Home />} />
                  <Route path="restaurants" element={<Restaurants />} />
                  <Route path="restaurant/:id" element={<RestaurantDetails />} />
                  <Route path="food/:id" element={<FoodDetails />} />
                  <Route path="wishlist" element={<Wishlist />} />
                  <Route path="cart" element={<Cart />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="recipes" element={<Recipes />} />
                  <Route path="recipes/:id" element={<RecipeDetails />} />
                  <Route path="ai" element={<AIAssistant />} />
                  <Route path="tracking/:orderId" element={<Tracking />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="orders" element={<Orders />} />
                  <Route path="reservation" element={<Reservation />} />
                  <Route path="offers" element={<Offers />} />
                  <Route path="rewards" element={<Rewards />} />
                  <Route path="explore" element={<Explore />} />
                  <Route path="about" element={<About />} />
                  <Route path="contact" element={<Contact />} />
                  <Route path="restaurant/dashboard" element={<RestaurantDashboard />} />
                  <Route path="delivery/dashboard" element={<DeliveryDashboard />} />
                </Route>
              </Routes>
              <AIAssistantDrawer />
            </Router>
          </LocationProvider>
        </WishlistProvider>
        </CartProvider>
      </OrderProvider>
    </AuthProvider>
  );
}

export default App;
