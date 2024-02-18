const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware/checkToken");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contactController");

const { registerUser } = require("../../controllers/userController");

router.use(checkToken);

router.get("/", listContacts);
router.get("/:id", getContactById);
router.delete("/:id", removeContact);
router.post("/", addContact);
router.put("/:id", updateContact);

router.post("/register", registerUser);

module.exports = router;
