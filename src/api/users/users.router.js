import Router from 'express';
import * as usersController from './users.controller.js';
import * as accessControl from '../../middlewares/accessControl.middleware.js';

const router = Router();

// router.get('/all', accessControl.verifyTokenAndAdmin, usersController.getAll);
router.get('/all', usersController.getAll);
// router.get('/:id', accessControl.verifyTokenAndAdmin, usersController.getById);
router.get('/:id', usersController.getById);

// router.patch('/:id', accessControl.verifyTokenAndAuthorization, usersController.patchById);
router.patch('/:id', usersController.patchById);

// router.delete('/:id', accessControl.verifyTokenAndAuthorization, usersController.deleteById);
router.delete('/:id', usersController.deleteById);

router.post('/changepasswordrequest', usersController.changePasswordRequest);
router.post('/changepassword/:token', usersController.changePassword);

export default router;
