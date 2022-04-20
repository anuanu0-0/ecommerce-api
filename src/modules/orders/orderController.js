const orderService = require("./orderService");

/**
 * Update order status
*/
const updateStatus = async(req, res) => {

    let data = {};
    data.orderId = req.params.orderId;
    data.orderStatus = req.body.status;
    data.userId = req.userId;

    console.log("Updating order ...");
    console.log(data);

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