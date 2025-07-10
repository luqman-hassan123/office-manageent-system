const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes")
const userRoleRoutes = require("./routes/userRoleRoutes")

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/userRole" , userRoleRoutes)

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
