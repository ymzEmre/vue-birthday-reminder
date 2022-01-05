const express = require('express');
const fileUpload = require('express-fileupload');
const helmet = require('helmet');
const config = require('./config');
const loaders = require('./loaders');
const events = require('./scripts/events');
const path = require('path');
var cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const { UserRoutes, CustomerRoutes } = require('./api-routes');

config();
loaders();
events();

const app = express();
app.use('/uploads', express.static(path.join(__dirname, './', 'uploads')));
app.use(express.json());
app.use(helmet());
app.use(fileUpload());
app.use(cors());

app.listen(process.env.APP_PORT, () => {
  console.log('Sunucu ayağa kalktı..');
  app.use('/users', UserRoutes);
  app.use('/customers', CustomerRoutes);

  app.use((req, res, next) => {
    const error = new Error('Aradığınız sayfa bulunmamaktadır...');
    error.status = 404;
    next(error);
  });

  app.use(errorHandler);
});
