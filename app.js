const express = require("express");
const app = express();

const add = require("@sustainer-network/event-store-add-service");
const tokensFromReq = require("@sustainer-network/tokens-from-req");
const middleware = require("@sustainer-network/event-store-middleware");
const logger = require("@sustainer-network/logger");

middleware(app);

app.post("/", (req, res) => {
  logger.info("HI: ", { params: req.body, tokens: tokensFromReq(req) });
  add({ params: req.body, tokens: tokensFromReq(req) })
    .then(() => res.send({}))
    .catch(e => {
      logger.error("some ee", { e, stack: e.stack });
      res.status(e.statusCode || 500).send(e);
    });
});

module.exports = app;
