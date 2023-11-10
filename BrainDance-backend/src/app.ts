import express, {type Application, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import { UserRouter } from './User/UserRouter'
import { ProjectRouter } from './Project/ProjectRouter'
import { QuizRouter } from './Quiz/QuizRouter';
import { KeywordRouter } from './Keyword/KeywordRouter';
import cors from 'cors';


const app: Application = express(); 

app.use(cors())
const PORT: number = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', UserRouter);
app.use('/api/project', ProjectRouter);
app.use('/api/quiz', QuizRouter);
app.use('/api/keyword', KeywordRouter);

app.get("/test", (req: Request, res: Response) => {
    res.send("api connect test complete!");
});

app.listen(PORT, () => {
    console.log(`✅Server listenting on http://localhost:${PORT} 🚀 `)
})