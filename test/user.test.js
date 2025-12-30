const { expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const User = require("../models/user.model");

before(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/test_db"); // async
});

after(async () => {
  await mongoose.connection.close();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("POST /users", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      name: "Laxman",
      email: "laxman@gmail.com",
      password: ",password",
      role: "user",
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id");
    expect(res.body.email).to.equal("laxman@gmail.com");
  });

  it("should create a new user", async () => {
    const res = await request(app).post("/users").send({
      email: "laxman@gmail.com",
      password: ",password",
      role: "user",
    });
    expect(res.status).to.equal(400);
  });
});
