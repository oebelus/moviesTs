var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
const router = express.Router();
import Watchlist from '../database/models/Watchlist.js';
router.post('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const { title, year, runtime, type, poster } = req.body;
        if (!title) {
            return res.status(400).json({ error: "Bad Request", message: "Missing required fields" });
        }
        const existingMovie = yield Watchlist.findOne({
            where: { title, humanId: userId }
        });
        if (existingMovie) {
            return res.status(400).json({ error: "Bad Request", message: "Movie already in your watchlist." });
        }
        const watchedMovie = yield Watchlist.create({ humanId: userId, title, year, runtime, type, poster });
        res.status(201).json({ watchedMovie, humanId: userId, message: "Movie added to watched" });
    }
    catch (err) {
        console.error("Internal Server Error: " + err.message);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
}));
router.delete('/:userId/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const movieId = req.params.id;
        const movieToDelete = yield Watchlist.findByPk(movieId);
        if (!movieToDelete)
            return res.status(404).json({ error: 'Movie not fount' });
        yield movieToDelete.destroy();
        res.status(204).send();
    }
    catch (err) {
        console.error(err);
        res.send(500).send(err.message);
    }
}));
router.get('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const listOfWatched = yield Watchlist.findAll({ where: { humanId: userId } });
        res.status(200).json(listOfWatched);
    }
    catch (err) {
        console.error("Internal Server Error: " + err.message);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
}));
export default router;
//# sourceMappingURL=Watchlist.js.map