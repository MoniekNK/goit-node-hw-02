const Joi = require("joi");
const fs = require("fs/promises");
const { v4: uuidv4 } = require("uuid");

let contacts = [];

const readContactsFromFile = async () => {
  try {
    const data = await fs.readFile("contacts.json", "utf8");
    contacts = JSON.parse(data);
  } catch (error) {
    console.error("Error reading contacts from file:", error.message);
  }
};

const saveContactsToFile = async () => {
  try {
    await fs.writeFile(
      "contacts.json",
      JSON.stringify(contacts, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error saving contacts to file:", error.message);
  }
};

const validateContact = (contact) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });

  return schema.validate(contact);
};

const listContacts = async () => {
  await readContactsFromFile();
  return contacts;
};

const getById = async (id) => {
  await readContactsFromFile();
  const contact = contacts.find((c) => c.id === id);
  return contact;
};

const addContact = async (contact) => {
  await readContactsFromFile();

  const { error } = validateContact(contact);
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  const newContact = {
    id: uuidv4(),
    ...contact,
  };

  contacts.push(newContact);

  await saveContactsToFile();
  return newContact;
};

const removeContact = async (id) => {
  await readContactsFromFile();

  const index = contacts.findIndex((c) => c.id === id);
  if (index !== -1) {
    contacts.splice(index, 1);
    await saveContactsToFile();
    return true;
  }
  return false;
};

const updateContact = async (id, updatedContact) => {
  await readContactsFromFile();

  const index = contacts.findIndex((c) => c.id === id);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...updatedContact };
    await saveContactsToFile();
    return true;
  }
  return false;
};

module.exports = {
  validateContact,
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
};
