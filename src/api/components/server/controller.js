import { body } from 'express-validator';
import { Unauthorized, UnprocessableEntity } from 'http-errors';
import {
  startInstance,
  stopInstance,
  getInstanceStatus,
} from '../../../services/aws';
import { env } from '../../../config/globals';
import { validateRequest } from '../../../services/helpers/utility';

export function validate(method) {
  switch (method) {
    case 'toggleServer':
      return [
        body('user', 'empty user').exists(),
        body('password', 'empty password').exists(),
      ];
    default:
      return [];
  }
}

export async function status(req, res, next) {
  try {
    const result = await getInstanceStatus(env.EC2_INSTANCE);
    res.send(result);
  } catch (err) {
    next(err);
  }
}

export async function toggle(req, res, next) {
  validateRequest(req, next);
  if (req.body.user !== 'admin' || req.body.password !== 'crespo')
    next(new Unauthorized('Invalid credentials'));
  else {
    try {
      const statusResult = await getInstanceStatus(env.EC2_INSTANCE);
      if (statusResult.status === 'running') {
        const result = await stopInstance(env.EC2_INSTANCE);
        res.send(result);
      } else if (statusResult.status === 'stopped') {
        const result = await startInstance(env.EC2_INSTANCE);
        res.send(result);
      } else {
        throw new UnprocessableEntity(
          'The server is doing something, try another time',
        );
      }
    } catch (err) {
      next(err);
    }
  }
}

export async function start(req, res, next) {
  validateRequest(req, next);
  if (req.body.user !== 'admin' || req.body.password !== 'crespo')
    next(new Unauthorized('Invalid credentials'));
  else {
    try {
      const result = await startInstance(env.EC2_INSTANCE);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
}

export async function stop(req, res, next) {
  validateRequest(req, next);
  if (req.body.user !== 'admin' || req.body.password !== 'crespo')
    next(new Unauthorized('Invalid credentials'));
  else {
    try {
      const result = await stopInstance(env.EC2_INSTANCE);
      res.send(result);
    } catch (err) {
      next(err);
    }
  }
}
