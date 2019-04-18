exports.up = function(knex) {
  return knex.schema.createTable("meals", meals => {
    meals.increments();

    meals.string("restaurant_name", 255);
    meals.string("restaurant_type", 255);
    meals.string("item_name", 255).notNullable();
    meals.string("item_photo", 255);
    meals.integer("food_rating");
    meals.text("item_comment");
    meals.text("wait_time");
    meals.date("date_visited");

    meals
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("meals");
};
