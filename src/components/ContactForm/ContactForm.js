import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { selectContacts } from 'redux/selectors';
import './ContactForm.modyle.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const dispatch = useDispatch();
  const { contacts } = useSelector(selectContacts);

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
  };

  const handleAddContact = e => {
    e.preventDefault();
    let test = true;
    contacts.forEach(elm => {
      if (elm.name === name) {
        alert('This name is taken!');
        test = false;
      }
    });
    if (test) {
      dispatch(addContact({ name, phone }));
      resetForm();
    }
  };

  return (
    <form className="form" onSubmit={handleAddContact}>
      <label className="form__label">
        Name
        <input
          className="form__input"
          value={name}
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          autoComplete="off"
          placeholder="Name contact"
        />
      </label>
      <label className="form__label">
        Number
        <input
          className="form__input"
          value={phone}
          onChange={handleChange}
          type="tel"
          name="phone"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          autoComplete="off"
          placeholder="xxx-xxx-xxxx"
        />
      </label>
      <button className="form__btn" type="submit">
        Add contact
      </button>
    </form>
  );
}
