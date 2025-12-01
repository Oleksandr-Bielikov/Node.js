import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    const utmParams = ["utm_source", "utm_medium", "utm_campaign", "utm_term"];
    const ageOfCookies = 25 * 24 * 60 * 60 * 1000;

    utmParams.forEach((param) => {
        if (req.query[param]) {
            res.cookie(param, req.query[param], { maxAge: ageOfCookies });
        };
    });
    res.send('products page');
});

export default router;