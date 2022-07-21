const express = require("express");
const router = express.Router();
const {
 createExpense,
 getExpense,
 getAllExpenses,
 deleteExpense,
 updateExpense,
} = require("../controllers/expenseController");
const {protect} = require('../middleware/authMiddleware')

router.post("/create", protect, createExpense);
router.get("/all", protect, getAllExpenses);
router.get("/:id", protect, getExpense);
router.delete("/:id", protect, deleteExpense);
router.patch("/:id", protect, updateExpense);


module.exports = router;
