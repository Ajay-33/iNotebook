import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const host='http://localhost:5000'
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)


    const getAllNotes=async()=>{
        console.log(localStorage.getItem('token'))
        try{const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch notes');
        }
        const json=await response.json();
        setNotes(json)}
        catch(error){
            console.error('Error fetching notes',error.message)
        }
        
    }


    // Add note
    const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const note=await response.json();

        setNotes(notes.concat(note))
    }

    // Delete a note
    const deleteNote=async(id)=>{
        const response=await fetch(`${host}/api/notes/deletenote/${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            },
        });
        const json=await response.json();
        console.log(json)
        
        const newNotes=notes.filter((note)=>{return note._id!==id})
        setNotes(newNotes)
    }
    // Edit a note

    const editNote=async(_id,title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/updatenote/${_id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('token')
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=await response.json();
        console.log(json)

        let newNotes=JSON.parse(JSON.stringify(notes))
        // Logic to edit in Client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===_id){
                element.title=title
                element.description=description
                element.tag=tag;
            }
            
        }
        setNotes(newNotes)
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}   

export default NoteState;