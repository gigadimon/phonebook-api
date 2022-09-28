require("dotenv").config();
const jwt = require("jsonwebtoken");
const { loginUser } = require("../controllers/userController");
const { login } = require("../service/usersService");
const { UnauthorizedError } = require("../errors/user");

describe("Login test", () => {
  it("Testing status of correct response", () => {
    const mReq = {
      body: { email: "test@gmail.com", password: "testpassword" },
    };
    const mRes = {};
    const mNext = jest.fn();
    loginUser(mReq, mRes, mNext)
      .then((data) => expect(data.statusCode).toBe(200))
      .catch((error) => expect(mNext).toHaveBeenCalled());
  });
  it("Testing of returned token and type of user`s data", () => {
    const mEmail = "test@email.com";
    const mPassword = "testpassword";
    const mUser = { _id: "1", email: mEmail };
    const token = jwt.sign(mUser, process.env.AUTH_SECRET);
    login(mEmail, mPassword)
      .then((data) => {
        expect(data.token).toBe(token);
        expect(typeof data.user.email).toBe("string");
        expect(typeof data.user.subscription).toBe("string");
      })
      .catch((error) => expect(error).toBeInstanceOf(UnauthorizedError));
  });
});
