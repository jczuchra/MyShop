const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorRoutes = require('./routes/errors');

const rootDir = require('./util/path');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, "public")));

app.use(shopRoutes);

app.use('/admin', adminRoutes);

app.use(errorRoutes);

app.listen(3000);