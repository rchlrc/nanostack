const express = require('express');
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render('home');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('This app is running on port' + port);
});