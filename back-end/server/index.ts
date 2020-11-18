import express, { Application, Request, Response } from 'express';
const app: Application = express();
const PORT = process.env.PORT || 3000;

import '../database/index';
import { getGlobalClicks, updateGlobalClicks, getTopUsers, getUser, updateUserData, createUser, updateUsername, updateOnlineStatus, updateActiveStatus } from '../database/controllers';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';


setInterval(() => {
  updateUserData({ body: { clicks: 2, energyColor: [0, 0, 0], id: 1 } } as Request, { send: () => { }, sendStatus: () => { } } as unknown as Response);
  updateGlobalClicks({ body: { clicks: 2 } } as Request, { send: () => { } } as Response);
}, 1000);


app.use(compression());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(bodyParser.json());

app.get('/globalClicks', (req: Request, res: Response) => getGlobalClicks(req, res));

app.put('/globalClicks', (req: Request, res: Response) => updateGlobalClicks(req, res));

app.get('/user', (req: Request, res: Response) => getUser(req, res));

app.post('/user', (req: Request, res: Response) => createUser(req, res));

app.put('/user', (req: Request, res: Response) => updateUserData(req, res));

app.get('/users', (req: Request, res: Response) => getTopUsers(req, res));

app.put('/username', (req: Request, res: Response) => updateUsername(req, res));

app.put('/online', (req: Request, res: Response) => updateOnlineStatus(req, res));

app.put('/active', (req: Request, res: Response) => updateActiveStatus(req, res));


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
