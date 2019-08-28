import { json } from 'express';
import cors from 'cors';
import handleError from '../../services/helpers/utility';

/**
 * Init Express middleware
 *
 * @param {import('express').Router} router
 * @returns {void}
 */
export function registerMiddleware(router) {
  router.use(cors());
  router.use(json());
}

/**
 * Init Express error handler
 *
 * @param {import('express').Router} router
 * @var {Error} err
 * @returns {void}
 */
export function registerErrorHandler(router) {
  // eslint-disable-next-line no-unused-vars
  router.use((err, req, res, next) => {
    handleError(err);

    return res.status(500).json({
      error: err.message || err,
      status: 500,
    });
  });
}
