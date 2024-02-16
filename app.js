const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const Joi = require("joi");
const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/authRoutes");
const currentUserRouter = require("./routes/currentUserRoutes");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

app.use("/api/contacts", validateContact, contactsRouter);

app.use("/api/auth", authRouter);
app.use("/api", currentUserRouter);

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
