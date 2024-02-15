const express = require("express");
const router = express.Router();
const { checkToken } = require("../middleware/checkToken");

router.use(checkToken);

router.get("/", async (req, res, next) => {
  try {
    res.json({ message: "Get contacts functionality" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    res.json({ message: `Get contact with id ${req.params.contactId}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    res.json({
      message: `Contact with id ${req.params.contactId} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    res.json({
      message: `Contact with id ${req.params.contactId} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
