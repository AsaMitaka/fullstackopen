import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { asObject, newAnecdote } from '../reducers/anecdoteReducer';
import anecdoteServices from '../services';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
  const [newAnecdot, setNewAnecdot] = useState('');
  const dispatch = useDispatch();

  const handleAddAnecdote = async (e) => {
    e.preventDefault();

    if (newAnecdot.length < 0) return;

    const anecdoteData = asObject(newAnecdot);
    console.log(anecdoteData);
    await anecdoteServices.createAnecdote(anecdoteData);
    dispatch(setNotification({ notification: 'Added new anecdote', timeout: 3 }));
    dispatch(newAnecdote({ newAnecdot }));
    setNewAnecdot('');
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleAddAnecdote}>
        <div>
          <input type="text" value={newAnecdot} onChange={(e) => setNewAnecdot(e.target.value)} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
