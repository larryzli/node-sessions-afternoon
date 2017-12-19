// REQUIRE PACKAGES
const express = require("express");
const cors = require("cors");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();

// REQUIRE DEPENDENCIES AND CONTROLLERS
const checkForSession = require(`${__dirname}/middlewares/checkForSession`);
const swgc = require("./controllers/swag_controller");
const ac = require("./controllers/auth_controller");
const cc = require("./controllers/cart_controller");
const sc = require("./controllers/search_controller");

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
app.get("/api/swag", swgc.read);

// USER API
app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.post("/api/signout", ac.signout);
app.get("/api/user", ac.getUser);

// CART API
app.post("/api/cart", cc.add);
app.post("/api/cart/checkout", cc.checkout);
app.delete("/api/cart", cc.delete);

// SEARCH API
app.get("/api/search", sc.search);

// LISTEN ON PORT
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
