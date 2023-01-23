import express from "express";
import cors from "cors";

import users from '../data/users.js';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.get("/api/users", (req, res, next) => {
  return res.status(200).json(users.user);
});

app.listen(PORT, () => console.log(`Running app in port: ${PORT}`));
