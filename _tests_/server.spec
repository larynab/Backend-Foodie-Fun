const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("../api/server.js");

afterEach(async () => {
  await db("meals").truncate();
});

//GLOBAL
let token;

beforeAll(async done => {
  await db("users").truncate();
  request(server)
    .post("/api/auth/register")
    .send({
      username: "user",
      password: "pw"
    })
    .end((err, response) => {
      //RESPONSE LOG IF NEEDED
      //    console.log(response)
      token = response.body.token; // save the token!
      done();
    });
});

//TEST SUITES
describe("server.js", () => {
  describe("GET /api/meals", () => {
    it("should set testing enviroment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    it.only("should return JSON", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return status code 401 when not authorized.", () => {
      return request(server)
        .get("/api/meals")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it("should return status code 200 when authorized", () => {
      console.log("TOKEN", token);
      return request(server)
        .get("/api/meals")
        .set("Authorization", `${token}`)
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });
});
