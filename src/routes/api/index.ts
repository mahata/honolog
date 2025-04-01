import { Hono } from 'hono';
import articlesRouter from './articles';

const apiRouter = new Hono();

apiRouter.route('/v1/articles', articlesRouter);

export default apiRouter;
