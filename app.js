const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.APP_SERVER_PORT;
const MONGO_URL = process.env.MONGO_DB_URL;

// This is our server
const app = express();

// This for auto parsing HTTP data to json
app.use(express.json({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/links.routes"));
app.use("/t", require("./routes/redirect.routes"));

// Frontend static
if (process.env.NODE_ENV === "production") {
  // Path to built frontend ./client/build
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  // * <-- Any get request
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (e) {
    console.log("Server error:", e.message);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => console.log(`App has been started on port ${PORT}`));
