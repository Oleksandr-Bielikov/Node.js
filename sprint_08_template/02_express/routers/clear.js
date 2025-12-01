import { Router } from "express";
const router = Router();

router.get('/', (req, res) => {
    const cookies = Object.keys(req.cookies);

    cookies.forEach((cookie) => {
        res.clearCookie(cookie, {path: '/'});
    });
    res.send("Clear Cookie page");
});

export default router;