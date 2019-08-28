import { config } from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = config();

if (!envFound) {
  throw new Error("⚠️  Couldn't find .env file ⚠️");
}

// eslint-disable-next-line import/prefer-default-export
export const env = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: parseInt(process.env.PORT, 10),
  EC2_INSTANCE: process.env.EC2_INSTANCE,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
};
