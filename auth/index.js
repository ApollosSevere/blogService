const router = require("express").Router();
const {
  models: { User },
} = require("../db");
module.exports = router;

/* These bottom 2 makes sure that the generated token is sent to 
   local storage from redux, then the redux will need to come back and
   run the last route to be able to send the User Object to the Redux
   global State!!
*/

router.post("/login", async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

// This is to get the actual User Object to store in Redux global variable!!

router.get("/me", async (req, res, next) => {
  // Figure out bug that will not give access after initial sign up!
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});
