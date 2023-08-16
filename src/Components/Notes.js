import React, {useContext,useEffect,useRef,useState} from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom"

const Notes = (props) => {
  const navigate=useNavigate();
  const [note, setNote] = useState({id:"",etitle:"",edescription:"",etag:""});
  const context = useContext(NoteContext);
  const { notes, getNote,editNote } = context;
  useEffect(() => {
    if(localStorage.getItem("token")){
    getNote();}
    else{
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };
const handleClick = (e)=>{
    console.log("Updating the note...", note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click(); 
    props.showAlert("Updated successfully","success");
}
const onChange=(e)=>{
 setNote({...note,[e.target.name]:e.target.value})
}
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch</button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="conta row my-3">
        <h2>You Notes</h2>
        <div className="container">
        {notes.length===0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem note={note} updateNote={updateNote} showAlert={props.showAlert} key={note._id} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
