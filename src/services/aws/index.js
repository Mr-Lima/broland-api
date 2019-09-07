import AWS_EC2 from 'aws-sdk/clients/ec2';
import { InternalServerError } from 'http-errors';

const ec2 = new AWS_EC2({ region: 'us-east-2' });
/**
 *
 *
 * @export
 * @param {string} instance
 */
export async function getInstanceStatus(instance) {
  const res = await ec2
    .describeInstances({
      InstanceIds: [instance],
    })
    .promise();
  const state = res.Reservations[0].Instances[0].State.Name;
  return {
    status: state,
    ip:
      state === 'running'
        ? res.Reservations[0].Instances[0].PublicIpAddress
        : 'Unknown',
  };
}

/**
 *
 *
 * @export
 * @param {string} instance
 */
export async function startInstance(instance) {
  const res = await ec2.startInstances({ InstanceIds: [instance] }).promise();
  return { state: res.StartingInstances[0].CurrentState.Name };
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
    return { state: res.StoppingInstances[0].CurrentState.Name };
  } catch (err) {
    throw new InternalServerError('aws error');
  }
}
