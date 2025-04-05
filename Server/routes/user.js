import {deleteUser, dislike, getUser, like, subscribe, unsubscribe, update, updname, updpass, updimg} from "../controllers/user.js"
import express from "express"
import {mw} from "../mw.js"

const router = express.Router();

router.put("/:id", mw, update);
router.delete("/;id", mw, deleteUser);
router.get("/find/:id", getUser);
router.put("/sub/:id", mw, subscribe);
router.put("/usub/:id", mw, unsubscribe);
router.put("/like/:videoId", mw, like);
router.put("/dislike/:videoId", mw, dislike);
router.post("/updname", mw, updname);
router.post("/updpass", mw, updpass);
router.post("/updimg", mw, updimg);

export default router;
