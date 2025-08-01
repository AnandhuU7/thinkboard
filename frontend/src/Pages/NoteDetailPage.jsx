import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import { Trash2Icon, ArrowLeftIcon, LoaderIcon, } from 'lucide-react';

const NoteDetailPage = () => {

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false)

  const navigate = useNavigate();
  const { id } = useParams();


  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data)
      } catch (error) {
        console.log("Error in fetching note", error)
        toast.error("Failed to update note")
      }
      finally {
        setLoading(false)
      }
    };
    fetchNote();
  }, [id])

  console.log(note)

  const handleDelete = async () => {
    if (!window.confirm("Are You sure to delete ? ")) return;

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/")
    } catch (error) {
      console.log("Error deleting the note:", error);
      toast.error("Failed to delete note")
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add title or content")
      return
    }
    setSaving(true);
    try {
      await api.put( `notes/${id}`,note);
      toast.success("Updated Successfully");
      navigate("/")

    } catch (error) {
      console.log("Error for saving note",error);
      toast.error("Error for saving note");
    }
    finally {
      setSaving(false)
    }
  }



  if (loading || !note) {
    return (
      <div className='min-h-screen bg-base-200 flex items-center justify-center'>
        <LoaderIcon className='animate-spin size-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className="max-w-2xl mx-auto">
          <div className='flex items-center justify-between mb-6'>
            <Link to={"/"} className='btn btn-ghost mb-6'>
              <ArrowLeftIcon className='h-5 w-5' />
              Back to home</Link>
            <button className='btn btn-error btn-outline' onClick={handleDelete}>
              <Trash2Icon className='h-5 w-5' />
              Delete Note
            </button>
          </div>
          <div className='card bg-base-100'>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Title</span>
              </label>
              <input
                type='text'
                placeholder='Note title'
                className='input input-bordered'
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
              />

            </div>
            <div className='form-control mb-4'>
              <label className='label'>
                <span className='label-text'>Content</span>
              </label>
              <textarea

                placeholder='Write your notes....'
                className='textarea textarea-bordered h-32'
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
              />
            </div>

            <div className='card-actions justify-end'>
              <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                {saving ? "Saving...." : "Save Changes"}
              </button>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage;