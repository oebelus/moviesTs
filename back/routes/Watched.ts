import express from 'express'
const router = express.Router()
import Watched from '../database/models/Watched.js'

router.use(express.json())
router.use(express.urlencoded({ extended: true }))

router.post('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId
        const { title, year, runtime, type, poster } = req.body

        if (!title) {
            return res.status(400).json({ error: "Bad Request", message: "Missing required fields" });
        }
        
        const existingMovie = await Watched.findOne({
            where: { title, humanId: userId}
        })
        if (existingMovie) {
            return res.status(400).json({ error: "Bad Request", message: "Movie already exists in Watched" });
        }
        
        const watchedMovie = await Watched.create({ humanId: userId, title, year, runtime, type, poster})
        res.status(201).json({watchedMovie, humanId: userId, message: "Movie added to watched"});
    } catch (err) {
        console.error("Internal Server Error: " + (err as Error).message);
        res.status(500).json({ error: "Internal Server Error", message: (err as Error).message });
    }
})

router.delete('/:userId/:id', async (req, res) => {
    try {
        const userId = req.params.userId;
        const movieId = req.params.id;
        const movieToDelete = await Watched.findByPk(movieId)

        if (!movieToDelete)
            return res.status(404).json({ error: 'Movie not fount' })
        
        await movieToDelete.destroy()
        res.status(204).send()
    } catch (err) {
        console.error(err)
        res.send(500).send((err as Error).message)
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const listOfWatched = await Watched.findAll({ where: { humanId: userId}})
        res.status(200).json(listOfWatched)
    }
    catch (err) {
    console.error("Internal Server Error: " + (err as Error).message);
    res.status(500).json({ error: "Internal Server Error", message: (err as Error).message });
    }
})

export default router