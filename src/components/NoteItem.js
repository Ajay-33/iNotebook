import React, { useContext } from 'react';
import noteContext from '../context/notes/NoteContext';
import moment from 'moment';

function NoteItem(props) {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const renderTag = () => {
    if (!note.tag) {
      return <span className="badge" style={{backgroundColor: '#E25822',position: 'absolute', top: 0, right: 0 }}>Add Tag</span>;
    }
    if (note.tag.length > 7) {
      return <span className="badge" style={{ backgroundColor: '#4169e1',position: 'absolute', top: 0, right: 0 }}>{note.tag.slice(0, 8)}...</span>;
    }
    return <span className="badge" style={{ backgroundColor: '#4169e1',position: 'absolute', top: 0, right: 0 }}>{note.tag}</span>;
  };

  const formatUpdatedAt = (updatedAt) => {
    const now = moment();
    const updated = moment(updatedAt);
    const diffHours = now.diff(updated, 'hours');
    const diffMinutes = now.diff(updated, 'minutes');

    if (diffHours > 0) {
      return `Last updated ${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return `Last updated ${diffMinutes} ${diffMinutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };

  return (
    <div className='col-md-4'>
      <div className="card my-3 position-relative">
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: '0', right: '0' }}>
          {renderTag()}
        </div>
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i className="fa-regular fa-trash-can mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Succesfully", "success") }}></i>
              <i className="fa-solid fa-pen mx-2" onClick={() => { updateNote(note) }}></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
          <small className="text-muted">{formatUpdatedAt(note.updatedAt)}</small>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
