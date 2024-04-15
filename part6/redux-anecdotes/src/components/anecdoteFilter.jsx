import { useDispatch } from 'react-redux';
import { anecdoteFilter } from '../reducers/filterReducer';

const AnecdoteFilter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(anecdoteFilter({ filter: event.target.value }));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
