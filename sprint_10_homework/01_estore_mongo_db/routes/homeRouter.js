import { Router } from "express";
const router = Router();

import { getAllGoods } from "../db/helpers.js";

router.get('/', async(req, res)=> {
    const data = await getAllGoods();
    res.render('main', {'goods' :  data});
});

export default router;