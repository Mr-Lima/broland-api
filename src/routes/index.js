import { Router } from 'express';
import serverRoutes from './server';

const router = Router();

router.use('/server', serverRoutes);

export default router;
