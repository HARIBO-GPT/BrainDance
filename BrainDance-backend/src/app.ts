import express, {type Application, type Request, type Response } from 'express';
import bodyParser from 'body-parser';
import type http from 'http';
import { UserRouter } from './User/UserRouter'
import { ProjectRouter } from './Project/ProjectRouter'
import { QuizRouter } from './Quiz/QuizRouter';
import { KeywordRouter } from './Keyword/KeywordRouter';
import cors from 'cors';
import { corsOption } from './config/cors';
import { socketConnect } from './Socket/Socket';


const app: Application = express(); 

const PORT: number = 3000;

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user', UserRouter);
app.use('/api/project', ProjectRouter);
app.use('/api/quiz', QuizRouter);
app.use('/api/keyword', KeywordRouter);

app.get("/test", (req: Request, res: Response) => {
    res.send("api connect test complete!");
});

const webServer: http.Server = app.listen(PORT, () => {
    console.log(`✅Server listenting on http://localhost:${PORT} 🚀 `)
})

socketConnect(webServer);