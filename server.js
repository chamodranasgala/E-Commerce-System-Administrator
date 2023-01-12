const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const mainCategory = require('./routes/main_category');
const subcategory = require('./routes/subcategory');
const allCategories = require('./routes/all_categories');

const manageProduct = require('./routes/products');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(mainCategory);
app.use(subcategory);
app.use(allCategories);

app.use(manageProduct);


const PORT = 8000;
const DB_URL = 'mongodb+srv://test:test@testapp.dbydosk.mongodb.net/testApp?retryWrites=true&w=majority';

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