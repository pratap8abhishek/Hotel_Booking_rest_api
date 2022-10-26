const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
require("./api/db/connect");
const port = process.env.PORT || 3000;


app.use(express.json());

app.use(router);


app.listen(port,()=>{
    console.log(`Server is running at ${port}`);
})