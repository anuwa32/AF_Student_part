require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const topicRoutes = require("./routes/topic");
const groupRoutes = require("./routes/group");
//const fileuploadRoutes = require("./routes/fileupload");

// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/topic", topicRoutes);
app.use("/api/group", groupRoutes );
//app.use("/api/fileupload", fileuploadRoutes);

// app.use(express.static(path.join(__dirname, '..', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// });

const port = process.env.PORT || 8082;
app.listen(port, console.log(`Listening on port ${port}...`));
