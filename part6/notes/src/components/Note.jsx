import { useState } from 'react';
import { useDeleteNote } from '../hooks';
import EditModal from './EditModal';

const Note = ({ note }) => {
  const { content, id, title } = note;
  const [isEdit, setIsEdit] = useState(false);
  const mutationDeleteNote = useDeleteNote();

  const handleDelete = async (id) => {
    mutationDeleteNote.mutate(id);
  };

  if (isEdit) return <EditModal id={id} title={title} content={content} setIsEdit={setIsEdit} />;

  return (
    <div
      style={{
        marginBottom: '5px',
        padding: '10px 7px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
        border: '1px solid black',
      }}>
      <div
        style={{ display: 'flex', flexDirection: 'column', wordBreak: 'break-word', gap: '5px' }}>
        <h5 style={{ margin: 0, fontSize: '20px' }}>{title}</h5>
        <p style={{ margin: 0, hyphens: 'auto' }}>{content}</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <button onClick={() => setIsEdit(true)} style={{ cursor: 'pointer' }}>
          edit
        </button>
        <button onClick={() => handleDelete(id)} style={{ padding: '0', cursor: 'pointer' }}>
          delete
        </button>
      </div>
    </div>
  );
};

export default Note;
