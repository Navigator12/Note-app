import React from "react"
import {Note} from "./Note"

export const NotesList = ({notes}) => {
  return (
    <ul className="list-group">
      {notes.map((note, index) => (
        <li
          className='list-group-item note'
          key={note._id}
        >
          <Note title={note.title} index={index} date={note.date} _id={note._id}/>
        </li>
      ))}
    </ul>
  )
}