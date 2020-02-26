const {Router} = require('express')
const Note = require('../models/Note')
const ObjectId = require('mongoose').Types.ObjectId

const router = Router()

// /api/note
router.get(
  '/',
  async (req, res) => {
    try{
      const notes = await Note.find()

      res.json(notes)

    } catch (e) {
      res.status(500).json({message: 'Something goes wrong, try again'})
    }
  }
)

router.post(
  '/create',
  async (req, res) => {
    try {
      const {title} = req.body

      const candidate = await Note.findOne({ title })

      if (candidate) {
        return res.status(400).json({message: 'Already exists'})
      }

      const note = new Note({title})
      await note.save()

      res.status(201).json({message: 'Note successfully created', note})

    } catch (e) {
      res.status(500).json({message: 'Something goes wrong, try again'})
    }
  }
)

router.delete(
  '/delete',
  async (req, res) => {
    try {
      const {_id} = req.body

      const id = new ObjectId(_id)

      const candidate = await Note.findOne({_id: id})

      if (candidate) {
        await candidate.delete()
      } else {
        res.status(400).json({message: "Note isn't exist"})
      }

      res.json({message: 'Note has been deleted', _id})

    } catch (e) {
      res.status(500).json({message: 'Something goes wrong, try again'})
    }
  }
)

module.exports = router