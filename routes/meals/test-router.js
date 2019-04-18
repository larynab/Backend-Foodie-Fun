//Router Module
const express = require("express");

//model
const mealsModel = require("./meals-model.js");
//router
const router = express.Router();
//restricted access
const restricted = require("../../auth/restricted.js");

//MEALS CRUD
router.get("/all", async (req, res) => {
  try {
    const meals = await mealsModel.getAllMeals();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json(error);
  }
});

// AUTHORIZED ONLY
// POST
router.post("/", restricted, async (req, res) => {
  try {
    const meal = await mealsModel.addMeal(req.body);
    res.status(201).json(meal);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding the meal"
    });
  }
});

//Export Router
module.exports = router;
