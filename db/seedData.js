// Create some seed data and export it from this file
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const users = [
  { username: "Andrew C", password: "noway", isAdmin: false, loggedIn: false },
  { username: "Matt R", password: "yesway", isAdmin: false, loggedIn: false },
  { username: "BigJoe", password: "toemeat", isAdmin: false, loggedIn: false },
  { username: "mother", password: "quesswho", isAdmin: false, loggedIn: false },
  { username: "Rara", password: "boug", isAdmin: false, loggedIn: false },
  { username: "Ced", password: "ric", isAdmin: true, loggedIn: false },
];



const items = [
  {
    name: "bunny plush",
    available: true,
    cost: "15",
    description: "a soft bunny friend.",
  },
  {
    name: "stich plush",
    available: true,
    cost: "20",
    description:
      "a plush of your favorite blue trouble maker.Disney please don't sue.",
  },
  {
    name: "cat eared cat bed",
    available: true,
    cost: "50",
    description: "keeps your little guy cozy; in style.",
  },
  {
    name: "thicksole slippers",
    available: true,
    cost: "20",
    description: "soft an dcomfortable.best to wear on a staycation.",
  },
  {
    name: "toe aid",
    available: true,
    cost: "10",
    description:
      "ever stubbed your toe and now you fell like its a bit off? this will help straighten and support your big toe",
  },
  {
    name: "green leaf blanket",
    available: true,
    cost: "35",
    description:
      "from Gloriosum, this will be a perfect blanket for a chill night watching netflix",
  },
  {
    name: "soft cat bed",
    available: true,
    cost: "50",
    description: "a soft bed for your soft ,sometimes hostile, buddy",
  },
  {
    name: "tarot card blanket",
    available: true,
    cost: "35",
    description:
      "a blanket that can also tell your future. its a comfortable one",
  },
  {
    name: "cosmic psyonic toad in tub, No.5",
    available: true,
    cost: "40",
    description:
      "omniptent being under the stress of the bad vibes of the cosmos.help him out by getting yourself confy with this blanket or another of our great products!",
  },
];

const images = [
  {
    image: `https://ae04.alicdn.com/kf/A45e9bd04092843b0a1ce753773ed93c3X.jpg_300x300Q70.jpg_.webp`,
    itemId: 1,
  },
  {
    image: `https://ae04.alicdn.com/kf/S40de9cb42b3149808e6c4a5ff8a26afdQ.jpg_300x300Q70.jpg_.webp`,
    itemId: 2,
  },
  {
    image: `https://ae04.alicdn.com/kf/H4d2503139a9d4095984b50bfb05d890e2.jpg_300x300Q70.jpg_.webp`,
    itemId: 3,
  },
  {
    image: `https://ae04.alicdn.com/kf/Hf150b511be7c4f91841e7439c9c5d3dbj.jpg_300x300Q70.jpg_.webp`,
    itemId: 4,
  },
  {
    image: `https://ae04.alicdn.com/kf/Hfedd9409aa4742d79fe6b4812259f17fA.jpg_300x300Q70.jpg_.webp`,
    itemId: 5,
  },
  {
    image: `https://ae01.alicdn.com/kf/S5fc77ad9383d4e33a52cf7a0a4732885t.jpg?width=650&height=1000&hash=1600`,
    itemId: 6,
  },
  {
    image: `https://ae03.alicdn.com/kf/Hfa6efea37e7d426ca6212bf95e609a38Z.jpeg`,
    itemId: 7,
  },
  {
    image: `https://ae01.alicdn.com/kf/S112a6db681694754b082a59f8fdf1e11Z.jpg?width=800&height=800&hash=2000`,
    itemId: 8,
  },
  {
    image: `https://ae01.alicdn.com/kf/S874e7edface74419b2e51d3b3cd8b67cZ.jpg?width=1600&height=1600&hash=3200`,
    itemId: 9,
  },
];


module.exports = { users, items, images };
