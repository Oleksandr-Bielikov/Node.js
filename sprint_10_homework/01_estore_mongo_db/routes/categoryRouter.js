import { Router } from "express";
const router = Router();

import {
    getCategoryGoods,
    getCategory,
    getItemByName,
    getAllCategories
} from "../db/helpers.js";

router.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories();

        if (categories?.length === 0) return res.status(404).render('404', { messsage: 'Page not found' });

        res.render('categories', {'cats' : categories});
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    };
});

router.get('/:categoryName', async(req, res)=> {
    const {categoryName} = req.params;
    
    const category = await getCategory(categoryName);
    if (!category) {
        return res.status(404).render('404', {message: 'cat not found'})
    }

    const data = await getCategoryGoods(categoryName);
    res.render('category_single', {'goods' :  data, category});
});

router.get('/:categoryName/:itemName', async(req, res)=> {
    const {categoryName, itemName} = req.params;
    
    const category = await getCategory(categoryName);
    if (!category) {
        return res.status(404).render('404', {message: 'cat not found'})
    }

    const data = await getItemByName(itemName);
    res.render('item_single', {'item' :  data, category});
});

export default router;