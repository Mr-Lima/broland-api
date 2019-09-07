import { Router } from 'express';
import { validate, start, stop, status, toggle } from './controller';

/**
 *
 *
 * @export
 * @param {import('express').Router} router
 * @param {string} prefix
 */
export default function registerServerRoutes(router, prefix) {
  const serverRouter = new Router();

  serverRouter.get('/status', status);
  serverRouter.post('/toggle', validate('toggleServer'), toggle);
  serverRouter.post('/start', validate('toggleServer'), start);
  serverRouter.post('/stop', validate('toggleServer'), stop);

  router.use(`${prefix}`, serverRouter);
}
