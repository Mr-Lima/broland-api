import { Router } from 'express';
import { env } from '../../../config/globals';
import { getInstanceStatus } from '../../../services/aws';
import { validate, start, stop } from './controller';

/**
 *
 *
 * @export
 * @param {import('express').Router} router
 * @param {string} prefix
 */
export default function registerServerRoutes(router, prefix) {
  const serverRouter = new Router();
  serverRouter.get('/status', async (req, res, next) => {
    try {
      const result = await getInstanceStatus(env.EC2_INSTANCE);
      res.send({ status: result });
    } catch (err) {
      next(err);
    }
  });

  serverRouter.post('/start', validate('toggleServer'), start);
  serverRouter.post('/stop', validate('toggleServer'), stop);

  router.use(`${prefix}`, serverRouter);
}
