const users = require(`${__dirname}/../models/users`);
let id = 1;

module.exports = {
    login: (req, res, next) => {
        const { username, password } = req.body;
        const user = users.find(
            user => user.username === username && user.password === password
        );

        if (user) {
            req.session.user.username = username;
            return res.status(200).json(req.session.user);
        } else {
            return res.status(500).json();
        }
    },
    register: (req, res, next) => {
        const { username, password } = req.body;
        users.push({ id, username, password });
        id++;
        req.session.user.username = username;
        return res.status(200).json(req.session.user);
    },
    signout: (req, res, next) => {
        req.session.destroy();
        res.status(200).json(req.session);
    },
    getUser: (req, res, next) => {
        res.status(200).json(req.session.user);
    }
};
