import express from "express";
import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";
import { setClient } from "./db/db_config.js";

import mainRouter from "./routes/main.js";


const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.set("view engine", "pug");
app.set("views", "./views");

try {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    setClient(client);
    console.log("Connected to MongoDB - OK");
} catch (error) {
    console.error(error);
    process.exit(1);
};

app.get("/", (req, res) => {
    res.redirect("/main");
});
app.use('/main', mainRouter);



app.use((req, res) => {
    res.status(404).send("404. Page not found");
});

app.listen(PORT, () => console.log(`Server works on http://localhost:${PORT}`));