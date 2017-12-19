const swag = require("../models/swag");

module.exports = {
    search: (req, res, next) => {
        const { category } = req.query;
        if (category) {
            const filteredSwag = swag.filter(
                item => item.category === category
            );
            return res.status(200).json(filteredSwag);
        } else {
            return res.status(200).json(swag);
        }
    }
};
