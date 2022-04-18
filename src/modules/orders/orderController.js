const orderService = require("./orderService");

/**
 * Update order status
*/
const updateStatus = async(req, res) => {
    const token = req.header("auth-token");
    const authObj = jwt.verify(token, process.env.JWT_KEY);

    let data = {};
    data.productId = req.params.id;
    data.orderStatus = req.body.orderStatus;
    data.userId = authObj.userId;

    console.log("Updating order ...");
    console.log(...data);

    try {
        await orderService.updateOrderStatus(data); 
        res.status(200).json({
            success: 1,
            message: "Order updated successfully"
        });
    } catch(err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            message: err.message
        });
    }  
}

module.exports = {
    updateStatus
}