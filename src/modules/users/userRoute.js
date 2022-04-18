const router = require("express").Router();
const userController = require("./userController");

router.post("/login", userController.login);
router.post("/register", userController.register);
router.delete("/delete/:userId", userController.deleteUser);

// TODO: EXTRA APIS: 
// router.get('/user',controller.getUsers )
// router.get('/user/:id',controller.getUsersById )

module.exports = router;
