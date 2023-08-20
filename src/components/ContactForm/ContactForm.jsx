import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Label, Button, Input } from './ContactForm.styled';
import { addContact } from 'redux/Contacts/operations';
import { selectContacts } from 'redux/Contacts/selectors';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();

    const isInContacts = contacts.find(contact => {
      if (contact.name) {
        return name.toLowerCase() === contact.name.toLowerCase();
      }
      return false;
    });

    if (isInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }
    dispatch(addContact({ name, number }));

    setName('');
    setNumber('');
  };

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          placeholder="Enter number phone"
          value={number}
          onChange={handleChange}
          pattern="\+\d{12}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </Label>

      <Button type="submit">Add contact </Button>
    </Form>
  );
};

export default ContactForm;
