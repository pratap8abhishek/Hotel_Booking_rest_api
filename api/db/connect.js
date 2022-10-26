const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Hottel_Booking").then(()=>{
    console.log("DB succesfully connected");
}).catch(()=>{
    console.log("error in DB connection");
})
