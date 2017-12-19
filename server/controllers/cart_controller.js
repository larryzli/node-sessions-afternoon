const swag = require("../models/swag");

module.exports = {
    add: (req, res, next) => {
        const { id } = req.query;

        if (req.session.user.cart.findIndex(item => item.id == id) === -1) {
            const item = swag.find(item => item.id == id);
            req.session.user.cart.push(item);
            req.session.user.total += item.price;
        }

        return res.status(200).json(req.session.user);
    },
    delete: (req, res, next) => {
        const { id } = req.query;
        const itemIndex = req.session.user.cart.findIndex(
            item => item.id == id
        );
        req.session.user.total -= req.session.user.cart[itemIndex].price;
        req.session.user.cart.splice(itemIndex, 1);

        return res.status(200).json(req.session.user);
    },
    checkout: (req, res, next) => {
        req.session.user.cart = [];
        req.session.user.total = 0;

        return res.status(200).json(req.session.user);
    }
};
