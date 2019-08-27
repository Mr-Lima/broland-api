const { Router } = require('express');
const AWS_EC2 = require('aws-sdk/clients/ec2');
const { ec2Instance } = require('../config');

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

module.exports = router;
