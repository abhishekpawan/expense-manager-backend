const express = require("express");
const router = express.Router();
const {
 createIncome,
 getAllIncomes,
} = require("../controllers/incomeController");
const {protect} = require('../middleware/authMiddleware')

router.post("/create", protect, createIncome);
router.get("/all", protect, getAllIncomes);


module.exports = router;
