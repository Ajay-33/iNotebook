import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState=(props)=>{
    const host='http://localhost:5000'
    const notesInitial=[]
    const [notes, setNotes] = useState(notesInitial)


    const getAllNotes=async()=>{

        const response=await fetch(`${host}/api/notes/fetchallnotes`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTAwOWQwMmZjNTA3NzRjMDE0MzlmIn0sImlhdCI6MTcwODg1NTE0MX0.avxcWxBNsQUmZVapRs5s3a1sU1I1SRIozGKYGKcedQQ'
            }
        });
        const json=await response.json();
        console.log(json)
        setNotes(json)
    }


    // Add note
    const addNote=async(title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/addnote`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTAwOWQwMmZjNTA3NzRjMDE0MzlmIn0sImlhdCI6MTcwODg1NTE0MX0.avxcWxBNsQUmZVapRs5s3a1sU1I1SRIozGKYGKcedQQ'
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=response.json();
        console.log(json)
        const note= {
            "_id": "65da02c8820a7440de848564567812",
            "user": "65da009d02fc50774c01439f",
            "title": title,
            "description": description,
            "tag": tag,
            "createdAt": "2024-02-24T14:52:56.269Z",
            "updatedAt": "2024-02-24T14:52:56.269Z",
            "__v": 0
        }
        setNotes(notes.concat(note))
    }
    // Delete a note
    const deleteNote=async(_id)=>{
        const newNotes=notes.filter((note)=>{return note._id!==_id})
        setNotes(newNotes)
    }
    // Edit a note

    const editNote=async(_id,title,description,tag)=>{
        const response=await fetch(`${host}/api/notes/updatenote/${_id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVkYTAwOWQwMmZjNTA3NzRjMDE0MzlmIn0sImlhdCI6MTcwODg1NTE0MX0.avxcWxBNsQUmZVapRs5s3a1sU1I1SRIozGKYGKcedQQ'
            },
            body:JSON.stringify({title,description,tag})
        });
        const json=response.json();
        console.log(json)
        
        // Logic to edit in Client
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if(element._id===_id){
                element.title=title
                element.description=description
                element.tag=tag;
            }
            
        }
    }

    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getAllNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}   

export default NoteState;