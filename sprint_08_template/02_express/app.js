import express from 'express';
import cookieParser from 'cookie-parser';
import getRandomValue from './util/randomUid.js';
import productRouter from './routers/product.js';
import clearRouter from './routers/clear.js';

const app = express();
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    if (req.path === '/clear') return next();

    const uID = getRandomValue();
    if (!req.cookies.uid || req.cookies.uid.length !== 16) {
        res.cookie("uid", uID);
    };
    next();
});

app.get('/', (req, res) => {
    console.log(req.url, req.method)
    res.send('Server works')
});

app.use('/product', productRouter);
app.use('/clear', clearRouter);

app.use((req, res) => {
    res.status(404);
    res.end("Page not found");
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
});