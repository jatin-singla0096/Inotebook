import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://127.0.0.1:50";
   const notesInitial=[];
   const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag}),
    });
    let note = await response.json();
    setNotes(notes.concat(note));
    };
  const deleteNote =async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    });
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      body: JSON.stringify({title,description,tag}),
    });
    console.log(response);
    let newNotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        console.log(element);
        element.title = title;
        element.description = description;
        element.tag = tag;
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }}}  
    setNotes(newNotes);
  };
  const [notes, setNotes] = useState(notesInitial);
  return (
    <NoteContext.Provider value={{ notes,getNote, addNote, deleteNote, editNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
