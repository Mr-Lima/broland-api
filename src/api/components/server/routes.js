import { Router } from 'express';
import { validate, start, stop, status } from './controller';

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
  serverRouter.post('/start', validate('toggleServer'), start);
  serverRouter.post('/stop', validate('toggleServer'), stop);

  router.use(`${prefix}`, serverRouter);
}
