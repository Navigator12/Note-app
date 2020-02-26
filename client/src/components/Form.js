import React, {useState, useContext} from "react"
import {AlertContext} from "../context/alert/alertContext"
import {useHttp} from '../hooks/http.hook'
import {NotesContex} from "../context/notes/notesContext"

export const Form = () => {
  const [value, setValue] = useState('')
  const alert = useContext(AlertContext)

  const {notes, setNotes} = useContext(NotesContex)

  const {request} = useHttp()

  const submitHandler = (event) => {
    event.preventDefault()

    if (value.trim()) {
      try {
        const data = request('/api/note/create', 'POST', {title: value})

        data
          .then(val => {
            alert.show(val.message, 'success')
            setNotes(notes.concat([val.note]))
          })
          .catch(val => alert.show(val.message))
      } catch (e) {
        console.log(e)
      }
    } else {
      alert.show('Enter note name')
    }

    setValue('')
  }

  return (
    <form onSubmit={submitHandler}>
      <div className='form-group'>
        <input
          type='text'
          className='form-control'
          placeholder='Enter a note name'
          value={value}
          onChange={(event) => setValue(event.target.value)}
        />
      </div>
    </form>
  )
}