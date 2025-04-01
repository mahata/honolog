import { Hono } from 'hono';
import { renderer } from './renderer';
import apiRouter from './routes/api';
import webRouter from './routes/web';

type Bindings = {
  DB: D1Database;
}

const app = new Hono<{ Bindings: Bindings }>();

app.use(renderer);

// Mount routers
app.route('/', webRouter);
app.route('/api', apiRouter);

export default app;
