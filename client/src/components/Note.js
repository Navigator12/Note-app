import React, {useContext} from "react"
import {useHttp} from "../hooks/http.hook"
import {AlertContext} from "../context/alert/alertContext"
import {NotesContex} from "../context/notes/notesContext"

export const Note = ({ index, title, date, _id }) => {
  const {request} = useHttp()
  const alert = useContext(AlertContext)
  const {notes, setNotes} = useContext(NotesContex)

  const clickHandler = async event => {
    event.preventDefault()

    try {
      const fetched = await request('/api/note/delete', 'DELETE', { _id })

      alert.show(fetched.message, 'success')
      setNotes(notes.filter(element => element._id !== fetched._id))
    } catch (e) {}
  }

  return (
    <>
      <div>
        <strong>{index+1}:</strong>
        <strong>{title}</strong>
      </div>

      <div>
        <span>{new Date(date).toLocaleDateString()}</span>
        <button
          className='btn-hover'
          onClick={clickHandler}
        >
          Remove
        </button>
      </div>
    </>
  )
}