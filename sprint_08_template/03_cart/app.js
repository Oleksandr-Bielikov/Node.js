import express from 'express';
import { readFile } from 'fs/promises';
import cookieParser from 'cookie-parser';
import cartRouter from './routers/cart.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cookieParser());

const getPage = async () => {
    try {
        const data = await readFile('./index.html', { encoding: 'utf-8' });
        return data;
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    };
};

app.get('/', async (req, res) => {
    const data = await getPage();
    res.send(data);
});

app.use('/cart', cartRouter);

app.use((req, res) => {
    res.status(404).send("Page not found");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});