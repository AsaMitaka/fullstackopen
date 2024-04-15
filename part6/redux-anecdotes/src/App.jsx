import AnecdoteFilter from './components/anecdoteFilter';
import AnecdoteForm from './components/anecdoteForm';
import AnecdoteList from './components/anecdoteList';
import AnecdoteNotification from './components/anecdoteNotification';

const App = () => {
  return (
    <div>
      <AnecdoteNotification />
      <AnecdoteFilter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
