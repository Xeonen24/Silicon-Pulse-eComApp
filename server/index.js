const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookie = require('cookie-parser')
const bodyparser = require('body-parser')
const Routes = require("./route/routes");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
app.get('/', (req, res)=>{
    res.send("Hello");
    console.log("rahal bate");

})
app.use("/api", Routes);
const port=5000;
app.listen(port, ()=>{
    console.log("Server jonra trike se chalal bate");
})
