import 'reflect-metadata';
import * as cors from 'cors';
import * as express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './config/ioc.container';
import './controller/home.controller';
import './controller/contacts.controller';

const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cors({ origin: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
});

const app = server.build();

app.listen(4001, () => {
  console.log('✅ Listening on: http://localhost:4001');
});
