import { Router } from 'express';
import AWS_EC2 from 'aws-sdk/clients/ec2';
import { ec2Instance } from '../config';

const ec2 = new AWS_EC2({ region: 'us-east-2' });
const router = Router();

router.route('/status').get((req, res, next) => {
  ec2.describeInstanceStatus(
    { InstanceIds: [ec2Instance], IncludeAllInstances: true },
    (err, data) => {
      if (err) next(err);
      else res.send({ status: data.InstanceStatuses[0].InstanceState.Name });
    },
  );
});

router.route('/start').post((req, res, next) => {
  // TODO: continuar aqui
  // ec2.startInstances({ InstanceIds: [ec2Instance] }, (err, data) => {
  //   if (err) next(err);
  //   else res.send({ status: data.InstanceStatuses[0].InstanceState.Name });
  // });
});

export default router;
