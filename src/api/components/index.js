import registerServerRoutes from './server/routes';

/**
 * Init Express api routes
 *
 * @param {import('express').Router} router
 * @param {string} prefix
 * @returns {void}
 */
export default function registerApiRoutes(router, prefix) {
  registerServerRoutes(router, `${prefix}/server`);
}
