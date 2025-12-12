import { Router } from "express";
import { getTags, getUsersData } from "../db/helpers.js";
const router = Router();

router.get('/', async (req, res) => {
    const { sort, role, notes, tag } = req.query;
    const filters = {};
    const options = {};

    if (sort === "min") {
        options.age = 1;
    } else if (sort === "max") {
        options.age = -1;
    };

    if (role && role !== "all") {
        filters.role = role;
    };

    if (notes) {
        filters.notes = { $exists: true, $ne: null};
    };

    if (tag) {
        filters.tags = tag;
    };

    const uniqueTags = await getTags();
    const data = await getUsersData(filters, options);

    res.render("main", { data, role, uniqueTags, notesChecked: notes ? true : false });
});

export default router;