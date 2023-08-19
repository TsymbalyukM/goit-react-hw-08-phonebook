import { useEffect, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Wrapper } from './App.styled';
import { refreshUserThunk } from './redux/Authorization/operations';
import { PrivateRoute } from './components/PrivateRoute';
import { RestrictedRoute } from './components/RestrictedRoute';

const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const HomePage = lazy(() => import('./pages/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactsPage = lazy(() => import('./pages/ContactsPage'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUserThunk());
  }, [dispatch]);

  const { isRefreshing } = useSelector(state => state.auth);

  return !isRefreshing ? (
    <p>User update...</p>
  ) : (
    <Wrapper>
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/login"
                component={<RegisterPage />}
              />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<LoginPage />}
              />
            }
          />
          <Route
            path="/contacts"
            element={
              <PrivateRoute redirectTo="/login" component={<ContactsPage />} />
            }
          />
        </Route>
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Wrapper>
  );
};

export default App;
