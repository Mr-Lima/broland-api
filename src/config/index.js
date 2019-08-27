const dotenv = require('dotenv');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file ⚠️");
}

module.exports = {
  port: parseInt(process.env.PORT, 10),
  ec2Instance: process.env.EC2_INSTANCE,
  databaseUrl: process.env.DB_URL,
  jwtSecret: process.env.JWT_SECRET,
  logs: {
    level: process.env.LOG_LEVEL || 'silly',
  },
};
