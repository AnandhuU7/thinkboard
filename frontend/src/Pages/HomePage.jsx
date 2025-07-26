import React, { use, useEffect, useState } from 'react'
import Navbar from '../components/Navbar.jsx'
import RateLimit from '../components/RateLimit.jsx';
import axios from "axios"
import toast from 'react-hot-toast';
import NoteCard from '../components/NoteCard.jsx';
import api from "../lib/axios.js"
import NotesNoteFound from '../components/NotesNoteFound.jsx';


const HomePage = () => {
  const [isRateLimited, setRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchnotes = async () => {
      try {
        const res = await api.get("/notes")
        console.log(res.data)
        setNotes(res.data);
        setRateLimited(false);
      } catch (error) {
        console.log("Error Fetching");
        if (error.response?.status === 429) {
          setRateLimited(true);
        } else {
          toast.error("Failed to fetch");
        }
      }finally{
        setLoading(false);
      }
    }
    fetchnotes();
  }, [])

  return (
    <div>
      <Navbar />
      {isRateLimited && <RateLimit />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>
        {loading && <div className='text-center text-primary py-10'>Loading Notes....</div>}
        {notes.length==0 && !isRateLimited && <NotesNoteFound/>}
        {notes.length > 0 && !isRateLimited && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {notes.map(note => (
              <div key={note._id}>
                <NoteCard note={note} setNotes={setNotes}/>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage