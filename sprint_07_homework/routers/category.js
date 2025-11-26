import { Router } from 'express';
const router = Router();
import { getGoods } from '../utilities/goods.js';

router.get('/', async (req, res) => {
    const goods = await getGoods();
    res.render('category', {goods});
});

router.get('/:cat', async (req, res) => {
    const { cat } = req.params;
    const goods = await getGoods();

    if (!goods[cat]) {
        return res.status(404).render('404');
    };
    
    const items = goods[cat] || [];
    res.render('category_single', { goods: items, category: cat });
});

export default router;