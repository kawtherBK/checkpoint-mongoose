const database=require('./Connectdb.js');
const Person = require('./Models/PersonModel');

//Create and Save a Record of a Model:

let p1 = new Person({
  name: "Karim",
  age: 25,
  favoriteFoods: ["pasta","seafood"]
});
p1.save(function (err, data) {
  console.log(data);
});
//Create Many Records with model.create()



let persons = [
    {
      name: "Houssem",
      age: 36,
      favoriteFoods: ["riz"]
    },
    {
      name: "kawther",
      age: 28,
      favoriteFoods: ["pasta", "poisson"]
    },
    {
      name: "loulou",
      age: 3,
      favoriteFoods: ["laitus","Jambon","Poulet"]
    },
    {
        name: "baci",
        age: 1,
        favoriteFoods: ["Jambon",]
      }
  ];
  Person.create(persons, function (err, data) {
    console.log(data);
  });
  //Use model.find() to Search Your Database

Person.find({ name:"kawther"}, function (err, data) {
    console.log(data);
  });
  function searchByFood(search) {
    Person.findOne({ favoriteFoods: { $regex: search } }, function (err, data) {
      console.log(data);
    });
  }
  searchByFood("pasta");
//Use model.findById() to Search Your Database By _id

function findByPersonId(personId) {
    Person.findById(personId, function (err, data) {
      console.log( data);
    });
  }
  findByPersonId("62d9ea830ee8a3db41b7bbdd");
  // Classic Updates by Running Find, Edit, then Save

function findPersonAndUpdate(personId) {
  Person.findById(personId, function (err, data) {
    data.favoriteFoods.push("fries");
    data.save().then((d) => {
      console.log(d);
    });
  });
}

findPersonAndUpdate("62d9ea830ee8a3db41b7bbdd");

//Perform New Updates on a Document Using model.findOneAndUpdate()

function findPersonAndUpdate(name) {
  Person.findOneAndUpdate(
    { name },
    { age: 23 },
    {
      new: true,
    }
  ).then((data) => {
    console.log(data);
  });
}
findPersonAndUpdate("kawther");
//Delete One Document Using model.findByIdAndRemove

function findPersonAndRemove(personId) {
    Person.findByIdAndRemove(personId).then((data) => {
      console.log(data);
    });
  }
  findPersonAndRemove("62d9ea830ee8a3db41b7bbde");
  //MongoDB and Mongoose Delete Many Documents with model.remove()

Person.remove({ name: "baci" }).then((data) => {
    console.log(data.deletedCount);
  });
  
//Chain Search Query Helpers to Narrow Search Results

function done(err, data) {
    console.log(data);
  }
  Person.find({ favoriteFoods: { $regex: "Jambon" } })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(done);
  
