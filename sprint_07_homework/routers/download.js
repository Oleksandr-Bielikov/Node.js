import { Router } from "express";
import path from "path";
const router = Router();

router.get('/', (req, res) => {
  const filePath = path.join('data', 'goods.json');
  res.download(filePath, 'goods.json', (error) => {
    if (error) {
      console.error('Downloading error:', error);
      res.status(500).send('Unable to download file');
    };
  });
});

export default router;