import { Router, Request, Response } from "express";
import multer from "multer";
import { db } from "../models/db";
import { ObjectId } from "mongodb";

const router = Router();

const upload = multer({ dest: "public/static/", preservePath: true });

router.get("/movies/:id", async (req: Request, res: Response) => {
    const id = new ObjectId(req.params.id);
    try {
        const movie = await db.collection("movies").findOne({ _id: id });
        res.status(200).json({ movie });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err });
    }
});
router.get("/movies", async (req: Request, res: Response) => {
    try {
        const movies = await db.collection("movies").find({}).toArray();
        res.status(200).json({ movies });
    } catch (err) {
        res.status(500).json({ err });
    }
});

router.post(
    "/movies",
    upload.fields([
        { name: "poster", maxCount: 1 },
        { name: "file", maxCount: 1 },
    ]),
    async (req: Request, res: Response) => {
        const { title, year, runtime, director, plot } = req.body;
        try {
            const { poster, file } = req.files as {
                poster: Express.Multer.File[];
                file: Express.Multer.File[];
            };
            const first = file[0];
            const movie_id = await db
                .collection("files")
                .insertOne({
                    originalname: first.originalname,
                    destination: first.destination,
                    filename: first.filename,
                    path: first.path,
                    size: first.size,
                    mimetype: first.mimetype,
                    type: "movie",
                })
                .then((res) => res.insertedId);

            const second = poster[0];
            const poster_id = await db
                .collection("files")
                .insertOne({
                    originalname: second.originalname,
                    destination: second.destination,
                    filename: second.filename,
                    path: second.path,
                    size: second.size,
                    mimetype: second.mimetype,
                    type: "poster",
                })
                .then((res) => res.insertedId);
            const movie = {
                title,
                year,
                runtime,
                director,
                plot,
                file: movie_id,
                poster: poster_id,
            };
            let result = await db.collection("movies").insertOne(movie);
            res.status(201).json({ movie: result });
        } catch (err) {
            res.status(500).json({ err });
        }
    }
);

router.get("/delete/all", async (req: Request, res: Response) => {
    try {
        await db.collection("movies").deleteMany({});
        await db.collection("files").deleteMany({});
        res.status(200).json({ msg: "success" });
    } catch (err) {
        res.status(500).json({ err });
    }
});

export { router as movieRouter };
