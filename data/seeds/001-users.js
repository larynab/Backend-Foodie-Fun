exports.seed = function(knex, Promise) {
  return knex("users").insert([
    { username: "jon", password: "password" },
    { username: "arya", password: "password" }
  ]);
};
