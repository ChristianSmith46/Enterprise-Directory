const User = require("./models/User");
const { signToken } = require("./utils/auth");


module.exports = {
    createUser: async (req, res) => {
        try {
            console.log(req.body)
            const { name, email, password, phoneNumber, managerID, roleID, salary } = req.body;
            const userData = { name, email, password, phoneNumber, managerID, roleID, salary };
            const newUser = await User.create(userData);
            const token = signToken({ email, _id: newUser._id });
            res.send({ _id: newUser._id, token });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    updateUser: (req, res) => {
        res.send({ error: "Requires Completion" })
    },
    getMe: async (req, res) => {
        try {
            const { _id } = req.user
            const user = await User.findById(_id, { password: 0, __v: 0 });
            console.log(user);
            res.send({ user });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) req.status(400).send({ error: "email or password invalid" });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }

    },
    deleteUser: (req, res) => {
        res.send({ error: "Requires Completion" })
    }
};