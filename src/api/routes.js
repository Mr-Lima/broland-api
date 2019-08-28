import registerApiRoutes from './components';

/**
 * Init Express REST routes
 *
 * @param {import('express').Router} router
 * @returns {void}
 */
export default function initRestRoutes(router) {
  const prefix = '';

  registerApiRoutes(router, prefix);
}
