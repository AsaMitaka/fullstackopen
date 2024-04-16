import { useState } from 'react';
import { useUpdateNote } from '../hooks';

const EditModal = ({ title, content, setIsEdit, id }) => {
  const [newContent, setNewContent] = useState(content);
  const [newTitle, setNewTitle] = useState(title);
  const mutationSaveNote = useUpdateNote();

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedNote = { title: newTitle, content: newContent };

    mutationSaveNote.mutateAsync({ id, updatedNote });
    setIsEdit(false);
  };

  return (
    <form
      onSubmit={(e) => handleSave(e)}
      style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: '1',
        background: 'rgba(0, 0, 0, 0.5)',
      }}>
      <div
        style={{
          zIndex: '2',
          width: '300px',
          height: '250px',
          position: 'absolute',
          top: '50%',
          left: '50%',
          border: '1px solid black',
          backgroundColor: 'white',
          padding: '5px 10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}>
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label htmlFor="content">Content: </label>
        <input
          name="content"
          type="text"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
        />
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <button type="submit">save</button>
          <button onClick={() => setIsEdit(false)}>close</button>
        </div>
      </div>
    </form>
  );
};

export default EditModal;
