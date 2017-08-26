import express from 'express';

import CourtsController from './controllers/courts';
import StatusController from './controllers/status';

const router = express.Router();

router.get('/', StatusController.view);
router.get('/courts', CourtsController.readAll);
router.get('/courts/:id', CourtsController.read);
router.post('/courts/:id/votes', CourtsController.vote);

export default router;
