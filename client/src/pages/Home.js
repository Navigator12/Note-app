import React, {useCallback, useEffect, useContext} from "react"
import {Form} from "../components/Form"
import {NotesList} from "../components/NotesList"
import {useHttp} from "../hooks/http.hook"
import {NotesContex} from "../context/notes/notesContext"

export const Home = () => {
  const {request} = useHttp()
  const {notes, setNotes} = useContext(NotesContex)

  const fetchedNotes = useCallback(async () => {
    try {
      const fetched = await request('/api/note')

      setNotes(fetched)
    } catch (e) {}
  }, [request, setNotes])

  useEffect(() => {
    fetchedNotes()
  }, [fetchedNotes])

  return (
    <>
      <Form />

      <NotesList notes={notes}/>
    </>
  )
}