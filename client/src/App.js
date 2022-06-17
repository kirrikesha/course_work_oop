import { Routes, Route, Link } from 'react-router-dom';

import Header from './components/Header/Header';
import ContactPage from './pages/ContactPage/ContactPage';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

import './scss/style.scss';
import Footer from './components/Footer/Footer';
import ProductPage from './pages/ProductPage/ProductPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import LoginPage from './pages/LoginPage/LoginPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import { Backdrop, CircularProgress } from '@mui/material';
import { useSelector} from 'react-redux';

function App() {
  const {loading} = useSelector(state => state.app)

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<ShopPage />} />
        <Route path="/favoriten" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Backdrop
        sx={{ color: '#34c3ff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Footer />
    </>
  );
}

export default App;
