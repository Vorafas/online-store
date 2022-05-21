require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes');
const errorHandler = require('./middleware/error-handling-middleware');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);
app.use(errorHandler);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (err) {
        console.error(err);
    }
};

start();