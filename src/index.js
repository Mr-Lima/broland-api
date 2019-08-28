import { createServer } from 'http';
import { env } from './config/globals';
import logger from './config/logger';
import app from './api/server';

async function startServer() {
  try {
    logger.info('Starting server');
    const server = createServer(app);

    app.get('/status', (req, res) => {
      res.status(200).end();
    });
    app.head('/status', (req, res) => {
      res.status(200).end();
    });

    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    server.listen(env.PORT);

    server.on('listening', () => {
      logger.info(
        `\n################################################
        🛡️  Server listening on port: ${env.PORT} in ${env.NODE_ENV} 🛡️ 
        ################################################`,
      );
    });

    server.on('close', () => {
      logger.info('Server closed');
    });
  } catch (err) {
    logger.error(err.stack);
  }
}

startServer();
