import { Router } from "express";
import { getTags, getUsersData, userAgeFilter, userFieldFilter, userRoleFilter, userTagsFilter } from "../db/helpers.js";
const router = Router();

router.get('/', async (req, res) => {
    const { sort, role, notes, tag } = req.query;
    let data = await getUsersData();

    if (sort === "min") {
        data = await userAgeFilter(1);
    } else if (sort === "max") {
        data = await userAgeFilter(-1);
    };

    if (role && role !== "all") {
        data = await userRoleFilter(role);
    };

    if (notes) {
        data = await userFieldFilter("notes");
    };

    const uniqueTags = await getTags();

    if (uniqueTags.includes(tag)) {
        data = await userTagsFilter(tag)
    }

    res.render("main", { data, role, uniqueTags, notesChecked: notes ? true : false });
});

export default router;