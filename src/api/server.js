import express from 'express';
import initRestRoutes from './routes';
import { registerMiddleware, registerErrorHandler } from './middlewares';

const app = express();
registerMiddleware(app);
initRestRoutes(app);
registerErrorHandler(app);

export default app;
