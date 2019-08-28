import { Router } from 'express';
import { env } from '../../../config/globals';
import { getInstanceStatus } from '../../../services/aws';

/**
 *
 *
 * @export
 * @param {import('express').Router} router
 * @param {string} prefix
 */
export default function registerServerRoutes(router, prefix) {
  const serverRouter = new Router();
  serverRouter.route('/status').get(async (req, res, next) => {
    try {
      const result = await getInstanceStatus(env.EC2_INSTANCE);
      res.send({ status: result });
    } catch (err) {
      next(err);
    }
  });
  router.use(`${prefix}`, serverRouter);

  // router.route('/start').post((req, res, next) => {
  //   // TODO: continuar aqui
  // });
}
