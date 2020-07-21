import express, { Application, Request, Response } from 'express';
const app: Application = express();
const PORT = process.env.PORT || 3000;

import '../database/index';
import { getGlobalClicks, updateGlobalClicks, getTopUsers, getUser, updateUserClicks, createUser } from '../database/controllers';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';

app.use(compression());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());

app.get('/global_clicks', (req: Request, res: Response) => getGlobalClicks(req, res));

app.put('/global_clicks', (req: Request, res: Response) => updateGlobalClicks(req, res));

app.get('/user', (req: Request, res: Response) => getUser(req, res));

app.post('/user', (req: Request, res: Response) => createUser(req, res));

app.put('/user', (req: Request, res: Response) => updateUserClicks(req, res));

app.get('/users', (req: Request, res: Response) => getTopUsers(req, res));


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
