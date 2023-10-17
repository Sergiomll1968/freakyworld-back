import Router from 'express';
import * as ordersController from './orders.controller.js';
import * as accessControl from '../../middlewares/accessControl.middleware.js';

const router = Router();

// router.get('/all', accessControl.verifyTokenAndAdmin, ordersController.getAll);
router.get('/all', ordersController.getAll);
// router.get('/income', accessControl.verifyTokenAndAdmin, ordersController.getIncome);
router.get('/income', ordersController.getIncome);
// router.get('/:userId', accessControl.verifyTokenAndAuthorization, ordersController.getByUserId);
router.get('/:orderId', ordersController.getByOrderId);

// router.patch('/:id', accessControl.verifyTokenAndAdmin, ordersController.patchById);
router.patch('/:id', ordersController.patchById);

// router.delete('/:id', accessControl.verifyTokenAndAdmin, ordersController.deleteById);
router.delete('/:id', ordersController.deleteById);

// router.post('/', accessControl.verifyToken, ordersController.create);
router.post('/', ordersController.create);

export default router;
