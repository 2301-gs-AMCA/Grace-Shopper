// Create some seed data and export it from this file
const users = [
  { username: "Andrew C", password: "noway" },
  { username: "Matt R", password: "yesway" },
  { username: "BigJoe", password: "toemeat" },
  { username: "mother", password: "quesswho" },
  { username: "Rara", password: "boug" },
  { username: "Ced", password: "ric" },
];

const items = [
  { pants: "small", available: true, cost: "$15", description: "ripless" },
  {
    shirts: "small",
    available: true,
    cost: "$20",
    description: "makes u look buff",
  },
  { shoes: "small", available: true, cost: "$20", description: "fast" },
];

module.exports = { users, items };
