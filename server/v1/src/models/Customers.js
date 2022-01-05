const Mongoose = require('mongoose');

const CustomerSchema = new Mongoose.Schema(
  {
    name: String,
    group: String,
    birthday: Date,
    user_id: {
      type: Mongoose.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = Mongoose.model('customer', CustomerSchema);
