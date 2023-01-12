import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/selectors';
import './Filter.modyle.css';

export default function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const changeFilter = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  return (
    <label className="filter">
      Find contacts by name:
      <input
        className="filter__input"
        type="text"
        value={filter}
        onChange={changeFilter}
      />
    </label>
  );
}
