const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use(productRoutes);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
