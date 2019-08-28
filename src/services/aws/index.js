import AWS_EC2 from 'aws-sdk/clients/ec2';
import { InternalServerError } from 'http-errors';
import logger from '../../config/logger';

const ec2 = new AWS_EC2({ region: 'us-east-2' });
/**
 *
 *
 * @export
 * @param {string} instance
 */
export async function getInstanceStatus(instance) {
  try {
    const res = await ec2
      .describeInstanceStatus({
        InstanceIds: [instance],
        IncludeAllInstances: true,
      })
      .promise();
    return res.InstanceStatuses[0].InstanceState.Name;
  } catch (err) {
    throw new InternalServerError('aws error');
  }
}

/**
 *
 *
 * @export
 * @param {string} instance
 */
export async function startInstance(instance) {
  try {
    const res = await ec2.startInstances({ InstanceIds: [instance] }).promise();
    return res.StartingInstances[0].CurrentState.Name;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError('aws error');
  }
}

/**
 *
 *
 * @export
 * @param {string} instance
 */
export async function stopInstance(instance) {
  try {
    const res = await ec2.stopInstances({ InstanceIds: [instance] }).promise();
    return res.StoppingInstances[0].CurrentState.Name;
  } catch (err) {
    logger.error(err);
    throw new InternalServerError('aws error');
  }
}
