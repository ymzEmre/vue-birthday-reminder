const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/authenticate');
const idChecker = require('../middlewares/idChecker');

const schemas = require('../validations/Customers');
const express = require('express');
const CustomerController = require('../controllers/Customer');
const router = express.Router();

router.route('/').get(authenticate, CustomerController.index);
router.route('/').post(authenticate, validate(schemas.createValidation), CustomerController.create);
router.route('/:id').patch(idChecker(), authenticate, validate(schemas.updateValidation), CustomerController.update);
router.route('/:id').delete(idChecker(), authenticate, CustomerController.deleteProject);

module.exports = router;
