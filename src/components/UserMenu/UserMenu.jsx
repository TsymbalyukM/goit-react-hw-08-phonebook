import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from 'redux/Authorization/operations';
import { selectUser } from 'redux/Authorization/selectors';
import { Wrapper, Text, Button } from './UserMenu.styled';

export const UserMenu = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Text>Welcome to Phonebook {user.name} </Text>{' '}
      <Button type="button" onClick={() => dispatch(logoutUserThunk())}>
        Logout
      </Button>{' '}
    </Wrapper>
  );
};
