const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");

//COMMENT ON/OFF to RESET DB FOR TESTING
// afterEach( async  ()=> {
//   await db("meals").truncate();
// });

//GLOBAL---------------------------------------------------------------
let token;
//POST LOGIN, RECEIVE TOKEN, token used for TESTSs
beforeAll(async done => {
  await db("users").truncate();
  request(server)
    .post("/api/auth/register")
    .send({
      username: "user",
      password: "pw"
    })
    .end((err, response) => {
      //RESPONSE LOG IF NEEDED to see variables/objects being stored locations
      //    console.log(response)
      token = response.body.token; // save the token!
      done();
    });
});

//TEST SUITES-----------------------------------------------------------
describe("server.js", () => {
  describe("POST/GET users", () => {
    it("should Login with credentials, res 200", async () => {
      const credentials = {
        username: "user",
        password: "pw"
      };
      const response = await request(server)
        .post("/api/auth/login")
        .send(credentials);

      expect(response.status).toBe(200);
    });

    it("should get user list, res 200", () => {
      return request(server)
        .get("/api/auth/all")
        .then(res => {
          expect(res.status).toBe(200);
        });
    });
  });

  describe("CRUD meals", () => {

    it("GET req, should return JSON", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("GET req, should return status code 401 when not authorized.", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("GET req, should return status code 200 when authorized", () => {
      console.log("TOKEN", token);
      return request(server)
        .get("/api/meals")
        .set("Authorization", `${token}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
    it("POST req, should send meal to the db, then res 201", async () => {
      const testMeal = {
        item_name: "test"
      };
      const response = await request(server)
        .post("/api/meals")
        .set("Authorization", `${token}`)
        .send(testMeal);
      expect(response.status).toBe(201);
    });
    it("PUT req, should update. then res 200", async () => {
      const response = await request(server)
        .put("/api/meals/1")
        .send({ item_name: "test2" })
        .set("Authorization", `${token}`);

      expect(response.status).toBe(200);
    });
    it("DELETE req, then res 200", async () => {
      const response = await request(server)
        .delete("/api/meals/1")
        .set("Authorization", `${token}`);
      expect(response.status).toBe(200);
    });
  });
});

afterAll(async done => {
  await db("meals").truncate();
  done();
});
