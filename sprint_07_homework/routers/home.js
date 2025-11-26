import { Router } from 'express';
const router = Router();
import { getGoods } from '../utilities/goods.js';

const getRandomGoods = (arr, count) => {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, count);
};

router.get('/', async (req, res) => {
    const goods = await getGoods();

    const randomGoods = {};
  for (const category in goods) {
    randomGoods[category] = getRandomGoods(goods[category], 4);
    };
    
    res.render('main', { goods: randomGoods });
});

export default router;
