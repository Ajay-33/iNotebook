import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const handleSubmission = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert("Added Successfully", 'success');
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    return (
        <div style={{ color: props.mode === 'dark' ? 'white' : 'black' }} className="container my-3">
            <h2 >Add a Note</h2>
            <form className='my-3' onSubmit={handleSubmission}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} className="form-control" id="title" name='title' value={note.title} onChange={onChange} minLength={3} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} id="description" value={note.description} name='description' onChange={onChange} minLength={5} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" style={{ backgroundColor: props.mode === 'dark' ? '#262626' : '#F5F5F5', color: props.mode === 'dark' ? 'white' : 'black', border: props.mode === 'dark' ? '1px solid white' : '1px solid black' }} id="tag" value={note.tag} name='tag' onChange={onChange} />
                </div>
                <button type="submit" className={`btn btn-${props.mode === 'dark' ? 'danger' : 'primary'}`} >Add Note</button>
            </form>
        </div>
    );
};

export default AddNote;
