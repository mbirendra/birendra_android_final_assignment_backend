const express= require("express");
const bodyParser= require("body-parser");
const db = require('./database/db');
const path = require('path');
const user_route = require('./routes/user_register_route');
const productRoute = require('./routes/productRoute');
const bookingRoute = require('./routes/bookingRoute');
const cors = require('cors');



const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/image',express.static(path.join(__dirname,'/image')));
app.use(express.json());
app.use(user_route);
app.use(productRoute);
app.use(bookingRoute);

app.listen(90)

