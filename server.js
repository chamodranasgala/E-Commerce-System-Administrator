const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//import routes
const mainCategoryRoutes = require('./routes/main_category');
const subcategoryRoutes = require('./routes/subcategory');
const manageProductRoutes = require('./routes/products');

//app middleware
app.use(bodyParser.json());
app.use(cors());

//route middleware
app.use(mainCategoryRoutes);
app.use(subcategoryRoutes);
app.use(manageProductRoutes);


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