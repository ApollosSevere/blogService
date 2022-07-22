const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
module.exports = app;

// logging middleware
app.use(morgan("dev"));

// body parsing middleware
app.use(express.json());

// auth and api routes
app.use("/auth", require("./auth"));
app.use("/api", require("./api"));

/* Now, when it comes to serving the pages: understand that when a page is requested,
   it will check if the first two up top is a match, then if it doesn't work, as long as
   the route has a / to it, the next route will catch it and send the route index page!!
*/

/* Because we are using React, the only HTML page that we need to serve
   is the index page, and react will handle the rest boi !! */
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "..", "public/index.html"))
);

/* Now, even tho we only need to serve only 1 HTML page, we still need to serve
   different files such as css or images */
// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// for any static files that cannot be found!!
// any remaining requests with an extension (.js, .css, etc.) send 404
app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

// sends index.html
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public/index.html"));
});

// error handling endware
app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});
