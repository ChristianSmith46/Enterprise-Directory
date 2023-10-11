const User = require("./models/User");


module.exports = {
    createUser: async (req, res) => {
        try {
            console.log(req.body)
            const { name, email, password, phoneNumber, managerID, roleID, salary } = req.body;
            const userData = { name, email, password, phoneNumber, managerID, roleID, salary };
            const newUser = await User.create(userData);
            res.send(newUser._id);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    updateUser: (req, res) => {
        res.send({ error: "Requires Completion" })
    },
    getMe: (req, res) => {
        res.send({ error: "Requires Completion" })
    },
    login: (req, res) => {
        res.send({ error: "Requires Completion" })
    },
    deleteUser: (req, res) => {
        res.send({ error: "Requires Completion" })
    }
};