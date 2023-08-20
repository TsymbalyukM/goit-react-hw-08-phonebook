import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import { AuthNav } from 'components/AuthNavigation/AuthNav';
import { useAuth } from 'Hooks/UseAutorization';
import { Header } from './AppBar.styled';

export const AppBar = () => {
  const { isLoggedIn } = useAuth(); 

  return (
    <Header>
      <Navigation />
      {isLoggedIn ? <UserMenu /> : <AuthNav />}{' '}
    </Header>
  );
};