const asyncHandler = require("express-async-handler");
const Expense = require("../models/expenseModel");

// @desc Create new Expense
// @route POST /api/expenses/create
// @access Private
const createExpense = asyncHandler(async (req, res) => {
    const expense = new Expense({
        ...req.body,
        owner:req.user._id
    });
    try {
        await expense.save();
        res.status(201).send(expense);
      } catch (error) {
        res.status(400).send(error);
      }
});


// @desc get all Expenses of an User
// @route GET /api/expenses/all
// @access Private
// GET /api/expenses/all(number of request per page )&skip=20(number of items skiped to jump on next page) 
// GET /api/expenses/all?sortBy=createdAt:asc/desc
const getAllExpenses = asyncHandler(async(req,res)=>{
    
  const sort = {}

  if(req.query.sortBy){
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
  }

  try {
    const expense = await Expense.find({
      owner: req.user._id,
    })
      .limit(req.query.limit)
      .skip(req.query.skip)
      .sort(sort);

    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send();
  }
})


// @desc get a particular Expense
// @route GET /api/expenses/all
// @access Private
const getExpense = asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    try {
        
      const expense = await Expense.findOne({ _id, owner: req.user._id });
      if (!expense) {
        res.status(404).send({error:'Expense not found!'});
      }
      res.status(200).send(expense);
    } catch (error) {
      res.status(500).send();
    }

})

// @desc update expense
// @route PATCH /api/expenses/:id
// @access Private
const updateExpense = asyncHandler(async(req,res)=>{
    const _id = req.params.id;

    const updates = Object.keys(req.body);
    const allowedUpdates = ["title", "amount", "date"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates" });
    }
    try {
      const expense = await Expense.findOne({ _id, owner: req.user._id });
      if (!expense) {
        return res.status(404).send({error:'Expense not found!'});
      }
      updates.forEach((update) => (expense[update] = req.body[update]));
      await expense.save();
      res.status(200).send(expense);
    } catch (error) {
      res.status(400).send(error);
    }
})

// @desc Delete expense
// @route DELETE /api/expenses/:id
// @access Private
const deleteExpense = asyncHandler(async(req,res)=>{
    const _id = req.params.id;
    try {
      const expense = await Expense.findOneAndDelete({ _id, owner: req.user._id});
      if (!expense) {
        return res.status(404).send({error:'Expense not found!'});
      }
      res.status(200).send({ expense, msg: "Expense succesfully deleted" });
    } catch (error) {
      res.status(500).send();
    }
    
})


module.exports={
    createExpense,
    getExpense,
    getAllExpenses,
    deleteExpense,
    updateExpense,
}