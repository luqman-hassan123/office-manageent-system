const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const attendanceRoutes = require("./routes/attendanceRoutes")

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/userRole" , require("./routes/userRoleRoutes"))
app.use("/api/attendance", attendanceRoutes )

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});
