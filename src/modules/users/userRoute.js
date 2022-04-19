const router = require("express").Router();
const userController = require("./userController");
const {validate} = require("./../middleware/authenticate");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.delete("/delete/:userId", validate, userController.deleteUser);

// TODO: EXTRA APIS: 
// router.get('/',controller.getAllUsers )
// router.get('/:id',controller.getUsersById )

module.exports = router;
