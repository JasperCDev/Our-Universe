import express, { Application, Request, Response } from 'express';
const app: Application = express();
const PORT = process.env.PORT || 3000;

import '../database/index';
import { getGlobalClicks, updateGlobalClicks, getTopUsers, getUser, updateUserClicks, createUser } from '../database/controllers';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 1000, user_name: 'Jasper' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 1000 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 800, user_name: 'Jasper2' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 800 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 600, user_name: 'Jasper3' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 600 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 400, user_name: 'Jasper4' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 400 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 200, user_name: 'Jasper5' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 200 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 100, user_name: 'Jasper6' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 100 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 80, user_name: 'Jasper7' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 80 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 60, user_name: 'Jasper8' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 60 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 40, user_name: 'Jasper9' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 40 } } as Request, { send: () => { } } as Response);
}, 2000);

setInterval( async () => {
  await updateUserClicks({ body: { clicks: 20, user_name: 'Jasper10' } } as Request, { send: () => { } } as Response);
  await updateGlobalClicks({ body: { clicks: 20 } } as Request, { send: () => { } } as Response);
}, 2000);

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
