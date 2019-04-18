exports.seed = function(knex, Promise) {
  return knex("meals").insert([
    {
      restaurant_name: "Pizza Place",
      restaurant_type: "Italian",
      item_name: "Pepperoni Pizza",
      item_photo:
        "https://images.unsplash.com/photo-1544982503-9f984c14501a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80",
      food_rating: 5,
      item_comment: "Wow, pizza was so good! I really enjoyed it!",
      wait_time: "About 10 minutes.",
      date_visited: "2018-11-02",
      user_id: 1
    },
    {
      restaurant_name: "Taco Shop",
      restaurant_type: "Mexican",
      item_name: "Chorizo Tacos",
      item_photo:
        "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
      food_rating: 5,
      item_comment: "These tacos were awesome!",
      wait_time: "There was no wait!",
      date_visited: "2018-07-22",
      user_id: 1
    },
    {
      restaurant_name: "Burger Joint",
      restaurant_type: "American",
      item_name: "The Great Burger",
      item_photo:
        "https://images.unsplash.com/photo-1536510233921-8e5043fce771?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1971&q=80",
      food_rating: 3,
      item_comment: "The burger was a bit overcooked.",
      wait_time: "There was a 5 minute wait.",
      date_visited: "2018-08-21",
      user_id: 1
    },
    {
      restaurant_name: "The Yogurt Shop",
      restaurant_type: "American",
      item_name: "The Healthy Yogurt Bowl",
      item_photo:
        "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2600&q=80",
      food_rating: 2,
      item_comment: "I didn't like this yogurt bowl so much.",
      wait_time: "We did take out. Took about 10 minutes.",
      date_visited: "2018-03-11",
      user_id: 2
    },
    {
      restaurant_name: "The Best Brunch Spot",
      restaurant_type: "American",
      item_name: "Avacodo Toast with Egg",
      item_photo:
        "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2506&q=80",
      food_rating: 5,
      item_comment: "Best toast ever!",
      wait_time: "There was a 20 minute wait.",
      date_visited: "2018-12-12",
      user_id: 2
    }
  ]);
};
