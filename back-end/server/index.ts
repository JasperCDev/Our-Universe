import express, { Application, Request, Response } from 'express';
const app: Application = express();
const PORT = process.env.PORT || 3000;

import '../database/index';
import { getGlobalClicks, updateGlobalClicks, getTopUsers, getUser, updateUserClicks, createUser } from '../database/controllers';
import bodyParser from 'body-parser';
import path from 'path';
import compression from 'compression';


setInterval(() => {
  updateUserClicks({ body: { clicks: 35, user_name: 'JasperBOT' } } as Request, { send: () => { } } as Response);
  updateGlobalClicks({ body: { clicks: 35 } } as Request, { send: () => { } } as Response);
}, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 33, user_name: 'JosephBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 33 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 30, user_name: 'BethanyBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 30 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 27, user_name: 'DavidBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 27 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 24, user_name: 'KellieBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 24 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 20, user_name: 'JayBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 20 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 18, user_name: 'TimBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 18 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 16, user_name: 'JimenaBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 16 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 14, user_name: 'MarkBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 14 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 10, user_name: 'AbbieBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 10 } } as Request, { send: () => { } } as Response);
// }, 2000);

// setInterval(() => {
//   updateUserClicks({ body: { clicks: 7, user_name: 'RileyBOT' } } as Request, { send: () => { } } as Response);
//   updateGlobalClicks({ body: { clicks: 7 } } as Request, { send: () => { } } as Response);
// }, 2000);

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
