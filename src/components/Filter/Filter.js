import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/filterSlice';
import { selectFilter } from '../../redux/selectors';

export default function Filter() {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const changeFilter = e => {
    dispatch(updateFilter(e.currentTarget.value));
  };

  return (
    <label>
      Find contacts by name:
      <input type="text" value={filter} onChange={changeFilter} />
    </label>
  );
}
