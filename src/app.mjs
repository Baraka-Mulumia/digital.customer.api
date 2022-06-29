import cors from "cors";
import customerRouter from "./api-routes/customers.routes.mjs";
import express from "express";
import morgan from "morgan";

var allowlist = [
  "http://localhost:3000",
  "https://digital-customers-web-app.vercel.app",
];

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true, optionsSuccessStatus: 200 };
  } else {
    corsOptions = { origin: false, optionsSuccessStatus: 200 };
  }
  callback(null, corsOptions);
};

const app = express();
app.use(morgan("dev"));
app.use(cors(corsOptionsDelegate));
app.use(express.json());

app.use("/customers", customerRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
