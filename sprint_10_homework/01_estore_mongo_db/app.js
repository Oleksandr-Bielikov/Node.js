import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import { MongoClient } from 'mongodb';
import { setClient } from './db/db.js';

import homeRouter from './routes/homeRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import aboutRouter from './routes/aboutRouter.js';

import { getAllCategories, getGoodsFor404 } from './db/helpers.js';

const PORT = process.env.PORT || 4200;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

const client = new MongoClient(MONGO_URI);
await client.connect();
setClient(client);
console.log(`connect to MongoDB - OK`);


app.use('/', homeRouter);
app.use('/category', categoryRouter);
app.use('/about', aboutRouter);

app.use(async (req, res) => {
    try {
        const categories = await getAllCategories();
        const goods = await getGoodsFor404();
        res.render('404', {message: 'Page not found', 'cats' : categories, 'goods' : goods});
    } catch (error) {
        res.status(500).send("Internal server error");
    };
});

app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));

import './db/shutdown.js';