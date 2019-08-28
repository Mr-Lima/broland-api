import logger from '../../config/logger';
/**
 *
 *
 * @export
 * @param {Error} err
 * @returns void
 */
export default function handleError(err) {
  logger.error(err.stack || err);
}
