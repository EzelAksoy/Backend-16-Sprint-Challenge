const supertest = require("supertest");
const server = require("./server");
const db = require("../data/dbconfig");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db.seed.run();
});

test("[0] test deneme", () => {
  expect(true).toBe(true);
});

describe("AUTH", () => {
  it("Login Test", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    expect(res.body.message).toBe("welcome Ezel");
  }, 1000);
  it("Login token test", async () => {
    let token;
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    token = res.body.token;
    expect(res.body.token).toBe(token);
  }, 1000);
});
