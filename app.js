const fs = require("fs");
const express = require("express");
const req = require("express/lib/request");
const app = express();
app.use(express.json());

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));

// app.get("/", (req, res) => {
//   res.status("200").json({ message: "Hello from the express" });
// });

// app.post("/", (req, res) => {
//   res.end("Express endpoint...");
// });

app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});

app.get("/api/v1/users/:id", (req, res) => {
  const id = req.params.id * 1;
  const userId = users.find((el) => el.id === id);
  //   if (id > users.length) {
  if (!userId) {
    return res.status(404).json({
      status: "Failed",
      message: `Id ${id} is not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      userId,
    },
  });
});

app.post("/api/v1/users", (req, res) => {
  const newID = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newID }, req.body);
  users.push(newUser);
  fs.writeFile(`${__dirname}/data/users.json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        users: newUser,
      },
    });
  });
});

const port = 9000 || "";
app.listen(port, () => {
  console.log(`Listening from the port ${port}...`);
});
