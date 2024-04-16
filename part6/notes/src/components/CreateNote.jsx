import { useState } from 'react';
import { useCreateNote } from '../hooks';

const CreateNote = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const mutationCreateNote = useCreateNote();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content || !title) return;
    if (content.length < 200) return;

    const newCard = { content, title };

    mutationCreateNote.mutateAsync(newCard);
    setContent('');
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        width: '200px',
        marginBottom: '10px',
      }}>
      <label htmlFor="title">Title: </label>
      <input name="title" type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
      <label htmlFor="content">Content: </label>
      <textarea
        name="content"
        type="text"
        maxLength={200}
        onChange={(e) => setContent(e.target.value)}
        value={content}
        style={{ height: '150px', resize: 'none', marginBottom: '5px' }}
      />
      <button type="submit" style={{ cursor: 'pointer' }}>
        Create note
      </button>
    </form>
  );
};

export default CreateNote;
