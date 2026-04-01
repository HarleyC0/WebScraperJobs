import express from "express";
import { getOnBoardJobs } from "./scrapers/getOnBoardScraper.js";
import path from "path";


const app = express();
const PORT = 3000

// ruta para servir el index.html en pagina principal
app.use(express.static(path.join(process.cwd(), 'public')));

// Middleware para leer datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

app.get("/jobs", async (req, res) => {
    const keyword = req.query.keyword as string | undefined
    const response = await getOnBoardJobs(keyword)
    res.json(response)
})

app.listen(PORT, () => {
    console.log(`Running server on port ${PORT}`);
});