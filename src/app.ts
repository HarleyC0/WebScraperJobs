import express from "express";
import { getOnBoardJobs } from "./scrapers/getOnBoardScraper.js";


const app = express();
const PORT = 3000

app.get("/", async (req, res) => {
    const response = await getOnBoardJobs()
    const listJobs = JSON.stringify(response, null, 2)
    res.send(`<pre>${listJobs}</pre>`)
})

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});