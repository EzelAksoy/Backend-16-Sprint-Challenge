const supertest = require("supertest");
const server = require("./server");
const db = require("../data/dbconfig");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../Secret");

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
  it("[1] Login Test", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    expect(res.body.message).toBe("welcome Ezel");
  }, 1000);
  it("[2] Login Token Test", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    jwt.verify(res.body.token, JWT_SECRET, (err, decodeToken) => {
      if (err) {
        expect("err found").toBe("err");
      } else {
        expect(decodeToken.username).toBe("Ezel");
      }
    });
  }, 1000);
  it("[3] Register Test", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "Mustafa",
      password: "12345",
      email: "aksoy.mustafa@gmail.com",
    });
    expect(res.body.username).toBe("Mustafa");
  });
  it("[4] Register Error Status", async () => {
    const res = await supertest(server).post("/api/auth/register").send({
      username: "Mustafa",
      email: "aksoy.mustafa@gmail.com",
    });
    expect(res.status).toBe(400);
  });
});

describe("USERS", () => {
  it("[5] Tüm Usersları Getirme", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    const Response = await supertest(server)
      .get("/api/users")
      .set("authorization", res.body.token);
    expect(Response.body).toHaveLength(5);
  }, 1000);
  it("[6] Id'ye Göre User Getirme", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    const Response = await supertest(server).get("/api/users/2");
    expect(Response.body.username).toMatch("Aden");
  }, 1000);
  it("[7] Id'ye Göre User Silme", async () => {
    const res = await supertest(server).post("/api/auth/login").send({
      username: "Ezel",
      password: "1234",
      email: "aksoy.ezel@gmail.com",
    });
    const Response = await supertest(server).delete("/api/users/2");
    expect(Response.body.message).toBe("Token not found");
  }, 1000);
});
