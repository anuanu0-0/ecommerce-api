require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const orderRoute = require("./src/modules/orders/orderRoute");
const productRoute = require("./src/modules/products/productRoute");
const userRoute = require("./src/modules/users/userRoute");

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.status(200).json({
    success: 1,
    message: 'This is the home page'
}));

app.use('/api/order', orderRoute);
app.use('/api/product', productRoute);
app.use('/api/user', userRoute);

const port = process.env.APP_PORT || 8081;
app.listen(port, () => {
    console.log("Server up and running on port : ", port);
});