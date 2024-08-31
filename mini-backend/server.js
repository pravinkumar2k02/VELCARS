const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

//App Config
const app = express();
const port = process.env.PORT || 8000;
const dbUrl = process.env.connection_url;

//Middleware
app.use(cors());
app.use(express.json());

//DB Connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => console.log("DB Connected!!"));

//API Routes
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const commonRoutes = require("./routes/common");
const authRoutes = require("./routes/auth");

app.use("/auth", authRoutes);
app.use("/common", commonRoutes);
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.listen(port, () => console.log(`Server running at ${port}`));

// CDO5cF6Y4NRj5eJT
// connection_url=mongodb+srv://admin:CDO5cF6Y4NRj5eJT@cluster0.ecxzuxw.mongodb.net/?retryWrites=true&w=majority