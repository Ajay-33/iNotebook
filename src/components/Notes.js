import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import AddNote from './AddNote';
function Notes(props) {

  const context = useContext(noteContext);
  const { notes, getAllNotes, editNote } = context;
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const navigate = useNavigate();
  const ref = useRef(null)
  const refClose = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes()
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, [])

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  const handleSubmission = (e) => {
    e.preventDefault()
    editNote(note.id, note.etitle, note.edescription, note.etag)
    refClose.current.click();
    props.showAlert("Updated Succesfully", 'success')
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} mode={props.mode} />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{ backgroundColor: props.mode === 'dark' ? '#1f1f1f' : 'white', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className='my-3' onSubmit={handleSubmission}>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} value={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea className="form-control" id="edescription" name='edescription' style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} value={note.edescription} onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} onChange={onChange} />
                </div>
                <div className="modal-footer">
                  <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'} `}>Update Note</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>


      <div style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="row my-3">
        <h2>Your Notes</h2>
        <div className="container ">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => { return <Noteitem key={note._id} updateNote={updateNote} mode={props.mode} showAlert={props.showAlert} note={note} /> })}
      </div>
    </>
  )
}

export default Notes
