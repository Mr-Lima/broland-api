import { validationResult } from 'express-validator';
import { UnprocessableEntity } from 'http-errors';
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

export function validateRequest(request, next) {
  const valErr = validationResult(request);
  if (!valErr.isEmpty()) next(new UnprocessableEntity(valErr.array()));
}
