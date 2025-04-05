import {addVideo, updateVideo, deleteVideo, addView, getByTag, getVideo, random, search, sub, trend, like, dislike} from "../controllers/video.js"
import express from "express"
import {mw} from "../mw.js"
const router = express.Router()

router.post("/", mw, addVideo)
router.put("/:id", mw, updateVideo)
router.delete("/:id", mw, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", mw, sub)
router.get("/tags", getByTag)
router.get("/search", search)
router.put("/dislike/:id", mw, dislike);
router.put("/like/:id", mw, like);



export default router;