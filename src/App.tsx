import { Route, Routes, useLocation } from 'react-router-dom';
import Cards from './components/content/cards/Cards';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Carousel from './components/content/carousel/Carousel';
import { images } from './db/db';
import { useEffect, useState } from 'react';
import Basket from './components/basket/Basket';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { getAddedItems } from './redux/basket';
import { loadCartFromLocalStorage } from './helpers/localStorage';
import { AddedItems } from './types/types';
import SuccessfulOrder from './components/basket/SuccessfulOrder';
import NotFound from './components/not_found/NotFound';
import { useAutoSignIn } from './hooks/useAutoSignIn';
import AdminPanel from './components/admin_panel/AdminPanel';
import AdminPanelStopEnter from './components/admin_panel/AdminPanelStopEnter';

function App() {
  const [basketIsHidden, setBasketIsHidden] = useState<boolean>(true);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((state) => state.auth.isAuth);
  useAutoSignIn();
  useEffect(() => {
    if (isAuth) {
      dispatch(getAddedItems(loadCartFromLocalStorage('basket') as AddedItems[]));
    }
  }, [dispatch, isAuth]);
  return (
    <div className="App">
      {location.pathname !== '/register' && location.pathname !== '/login' ? (
        <Header
          isDisabled={location.pathname === '/catalog' ? false : true}
          setBasketIsHidden={setBasketIsHidden}
        />
      ) : (
        <div></div>
      )}
      <Routes>
        <Route path="/" element={<Carousel images={images} />} />
        <Route path="catalog" element={<Cards />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="thankyou" element={<SuccessfulOrder />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="no-rights" element={<AdminPanelStopEnter />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!basketIsHidden && <Basket setBasketIsHidden={setBasketIsHidden} />}
      <Footer />
    </div>
  );
}

export default App;
