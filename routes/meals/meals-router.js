const express = require("express");
const router = express.Router();

const db = require("../../data/dbConfig");
const restricted = require("../../auth/restricted");

router.get("/", restricted, (req, res) => {
  db("meals")
    .returning("id")
    .where({ user_id: req.decodedToken.subject })
    .then(meals => {
        res.status(200).json(meals)
    })
    .catch(error => {
      res.status(500).json({ error: "The meals could not be retrieved." });
    });
});

router.get("/all", (req, res) => {
  db("meals")
    .returning("id")
    .then(meals => {
      res.status(200).json(meals);
    })
    .catch(error => {
      res.status(500).json({ error: "The meals could not be retrieved." });
    });
});


router.get("/:id", restricted, (req, res) => {
  const { id } = req.params;

  db("meals")
    .returning("id")
    .where({ id, user_id: req.decodedToken.subject })
    .first()
    .then(meal => {
      if (meal) {
        res.status(200).json(meal);
      } else {
        res
          .status(404)
          .json({ error: "You cannot access the meal with this specific id." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The action with the specified ID could not be retrieved"
      });
    });
});

router.post("/", restricted, (req, res) => {
  const meal = req.body;

  if (!meal.item_name) {
    res.status(400).json({ error: "Please provide a name for the meal." });
  } else {
    meal.user_id = req.decodedToken.subject;
    db("meals")
      .returning("id")
      .insert(meal)
      .then(ids => {
        const id = ids[0];
        db("meals")
          .returning("id")
          .where({ id })
          .first()
          .then(meal => {
            res.status(201).json(meal);
          });
      })
      .catch(error => {
        res.status(500).json({
          error: "There was an error while saving the meal to the database."
        });
      });
  }
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  if (!changes.item_name) {
    res.status(400).json({
      error: "Please provide a name for the meal."
    });
  } else {
    db("meals")
    // org
      .where({ id, user_id: req.decodedToken.subject })
      .update(changes)
      .returning("id")
      .then(count => {
        if (count > 0) {
          res.status(200).json(count);
        } else {
          res.status(404).json({
            error: "You cannot access the meal with this specific id."
          });
        }
      })
      .catch(error => {
        res.status(500).json({
          error: "The meal could not be modified."
        });
      });
  }
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  db("meals")
  // org
    .where({ id, user_id: req.decodedToken.subject })
    .del()
    .returning("id")
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ error: "You cannot access the meal with this specific id." });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: "The meal could not be removed."
      });
    });
});

module.exports = router;
