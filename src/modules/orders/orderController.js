const orderService = require("./orderService");

/**
 * Update order status
*/
const updateStatus = async(req, res) => {

    let orderData = {};
    orderData.orderId = req.params.orderId;
    orderData.orderStatus = req.body.status;
    orderData.userId = req.userId;

    console.log("Updating order ...");
    console.log(orderData);

    try {
        const response = await orderService.updateOrderStatus(orderData); 
        const {data, error} = response;

        if(error) {
            throw error;
        }

        res.status(200).json({
            success: 1,
            data,
            message: "Order updated successfully"
        });
    } catch(err) {
        console.log(err.message);
        res.status(400).json({
            success: 0,
            error: err
        });
    }  
}

module.exports = {
    updateStatus
}