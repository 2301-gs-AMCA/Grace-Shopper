// Create some seed data and export it from this file
const users = [
  { username: "Andrew C", password: "noway",isAdmin:false,loggedIn:false },
  { username: "Matt R", password: "yesway",isAdmin:false,loggedIn:false  },
  { username: "BigJoe", password: "toemeat",isAdmin:false,loggedIn:false  },
  { username: "mother", password: "quesswho",isAdmin:false,loggedIn:false  },
  { username: "Rara", password: "boug",isAdmin:false,loggedIn:false },
  { username: "Ced", password: "ric" ,isAdmin:true,loggedIn:false},
  
];

const items = [
  { name: "smallpants", available: true, cost: "15", description: "ripless",categoryId:5120,tags:["tight-fit","pants"]},
  {
    name: "smallshirt",
    available: true,
    cost: "20",
    description: "makes u look buff",
    categoryId:2222,
    tags:["tight-fit","shirt","sleeveless"]
  },
  { name: "smallshoes", available: true, cost: "20", description: "fast",categoryId:1224,tags:["casual","small"]},
];




module.exports = { users, items };
