const fs = require('fs-extra');
const express = require("express");
const formidable = require('formidable');
const repo = require("./lib/model").model;
const app = express();
//const raz = require('raz');
app.set('view engine', "raz");
//console.log(repo.pets);
app.use(express.static(__dirname));
/////////////////////////////////////////////////////////////

app.get("/petlist", (req, res) => {
  res.json(repo.pets);
});


app.post('/add', (req, res)=>{
  var form = new formidable.IncomingForm();
  var pet = {};
  pet.id = repo.pets.length+1;
  form.parse(req, (err, flds, files) => {
     
      pet.petName = flds.name;
      pet.type = flds.type;
      pet.price =Number(flds.price);
      pet.description = flds.description;
      //console.log(files.picture.path);
      pet.picture = '/uploads/' + files.picture.name;
      repo.insert(pet);
      console.log(repo.pets);
      var src = files.picture.path;
      var dest = __dirname + "\\uploads\\" + files.picture.name;
      fs.copy(src, dest, function (err) {
        if (err) {
            console.error(err);
        } else {
            console.log("success!")
        }
    });
      
      res.redirect("/pets.html");
  });
});
app.get('/edit/:id', (req, res)=>{
  var pet =repo.get(req.params.id);
  console.log(pet);
  res.render('edit', {id:pet.id, 
    petName:pet.petName, type:pet.type, price: pet.price, 
    description: pet.description, picture: pet.picture});
});
app.post('/edit/:id', (req, res)=>{
  var id = req.params.id;
  var form = new formidable.IncomingForm();
  form.parse(req, (err, flds)=>{
    repo.update(id, {petName:flds.name, price:flds.price, description:flds.description, type:flds.type});
  });
  res.redirect("/pets.html");
  
});
//////////////////////////////////////////////////////////////////////////////
const server = app.listen(9999);

console.log("Server running at port 9999.");
console.log("Press any key to continue.");
process.stdin.once("data", function() {
  console.log("Stopping server..");
  server.close(() => {
    console.log("Server stopped..");
    process.exit();
  });
});
