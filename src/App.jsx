import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BoxesList from './pages/BoxesList';
import BoxDetails from './pages/BoxDetails';
import NotFound from './NotFound';
import Login from './Login';
import Register from './Register';
import AdminBoxesList from './pages/AdminBoxesList';
import PrivateRoute from './PrivateRoute';
import AdminBoxDetails from './pages/AdminBoxDetails';
import AdminDashboard from './pages/AdminDashboard';
import AdminPayments from './pages/AdminPayments';
import AdminLayout from './components/AdminLayout';
import Subscriptions from './pages/Subscriptions';
import GiftCards from './pages/GiftCards';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Subscription from './pages/Subscription';
import Favorites from './pages/Favorite';
import Deliveries from './pages/Deliveries';
import Informations from './pages/Informations';
import About from './pages/About';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import MainHeader from './components/MainHeader';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import SubscriptionDetails from './pages/SubscriptionDetails';
import OrderPage from './pages/OrderPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import MyGiftCardsPage from './pages/MyGiftCardsPage';
import AuthModal from "./components/AuthModal";
import CartModal from "./components/CartModal";
import NavModal from "./components/NavModal";
import { useState } from "react";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showNav, setShowNav] = useState(false);

  return (    <Router>
      <ScrollToTop />
      <MainHeader setShowLogin={setShowLogin} setShowCart={setShowCart} setShowNav={setShowNav} />      
      <AuthModal show={showLogin} setShow={setShowLogin} />
      <CartModal show={showCart} setShow={setShowCart} />
      <NavModal show={showNav} setShow={setShowNav} />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/boxes" element={<BoxesList />} />
        <Route path="/boxes/:id" element={<BoxDetails setShowCart={setShowCart} />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/subscriptions/:id" element={<SubscriptionDetails setShowCart={setShowCart} />} />
        <Route path="/gift-cards" element={<GiftCards setShowCart={setShowCart} setShowLogin={setShowLogin} />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path='/blog/:id' element={<ArticlePage />} />        
        <Route path="/order" element={<OrderPage setShowLogin={setShowLogin} />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/profile/favorites" element={<Favorites setShowCart={setShowCart} />} />        {/* Private routes */}
        <Route path="/profile" element={<PrivateRoute roleRequired="user"><Profile /></PrivateRoute>} />
        <Route path="/profile/orders" element={<PrivateRoute roleRequired="user"><Orders /></PrivateRoute>} />        
        <Route path="/profile/deliveries" element={<PrivateRoute roleRequired="user"><Deliveries /></PrivateRoute>} />
        <Route path="/profile/subscription" element={<PrivateRoute roleRequired="user"><Subscription /></PrivateRoute>} />
        <Route path="/profile/gift-cards" element={<PrivateRoute roleRequired="user"><MyGiftCardsPage setShowLogin={setShowLogin} /></PrivateRoute>} />
        <Route path="/profile/informations" element={<PrivateRoute roleRequired="user"><Informations /></PrivateRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<PrivateRoute roleRequired="admin"><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="boxes" element={<AdminBoxesList />} />
          <Route path="boxes/:id" element={<AdminBoxDetails />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer setShowLogin={setShowLogin} />
    </Router>
  );
}

export default App;
