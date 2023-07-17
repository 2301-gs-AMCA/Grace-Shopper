// Create some seed data and export it from this file
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const users = [
  { username: "Andrew", password: "andrew", isAdmin: false, isGuest: false },
  { username: "Matt R", password: "yesway", isAdmin: false, isGuest: false },
  { username: "BigJoe", password: "toemeat", isAdmin: false, isGuest: false },
  { username: "mother", password: "quesswho", isAdmin: false, isGuest: false },
  { username: "Rara", password: "boug", isAdmin: false, isGuest: false },
  { username: "Ced", password: "ric", isAdmin: true, isGuest: false },
];

const items = [
  {
    itemName: "bunny plush",
    isAvailable: true,
    itemCost: "15",
    itemDescription: "a soft bunny friend.",
    itemCategory: "Plush",
    inventory_qty: 50,
  },
  {
    itemName: "stich plush",
    isAvailable: true,
    itemCost: "20",
    itemDescription:
      "a plush of your favorite blue trouble maker.Disney please don't sue.",
    itemCategory: "Plush",
    inventory_qty: 50,
  },
  {
    itemName: "cat eared cat bed",
    isAvailable: true,
    itemCost: "50",
    itemDescription: "keeps your little guy cozy; in style.",
    itemCategory: "Pets",
    inventory_qty: 50,
  },
  {
    itemName: "thicksole slippers",
    isAvailable: true,
    itemCost: "20",
    itemDescription: "soft an dcomfortable.best to wear on a staycation.",
    itemCategory: "Shoes",
    inventory_qty: 50,
  },
  {
    itemName: "toe aid",
    isAvailable: true,
    itemCost: "10",
    itemDescription:
      "ever stubbed your toe and now you fell like its a bit off? this will help straighten and support your big toe",
    itemCategory: "Accessories",
    inventory_qty: 50,
  },
  {
    itemName: "green leaf blanket",
    isAvailable: true,
    itemCost: "35",
    itemDescription:
      "from Gloriosum, this will be a perfect blanket for a chill night watching netflix",
    itemCategory: "Bedding",
    inventory_qty: 50,
  },
  {
    itemName: "soft cat bed",
    isAvailable: true,
    itemCost: "50",
    itemDescription: "a soft bed for your soft ,sometimes hostile, buddy",
    itemCategory: "Pets",
    inventory_qty: 50,
  },
  {
    itemName: "tarot card blanket",
    isAvailable: true,
    itemCost: "35",
    itemDescription:
      "a blanket that can also tell your future. its a comfortable one",
    itemCategory: "Bedding",
    inventory_qty: 50,
  },
  {
    itemName: "cosmic psyonic toad in tub, No.5",
    isAvailable: true,
    itemCost: "40",
    itemDescription:
      "omniptent being under the stress of the bad vibes of the cosmos.help him out by getting yourself confy with this blanket or another of our great products!",
    itemCategory: "Accessories",
    inventory_qty: 50,
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
  {
    image: `https://i.ebayimg.com/images/g/Zw4AAOSwDjZg3MDK/s-l1200.webp`,
    itemId: 2,
  },
  {
    image: `https://www.picclickimg.com/GL4AAOSwfgtkZj47/DISNEY-PARKS-Lilo-Stitch-Snuggle-Snappers-Hugger.webp`,
    itemId: 2,
  },
];

//let reviews =[{itemId:1,userId:2,tite:"time",rating:2,review:"this sucks"}];
let temp = [];
let reviews = users.forEach((user, index) => {
  temp.push({
    itemId: index + 1,
    userId: index + 1,
    title: `${items[index].itemName}`,
    rating: 4,
    review: `I ${user.username},fully endorse ${items[index].itemName}`,
  });
});
reviews = temp;
console.log("reviews for products", reviews);
module.exports = { users, items, images, reviews };
