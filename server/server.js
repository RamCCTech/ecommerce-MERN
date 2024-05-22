const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoute = require("./routes/AuthRoute");
const userRoute = require("./routes/UserRoute");
const cartRoute = require("./routes/CartRoute");
const productRoute = require("./routes/ProductRoute");
const contactUsRoute = require("./routes/ContactUsRoute");

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;

var app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/cart", cartRoute);
app.use("/products", productRoute);
app.use("/contactUs", contactUsRoute);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
