import './env';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes';
import database from './database';

import contentType from './middleware/content-type';
import errors from './middleware/errors';
import headers from './middleware/headers';

const app = express();

database.connect();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Middleware
app.use(contentType);
app.use(headers);

app.use(bodyParser.json({ type: 'application/json' }));

app.use(routes);

app.use(errors);

export default app;
