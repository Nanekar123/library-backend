import express from "express";
import {toggleWishlist,getWishlist} from "../controllers/wishlistController.js";

const router = express.Router();

router.post("/",toggleWishlist);

router.get("/:userId",getWishlist);

export default router;