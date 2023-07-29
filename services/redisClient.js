const { createClient } = require("redis");

let client;

(async () => {
  client = createClient();
  await client.connect();
})();

module.exports = client;
