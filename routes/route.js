import { Router } from "express";
import { addAluminis, findAluminis } from "../controller/user.js";
import { addAward } from "../controller/excellence.js";
import multer from "multer";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/adds", addAluminis);
router.get("/find", findAluminis);
router.post("/addAward", upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "supportingdocuments", maxCount: 1 }
]), addAward);

export default router;