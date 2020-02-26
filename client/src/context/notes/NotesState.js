import React, {useState} from "react"
import {NotesContex} from "./notesContext"

export const NotesState = ({children}) => {
  const [notes, setNotes] = useState([])

  return (
    <NotesContex.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContex.Provider>
  )
}