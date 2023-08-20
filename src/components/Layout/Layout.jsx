import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AppBar } from 'components/AppBar/AppBar';
import { Wrapper } from './Layout.styled';

export const Layout = () => {
  return (
    <Wrapper>
      <AppBar />{' '}
      <Suspense >
        <Outlet />
      </Suspense>
    </Wrapper>
  );
};