import express from 'express';

import homeRouter from './routers/home.js';
import categoryRouter from './routers/category.js';
import downloadsRouter from './routers/download.js';

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
const PORT = process.env.PORT || 3000;

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(join(__dirname, 'public')));


app.use('/', homeRouter);
app.use('/category', categoryRouter);
app.use('/download', downloadsRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(PORT, () => {
  console.log(`Server start на http://localhost:${PORT}`);
});
