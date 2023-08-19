import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, redirectTo: address }) => {
  const { isLoaggedIn, isRefreshing } = useSelector(state => state.auth);

  const shouldRedirect = !isLoaggedIn && !isRefreshing;

  return shouldRedirect ? <Navigate to={address} /> : Component;
};