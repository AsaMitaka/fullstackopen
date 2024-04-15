import { useSelector, useDispatch } from 'react-redux';
import { fetchAnecdotes, voteAnecdote } from '../reducers/anecdoteReducer';
import { useEffect } from 'react';
import anecdoteServices from '../services';
import { setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await anecdoteServices.getAllAnecdotes();

      dispatch(fetchAnecdotes({ anecdotes: fetchedData }));
    };

    getData();
  }, []);

  const vote = async (id) => {
    dispatch(setNotification({ notification: `Voted anecdote ${id}`, timeout: 3 }));
    dispatch(voteAnecdote({ id: id }));

    const updatedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    await anecdoteServices.updateAnecdote(id, {
      content: updatedAnecdote.content,
      id: updatedAnecdote.id,
      votes: updatedAnecdote.votes + 1,
    });
  };

  const deleteAnecdote = async (id) => {
    await anecdoteServices.deleteAnecdote(id);
  };

  const sortedAnecdotes = [...anecdotes].sort((a, b) => (a.votes < b.votes ? 1 : -1));

  const filterAnecdotes =
    filter.length > 0
      ? sortedAnecdotes.filter(
          (anecdote) => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1,
        )
      : sortedAnecdotes;

  console.log('SORTED ANECDOTES', sortedAnecdotes);
  console.log('FILTER ANECDOTES', filterAnecdotes);
  return (
    <div>
      {filterAnecdotes.length > 0 ? (
        <div>
          {filterAnecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div style={{ marginBottom: '10px' }}>
                <div>{anecdote.content}</div>
                <span style={{ marginRight: '5px' }}>has {anecdote.votes} votes</span>
                <button style={{ cursor: 'pointer' }} onClick={() => vote(anecdote.id)}>
                  vote
                </button>
                <button style={{ margin: '2px' }} onClick={() => deleteAnecdote(anecdote.id)}>
                  delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No anecdotes</div>
      )}
    </div>
  );
};

export default AnecdoteList;
