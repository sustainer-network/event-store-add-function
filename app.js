const express = require("express");
const app = express();

const add = require("@sustainer-network/event-store-add-service");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const middleware = require("@sustainer-network/event-store-middleware");

middleware(app);

app.post("/", (req, res) => {
  add({ params: req.body, tokens: tokensFromReq(req) })
    .then(() => res.send({}))
    .catch(e => res.status(e.statusCode || 500).send(e));
});
