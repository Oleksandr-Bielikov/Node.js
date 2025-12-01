import { Router } from "express";
import { readFile } from 'fs/promises';
import path from "path";

const router = Router();

router.get('/', async (req, res) => {
    if (!req.cookies.cart) return res.send("Cart is empty");

    const dataCookie = JSON.parse(req.cookies.cart);
    const [[url, quantity]] = Object.entries(dataCookie);

    try {
        const store = await readFile(path.join('data', 'goods.json'), { encoding: 'utf-8' });
        const parsedStore = JSON.parse(store);

        const product = parsedStore.find(item => item.url === url);

        if (!product) return res.send('0');

        if (product.stock >= quantity) {
            return res.send('1');
        } else {
            return res.send('0');
        };
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    };
});

export default router;