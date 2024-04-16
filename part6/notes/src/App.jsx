import { CreateNote, FilterNotes, NotesList } from './components';

const App = () => {
  return (
    <div style={{ position: 'relative' }}>
      <CreateNote />
      {/* <FilterNotes /> */}
      <NotesList />
    </div>
  );
};

export default App;
