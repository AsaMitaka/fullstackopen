import { useAllNotes } from '../hooks';
import Note from './Note';

const NotesList = () => {
  const { isLoading, isError, data } = useAllNotes();

  if (isError) return <div>Error...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {data.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesList;
