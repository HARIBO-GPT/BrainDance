import express, {type Application, type Request, type Response } from 'express';


const app: Application = express(); 

const PORT: number = 3000;

app.get("/", (req: Request, res: Response) => {
    res.send("hihi");
});

app.get("/good", (req: Request, res: Response) => {
    res.send("good");
});

app.listen(PORT, () => {
    console.log(`✅Server listenting on http://localhost:${PORT} 🚀 `)
})