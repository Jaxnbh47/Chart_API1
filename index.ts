import express, {Application, Request, Response} from "express"

const app:Application = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, (): void => {
    console.log(`Listening on port ${port}`);
});