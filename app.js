var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/restful_kanji");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var kanjiSchema = new mongoose.Schema({
  kanji: String,
  onyomi: String,
  kunyomi: String,
  romaji: String,
  example: String
});

var Kanji = mongoose.model("Kanji", kanjiSchema);

app.get("/", function(req, res){
  res.redirect("/kanji");
});

//INDEX - GET
app.get("/kanji", function(req, res){
  Kanji.find({}, function(err, kanji){
    if(err){
      console.log(err);
    } else {
      res.render("index", {kanji: kanji});
    }
  });
});

//NEW - GET
app.get("/kanji/new", function(req, res){
  res.render("new");
});

//CREATE - POST
app.post("/kanji", function(req, res){
  Kanji.create(req.body.kanji, function(err, kanji){
    if(err){
      console.log(err);
      res.render("new");
    } else {
      console.log(kanji);
      res.redirect("/kanji");
    }
  });
});

//SHOW - GET
app.get("/kanji/:id", function(req, res){
  Kanji.findById(req.params.id, function(err, kanji){
    if(err){
      console.log(err);
      res.redirect("/kanji");
    } else {
      res.render("show", {kanji: kanji});
    }
  });
});

//EDIT - GET
app.get("/kanji/:id/edit", function(req, res){
  Kanji.findById(req.params.id, function(err, kanji){
    if(err){
      console.log(err)
      res.redirect("/kanji");
    } else {
      res.render("edit", {kanji: kanji});
    }
  });
});

//UPDATE - PUT
app.put("/kanji/:id", function(req, res){
  Kanji.findByIdAndUpdate(req.params.id, req.body.kanji, function(err, kanji){
    if(err){
      console.log(err);
      res.redirect("/kanji")
    } else {
      res.redirect("/kanji/" + req.params.id);
    }
  });
});

//DELETE - DELETE
app.delete("/kanji/:id", function(req, res){
  Kanji.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err);
      res.redirect("/kanji");
    } else {
      res.redirect("/kanji")
    }
  });
});

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("Kanji App Started");
});
