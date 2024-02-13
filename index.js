// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  if (!date) {
    const now = new Date(Date.now());
    return res.json({ unix: now.getTime() / 1000, utc: now.toUTCString() });
  }
  if (isNaN(date)) {
    const d = new Date(req.params.date);
    console.log(d);
    return d != "Invalid Date"
      ? res.json({ unix: d.getTime() / 1000, utc: d.toUTCString() })
      : res.json({ error: "Invalid Date" });
  } else {
    const d = new Date(parseInt(date) * 1000);

    return d != "Invalid Date"
      ? res.json({ unix: parseInt(date), utc: d.toUTCString() })
      : res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log(
    "Your app is listening on port " +
      "http://localhost:" +
      listener.address().port
  );
});
