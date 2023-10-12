const User = require("./models/User");
const { signToken } = require("./utils/auth");


module.exports = {
    createUser: async (req, res) => {
        try {
            console.log(req.body)
            const { name, email, password, phoneNumber, managerID, role, salary, location } = req.body;
            const userData = { name, email, password, phoneNumber, managerID, role, salary, location };
            const newUser = await User.create(userData);
            const token = signToken({ role: newUser.role, email, _id: newUser._id });
            res.send({ success: true, _id: newUser._id, token });
        } catch (err) {
            if (err.name === 'MongoServerError' && err.code === 11000) {
                // Duplicate username
                return res.status(422).send({ success: false, message: 'Email already exists.' });
            }
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
            res.send({ success: true, user });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) return res.status(400).send({ success: false, error: "email or password invalid" });
            const isCorrectPassword = await user.isCorrectPassword(password);
            if (!isCorrectPassword) return res.status(400).send({ success: false, error: "email or password invalid" });
            const token = signToken({ role: user.role, email, _id: user._id });
            res.send({ success: true, email, token });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    deleteUser: async (req, res) => {
        try {
            // const { role } = req.user;
            const role = "Hr";
            const { id } = req.params;
            if(!id) return res.status(400).send({success: false, error: "No ID found"});
            if(role !== "Hr") return res.status(400).send({success: false, error: "Higher role required"});
            const mongoOutput = await User.deleteOne({_id: id});
            res.send({ success: true, mongoOutput });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    getDirectReports: async (req, res) => {
        try {
            const { _id } = req.user
            //TODO: Fix managerID once done testing
            const directReports = await User.find({ managerID: 1 }, { phoneNumber: 0, password: 0, __v: 0, email: 0 });
            res.send({ success: true, directReports });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    },
    getOneDirectRport: async (req, res) => {
        try {
            const { _id } = req.user;
            const { employeeID } = req.params;
            //TODO: Fix managerID once done testing
            const employee = await User.findOne({ managerID: 1, _id: employeeID }, { phoneNumber: 0, password: 0, __v: 0, email: 0 });
            res.send({ success: true, employee });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: "Server error" });
        }
    }
};