const asyncHandler = require("express-async-handler");
const Income = require("../models/incomeModel");

// @desc Create new Income
// @route POST /api/incomes/create
// @access Private
const createIncome = asyncHandler(async (req, res) => {
  const incomeExists = await Income.findOne({month: req.body.month,year: req.body.year,});
  if (incomeExists) {
    const newIncome = {
      income: req.body.income,
      month: incomeExists.month,
      year: incomeExists.year,
    };
    const updateIncome = await Income.findByIdAndUpdate(incomeExists._id.toString(),newIncome,{new: true,});
    return res.status(200).send(updateIncome);
  }
  const income = new Income({
    income: req.body.income,
    month: req.body.month,
    year: req.body.year,
    owner: req.user._id,
  });
  try {
    await income.save();
    res.status(201).send(income);
  } catch (error) {
    res.status(400).send(error);
  }
});

// @desc get all Incomes of an User
// @route GET /api/incomes/all
// @access Private
// GET /api/incomes/all(number of request per page )&skip=20(number of items skiped to jump on next page)
// GET /api/incomes/all?sortBy=createdAt:asc/desc
const getAllIncomes = asyncHandler(async (req, res) => {
  const sort = {};

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    const income = await Income.find({
      owner: req.user._id,
    })
      .limit(req.query.limit)
      .skip(req.query.skip)
      .sort(sort);

    res.status(200).send(income);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = {
  createIncome,
  getAllIncomes,
};
