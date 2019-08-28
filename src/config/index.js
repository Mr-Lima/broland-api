import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file ⚠️");
}

export const port = parseInt(process.env.PORT, 10);
export const ec2Instance = process.env.EC2_INSTANCE;
export const databaseUrl = process.env.DB_URL;
export const jwtSecret = process.env.JWT_SECRET;
export const logs = {
  level: process.env.LOG_LEVEL || 'silly',
};
