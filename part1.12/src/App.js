import { useState } from 'react';

const Button = ({ onClick, text, ...rest }) => {
  return (
    <button onClick={onClick} {...rest}>
      {text}
    </button>
  );
};

const BestAnecdote = ({ vote, anecdotes }) => {
  const maxVote = Math.max(...Object.values(vote));
  const selectedAnecdote = Object.entries(vote).findIndex(([key, value]) => value === maxVote);

  return (
    <div>
      {maxVote === 0 ? (
        <h5>No voted anecdote</h5>
      ) : (
        <div>
          <h3>Best Anecdote</h3>
          <p>{anecdotes[selectedAnecdote]}</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(Object.fromEntries(anecdotes.map((_, i) => [i, 0])));

  const nextAnecdote = () => {
    if (selected === anecdotes.length - 1) {
      return setSelected(0);
    }

    setSelected((prev) => prev + 1);
  };

  const voteAnecdote = () => {
    setVote((prev) => ({
      ...prev,
      [selected]: prev[selected] + 1,
    }));
  };

  return (
    <>
      <div>
        <p>{anecdotes[selected]}</p>
        <Button onClick={voteAnecdote} text={`vote ${vote[selected]}`} />
        <Button onClick={nextAnecdote} text="next" />
      </div>
      <BestAnecdote vote={vote} anecdotes={anecdotes} />
    </>
  );
};

export default App;
