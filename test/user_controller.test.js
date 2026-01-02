const { expect } = require("chai");
const User = require("../models/user.model");
const sinon = require("sinon");
const { login } = require("../controllers/user.controller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

describe("login controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        email: "test@gmail.com",
        password: "password",
      },
    };

    res = {
      json: sinon.spy(), // for to observe the function=> if function executed, how many parameters passed in function
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  // user not found

  it("should not return token if the user is not found", async () => {
    sinon.stub(User, "findOne").resolves(null);

    //user = null

    await login(req, res);

    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({
      message: "Invalid credentials",
    });
  });

  // password is wrong

  it("should return Invalid credentials if password is wrong", async () => {
    //mock
    sinon.stub(User, "findOne").resolves({
      _id: "1234",
      password: "hashedPassword",
      role: "user",
    });

    sinon.stub(bcrypt, "compare").resolves(false);

    await login(req, res);

    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({
      message: "Invalid credentials, password is wrong",
    });
  });

  // success

  it("should return token if the credentails are valid0", async () => {
    sinon.stub(User, "findOne").resolves({
      _id: "1234",
      password: "hashedPassword",
      role: "user",
    });

    sinon.stub(bcrypt, "compare").resolves(true);
    sinon.stub(jwt, "sign").returns("fake-jwt-token"); // mocking

    await login(req, res);

    expect(res.json.calledOnce).to.be.true;
    expect(res.json.firstCall.args[0]).to.deep.equal({
      message: "login successfully",
      token: "fake-jwt-token",
    });
  });
});
