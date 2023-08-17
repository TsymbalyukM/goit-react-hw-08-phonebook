import React from 'react';
import { List, Item, Button } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectFilterContacts,
  selectIsLoading,
} from 'redux/selectors';
import { deleteContact } from 'redux/operations';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilterContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();


  const removeContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      {isLoading}

      {!filteredContacts?.length && !error && !isLoading && (
        <p>No contacts found.</p>
      )}

      {error && <p>{error}</p>}
      <List>
        {filteredContacts.map(contact => (
          <Item key={contact.id}>
            {contact.name + ' : ' + contact.phone}
            {
              <Button
                type="button"
                name="delete"
                onClick={() => removeContact(contact.id)}
              >
                delete
              </Button>
            }
          </Item>
        ))}
      </List>
    </div>
  );
};

export default ContactList;
