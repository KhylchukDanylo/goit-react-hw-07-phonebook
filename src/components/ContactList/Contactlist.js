import { useSelector, useDispatch } from 'react-redux';
import { fetchContacts, deleteContact } from 'redux/operations';
import { useEffect } from 'react';
import { selectContacts, selectFilter } from 'redux/selectors';
import { RotatingLines } from 'react-loader-spinner';
import './ContactList.modyle.css';

export default function ContactList() {
  const dispatch = useDispatch();
  const { contacts, isLoading, error } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredContacts = getFilteredContacts();

  return (
    <ul className="list">
      {isLoading && (
        <RotatingLines
          strokeColor="red"
          strokeWidth="5"
          animationDuration="0.75"
          width="36"
          visible={true}
        />
      )}
      {error && <p>{error}</p>}
      {contacts.length > 0 &&
        filteredContacts.map(({ id, name, phone }) => (
          <li className="list__item" key={id}>
            <p className="list__item--text">
              {name}: {phone}
            </p>
            <button
              className="list__btn"
              type="button"
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
}
