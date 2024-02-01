const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  validateContact,
} = require("./contacts");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

app.get("/api/contacts", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await getById(id);
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/api/contacts", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const newContact = {
    name,
    email,
    phone,
  };

  try {
    await addContact(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await removeContact(id);
    if (result) {
      res.json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

  const { error } = validateContact(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const updatedContact = {
    name: name && name.trim(),
    email: email && email.trim(),
    phone: phone && phone.trim(),
  };

  try {
    const result = await updateContact(id, updatedContact);
    if (result) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
