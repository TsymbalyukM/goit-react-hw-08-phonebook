import { useEffect, lazy } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Wrapper } from './App.styled';
import { Layout } from './components/Layout/Layout';
import { refreshUserThunk } from './redux/Authorization/operations';
import { PrivateRoute } from './components/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute';
import { useAuth } from './Hooks/UseAutorization';

const Register = lazy(() => import('./pages/Register'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Contacts = lazy(() => import('./pages/Contacts'));

const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <p>User update...</p>
  ) : (
    <Wrapper>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/login" component={<Register />} />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<Contacts />} />
            }
          />
        </Route>
        <Route path="*" element={<Home />} />
      </Routes>
    </Wrapper>
  );
};

export default App;
