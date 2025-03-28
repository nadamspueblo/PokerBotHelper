const checkHand = require("./handChecker.js").checkHand;
const getPot = require("./helper.js").getPot;

let game = { self: {cards: ["Kh", "Jh"]}, community: ["Ah", "Th", "Qh"] };
let result = checkHand(game)
console.log(result);

module.exports = {checkHand, getPot};