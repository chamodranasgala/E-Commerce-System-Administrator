const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const manageCategory = require('./routes/manage_category');
const manageProduct = require('./routes/manage_product');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(manageCategory);
app.use(manageProduct);

const PORT = 8000;
const DB_URL = 'mongodb+srv://test:test@testapp.i4jjk55.mongodb.net/testApp?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => console.log('DB connection error', err));

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`);
});