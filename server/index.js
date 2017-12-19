// REQUIRE PACKAGES
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();

// REQUIRE DEPENDENCIES AND CONTROLLERS
const checkForSession = require(`${__dirname}/middlewares/checkForSession`);
const swagController = require("./controllers/swag_controller");
const authController = require("./controllers/auth_controller");
const cartController = require("./controllers/cart_controller");
const searchController = require("./controllers/search_controller");

// INITIALIZE APP
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(json());
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        saveUninitialized: false,
        resave: false
    })
);
app.use(checkForSession);

// SERVE FRONT END
app.use(express.static(`${__dirname}/../build`));

// SWAG API
app.get("/api/swag", swagController.read);

// USER API
app.post("/api/login", authController.login);
app.post("/api/register", authController.register);
app.post("/api/signout", authController.signout);
app.get("/api/user", authController.getUser);

// CART API
app.post("/api/cart", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);
app.delete("/api/cart", cartController.delete);

// SEARCH API
app.get("/api/search", searchController.search);

// LISTEN ON PORT
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
