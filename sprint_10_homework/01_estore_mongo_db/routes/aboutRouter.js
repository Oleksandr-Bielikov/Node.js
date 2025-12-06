import { Router } from "express";
const router = Router();
import { getAboutData } from "../db/helpers.js";

router.get('/', async (req, res) => {
    try {
        const data = await getAboutData();
        res.render('about', { "data": data });
    } catch (error) {
        console.error(error);
        res.status(500).send("internal server error");
    };
});

export default router;