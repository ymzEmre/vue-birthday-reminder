const BaseService = require('./BaseService');
const BaseModel = require('../models/Customers');
class CustomerService extends BaseService {
  constructor() {
    super(BaseModel);
  }
  list(where) {
    return BaseModel.find(where || {}).populate({
      path: 'user_id',
      select: 'name',
    });
  }
}

module.exports = new CustomerService();
