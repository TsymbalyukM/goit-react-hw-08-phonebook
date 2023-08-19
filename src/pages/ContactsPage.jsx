import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import  ContactForm  from '../components/ContactForm/ContactForm';
import  ContactList  from '../components/ContactList/ContactList';
import { fetchContacts } from '../redux/Contacts/operations';
import { selectIsLoading } from '../redux/selectors';

export default function Contacts() {
    const dispatch = useDispatch();
    const isLoading = useSelector(selectIsLoading);
  
    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);
  
    return (
      <>
        <title>Your contacts</title>
        <ContactForm />
        <div>{isLoading}</div>{' '}
        <ContactList /> 
      </>
    );
  }