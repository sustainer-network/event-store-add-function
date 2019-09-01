const express = require("express");
const app = express();

const add = require("@sustainers/event-store-add-service");
const tokensFromReq = require("@sustainers/tokens-from-req");
const middleware = require("@sustainers/event-store-middleware");

middleware(app);

app.post("/", (req, res) => {
  add({ params: req.body, tokens: tokensFromReq(req) })
    .then(() => res.send({}))
    .catch(e => res.status(e.statusCode || 500).send(e));
});

module.exports = app;
