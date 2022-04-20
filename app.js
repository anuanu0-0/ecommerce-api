require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const orderRoute = require("./src/modules/orders/orderRoute");
const productRoute = require("./src/modules/products/productRoute");
const userRoute = require("./src/modules/users/userRoute");

app.use(cors());

app.get('/', (req, res) => res.status(200).json({
    success: 1,
    message: 'This is the home page',
    req
}));

app.use('/api/order', jsonParser, orderRoute);
app.use('/api/product', jsonParser, productRoute);
app.use('/api/user', jsonParser, userRoute);

const port = process.env.APP_PORT || 8081;
app.listen(port, () => {
    console.log("Server up and running on port : ", port);
});