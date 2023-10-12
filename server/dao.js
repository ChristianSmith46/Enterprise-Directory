const User = require("./models/User");
const { signToken } = require("./utils/auth");
const { spawn } = require("child_process");

module.exports = {
  createUser: async (req, res) => {
    try {
      console.log(req.body);
      const {
        name,
        email,
        password,
        phoneNumber,
        managerID,
        role,
        salary,
        location,
      } = req.body;
      const userData = {
        name,
        email,
        password,
        phoneNumber,
        managerID,
        role,
        salary,
        location,
      };
      const newUser = await User.create(userData);
      const token = signToken({ role: newUser.role, email, _id: newUser._id });
      res.send({ success: true, _id: newUser._id, token });
    } catch (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        // Duplicate username
        return res
          .status(422)
          .send({ success: false, message: "Email already exists." });
      }
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  },
  updateUser: (req, res) => {
    res.send({ error: "Requires Completion" });
  },
  getMe: async (req, res) => {
    try {
      const { _id } = req.user;
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
      if (!user)
        return res
          .status(400)
          .send({ success: false, error: "email or password invalid" });
      const isCorrectPassword = await user.isCorrectPassword(password);
      if (!isCorrectPassword)
        return res
          .status(400)
          .send({ success: false, error: "email or password invalid" });
      const token = signToken({ role: user.role, email, _id: user._id });
      res.send({ success: true, email, token });
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { role } = req.user;
      const { id } = req.params;
      if (!id)
        return res.status(400).send({ success: false, error: "No ID found" });
      if (role !== "Hr")
        return res
          .status(400)
          .send({ success: false, error: "Higher role required" });
      const mongoOutput = await User.deleteOne({ _id: id });
      if (mongoOutput.deletedCount === 0)
        return res.status(400).send({ success: false, error: "No User Found" });
      res.send({ success: true, mongoOutput });
    } catch (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res
          .status(422)
          .send({ success: false, message: "Invalid ID Format" });
      }
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  },
  getDirectReports: async (req, res) => {
    try {
      const { _id, role } = req.user;
      if(role === "Manager"){
        const directReports = await User.find(
            { managerID: _id },
            { password: 0, __v: 0 }
          );
          res.send({ success: true, directReports });
      } else if (role === "Hr") {
        const directReports = await User.find({},
            { password: 0, __v: 0 }
          );
          res.send({ success: true, directReports });
      } else {
        res.send({ success: false, error: "No Employees Below you" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  },
  getOneDirectReport: async (req, res) => {
    try {
      const { _id } = req.user;
      const { employeeID } = req.params;
      const employee = await User.findOne(
        { managerID: _id, _id: employeeID },
        { phoneNumber: 0, password: 0, __v: 0, email: 0 }
      );
      if (!employee)
        return res.status(400).send({ success: false, error: "No User Found" });
      res.send({ success: true, employee });
    } catch (err) {
      if (err.name === "CastError" && err.kind === "ObjectId") {
        return res
          .status(422)
          .send({ success: false, message: "Invalid ID Format" });
      }
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  },
  searchBy: async (req, res) => {
    try {
      const { _id, role } = req.user;
      const { name } = req.query;
      let users;
      if (role === "Hr") {
        users = await User.find(
          { name: { $regex: name, $options: "i" } },
          { password: 0, __v: 0 }
        );
      } else if (role === "Manager") {
        users = await User.find(
          { name: { $regex: name, $options: "i" }, managerID: _id },
          { password: 0, __v: 0 }
        );
      } else {
        return res.status(400).send({
          success: false,
          error: "You don't have permission to see other employees",
        });
      }
      res.send(users);
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: "Server error" });
    }
  },
  predictSalary: async (req, res) => {
    const input = req.body;

    const data = JSON.stringify(input);
    console.log({ data });
    // Spawn a child process to execute the predict.py script
    // The Python binary name might be different on your machine. Just "python" for example.
    const pythonScript = spawn("python", ["predict.py"]);

    // Send the data to the predict.py script via stdin
    pythonScript.stdin.write(data);
    pythonScript.stdin.end();

    let predictionData = "";

    // Collect the predicted data from stdout of the predict.py script
    pythonScript.stdout.on("data", (data) => {
      predictionData += data.toString();
    });

    // Handle the completion of the predict.py script
    pythonScript.on("close", (code) => {
      if (code === 0) {
        // Parse the predicted data
        const prediction = JSON.parse(predictionData);
        console.log({ prediction });

        // Return the predictions as the response
        res.send({success: true, prediction: prediction[0]});
      } else {
        // Return an error response
        res.status(500).json({ error: "Prediction failed" });
      }
    });
  },
};
