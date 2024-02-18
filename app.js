const express = require("express");
const validateContact = require("./middleware/validateContact");
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use("/api/contacts", validateContact, contactsRouter);
app.use("/api/auth", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid token" });
  } else {
    next(err);
  }
});

module.exports = app;
