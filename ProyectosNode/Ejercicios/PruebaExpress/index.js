const express = require("express");
let app = express();

app.get("/fecha", (req, res) => {
  let fecha = new Date();
  res.send(fecha);
});
app.get("/usuario", (req, res) => {
  const os = require("os");
  const user = os.userInfo();
  res.send(user);
});

app.listen(8080);
