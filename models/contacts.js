const fs = require("fs").promises;

const contactsFilePath = "./db/contacts.json";

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    throw new Error("Unable to read contacts data");
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) throw new Error("Contact not found");
    return contact;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
  } catch (error) {
    throw new Error("Unable to remove contact");
  }
};

const addContact = async (body) => {
  try {
    const contacts = await listContacts();
    const newContact = { ...body, id: Date.now() };
    const updatedContacts = [...contacts, newContact];
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return newContact;
  } catch (error) {
    throw new Error("Unable to add contact");
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.map((contact) =>
      contact.id === contactId ? { ...contact, ...body } : contact
    );
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    return body;
  } catch (error) {
    throw new Error("Unable to update contact");
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
