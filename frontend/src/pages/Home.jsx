import { useEffect, useState } from "react"
import api from "../api"
import Note from "../components/Note"
import "../styles/Home.css"

const Home = () => {
    const [notes,setNotes] = useState([])
    const [content,setContent] = useState('')
    const [title, setTitle] = useState('')

    useEffect(()=>{
        getNotes()
    },[])

    const getNotes = () => {
        api.get('api/notes/')
        .then((res)=>res.data)
        .then((data)=>{setNotes(data)})
        .catch((err)=>{
            console.log("error in getNotes",err);
            alert(err)
        })
    }

    const deleteNote = (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return
        console.log(`api/notes/delete/${id}/`);
        api.delete(`api/notes/delete/${id}/`)
        .then((res)=>{
            if (res.status===204) alert('Note deleted')
            else alert('Failed to delete note')
            getNotes()
        }).catch((err)=> {
            console.log("error in deleteNote",err);
            alert(err)
        })
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post('api/notes/',{ title,content })
        .then((res)=>{
            if (res.status===201) alert('Note Create')
            else alert('Failed to create note')
            getNotes()
        })
        .catch((err)=>{
            console.log("error in createNote",err);
            alert(err)
        })
    }

    return (
        <div>
            
                <h2>Create a note</h2>
                <form onSubmit={createNote}>

                    {/* title */}
                    <label htmlFor="title">Title:</label> <br />
                    <input type="text" 
                    name="title"
                    id="title" 
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)} /> <br />

                    {/* content */}
                    <label htmlFor="content">Content:</label> <br />
                    <textarea type="text" 
                    name="content"
                    id="content" 
                    required
                    value={content}
                    onChange={(e)=>setContent(e.target.value)} />

                    <br />

                    {/* submit */}
                    <input type="submit" value="Submit"></input>

                </form>

                <div>
                <h2>Notes</h2>
                {notes.map((note)=>{
                    return <Note key={note.id} note={note} onDelete={deleteNote} />
                })}
            </div>
        </div>
    )
}

export default Home