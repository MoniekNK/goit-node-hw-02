const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contactController");

router.get("/", listContacts);
router.get("/:id", getContactById);
router.delete("/:id", removeContact);
router.post("/", addContact);
router.put("/:id", updateContact);

module.exports = router;
