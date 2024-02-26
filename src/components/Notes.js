import React, { useContext,useEffect } from 'react'
import noteContext from '../context/notes/NoteContext';
import Noteitem from './NoteItem';
import AddNote from './AddNote';
function Notes() {
    const context=useContext(noteContext);
    const {notes,getAllNotes}=context;
    useEffect(() => {
      getAllNotes()
  
    })
    
  return (
    <>
    <AddNote/>
    <div className="row my-3">
    <h2>Your Notes</h2>
    {notes.map((note)=>{return <Noteitem key={note._id} note={note}/>})}
    </div>
    </>
  )
}

export default Notes
