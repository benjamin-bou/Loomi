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
import Informations from './pages/Informations';
import About from './pages/About';
import BlogPage from './pages/BlogPage';

function App() {
  return (
    <Router>
      {/* <MainHeader/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/boxes" element={<BoxesList />} />
        <Route path="/boxes/:id" element={<BoxDetails />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/profile" element={<PrivateRoute roleRequired="user"><Profile /></PrivateRoute>} />
        <Route path="/profile/orders" element={<PrivateRoute roleRequired="user"><Orders /></PrivateRoute>} />
        <Route path="/profile/subscription" element={<PrivateRoute roleRequired="user"><Subscription /></PrivateRoute>} />
        <Route path="/profile/favorites" element={<PrivateRoute roleRequired="user"><Favorites /></PrivateRoute>} />
        <Route path="/profile/informations" element={<PrivateRoute roleRequired="user"><Informations /></PrivateRoute>} />

        {/* Admin routes */}
        <Route path="/admin" element={<PrivateRoute roleRequired="admin"><AdminLayout /></PrivateRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="boxes" element={<AdminBoxesList />} />
          <Route path="boxes/:id" element={<AdminBoxDetails />} />
          <Route path="payments" element={<AdminPayments />} />
        </Route>

        {/* Catch-all route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
