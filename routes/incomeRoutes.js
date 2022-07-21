const express = require("express");
const router = express.Router();
const {
 createIncome,
 getIncome,
 getAllIncomes,
 deleteIncome,
 updateIncome,
} = require("../controllers/incomeController");
const {protect} = require('../middleware/authMiddleware')

router.post("/create", protect, createIncome);
router.get("/all", protect, getAllIncomes);
router.get("/:id", protect, getIncome);
router.delete("/:id", protect, deleteIncome);
router.patch("/:id", protect, updateIncome);


module.exports = router;
