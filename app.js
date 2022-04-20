const express = require("express");
const app = express();
const fs = require("fs");
app.use(express.json());
const PORT = 8000;

const users = JSON.parse(fs.readFileSync(`${__dirname}/data/users.json`));

app.get("/api/v1/users", (req, res) => {
  res.status(200).json({
    status: "success",
    results: users.length,
    message: "Hello form the other side...",
    data: { users },
  });
});

app.post("/api/v1/users", (req, res) => {
  const userId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: userId }, req.body);
  users.push(newUser);
  fs.writeFile(`${__dirname}/data/users/json`, JSON.stringify(users), (err) => {
    res.status(201).json({
      status: "succes",
      message: "New User Added...",
      data: {
        user: newUser,
      },
    });
  });
});

app.get("/api/v1/users/:id", (req, res) => {
  const id = req.params.id * 1;
  const userData = users.find((item) => item.id === id);
  res.status(200).json({
    message: "Success",
    data: {
      userData,
    },
  });
});

app.listen(PORT);
