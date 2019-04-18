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
  let meal = {
    item_name: "HOT DOG"
  };
  describe("GET /api/meals", () => {
    it("should set testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });

    it("should return JSON", () => {
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

    it.skip("should return status code 200 when authorized", () => {
      return request(server)
        .set("Authorization", `${token}`)
        .get("/api/meals")
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("POST /api/meals", () => {
    let meal = {
      item_name: "BURGER"
    };
    it("should return JSON", () => {
      return request(server)
        .post("/api/meals")
        .set("Authorization", `${token}`)
        .send(meal)
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return status code 401 when not authorized.", () => {
      return request(server)
        .post("/api/meals")
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it.skip("should return status code 200 when authorized", () => {
      return request(server)
        .post("/api/meals")
        .set("Authorization", `${token}`)
        .send(meal)
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("PUT /api/meals", () => {
    it("should return JSON", () => {
      return request(server)
        .put(`/api/meals/${meal.id}`)
        .set("Authorization", `${token}`)
        .send(meal)
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return status code 401 when not authorized.", () => {
      return request(server)
        .put(`/api/meals/${meal.id}`)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it.skip("should return status code 200 when authorized", () => {
      return request(server)
        .set("Authorization", `${token}`)
        .put(`/api/meals/18`)
        .send(meal)
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });

  describe("DELETE /api/meals", () => {
    it("should return JSON", () => {
      return request(server)
        .delete(`/api/meals/${meal.id}`)
        .set("Authorization", `${token}`)
        .send(meal)
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return status code 401 when not authorized.", () => {
      return request(server)
        .delete(`/api/meals/${meal.id}`)
        .then(res => {
          expect(res.status).toBe(401);
        });
    });

    it.skip("should return status code 200 when authorized", () => {
      return request(server)
        .set("Authorization", `${token}`)
        .put(`/api/meals/${meal.id}`)
        .send(meal)
        .then(response => {
          expect(response.statusCode).toBe(200);
        });
    });
  });
});
