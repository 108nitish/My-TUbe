import {addComment, deleteComment, getComments} from "../controllers/comments.js";

import express from "express";
import {mw} from "../mw.js"; // mw->> middleware

const router = express.Router()

router.post("/", mw, addComment)
router.delete("/:id", mw, deleteComment)
router.get("/:videoId", getComments);

export default router;