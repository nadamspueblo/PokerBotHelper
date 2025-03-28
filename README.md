# PokerBotHelper

## Description
PokerBotHelper is a package designed for students in Nathaniel Adams' CS classes to help develop poker bots for the end-of-year Poker Bot Tournament run using JS Poker. PokerBotHelper has functions to help process the cards held by the bot to determine if the there is a potential pair, three of a kinds, straight, flush, etc. Clone the [JS Poker Starter](https://github.com/nadamspueblo/JS-Poker-Starter) repository to get started. Then follow the installation directions below to install PokerBotHelper.

## Installation
From the Shell command line run:
```npm install pokerbot-helper```
    
Add the following to your ```challengerBot.js```
```javascript
const helper = require("pokerbot-helper");
```
    
## Reference
PokerBotHelper has two functions: ```helper.checkHand(game)``` and ```helper.getPot(game)```. ```helper.getPot(game)``` will return how much money is in the pot. ```helper.checkHand(game)``` will return an object with some simple analysis of the cards held by the bot.

### checkHand(game)

Returns an object representing a simple analysis of the bots hand including the river with the keys below.

- ```hand:``` A string describing the best hand held by the bot. Values can be ```"high"```, ```"pair"```, ```"two pair"```, ```"three kind"```, ```"straight"```, ```"flush"```, ```"full house"```, ```"four kind"```, ```"straight flush"```, or ```"royal flush"```
- ```high:``` The highest card in the hand. e.g. ```"Ks"```
- ```set:``` *Depends on the hand* For one pair, three of a kind, straight, flush, four of a kind, straight flush, and royal flush, this key will have an array containing the cards that form the hand. 
  - e.g. if ```hand:``` is ```"pair"```, ```set:``` could be ```["2h", "2s"]``` 
- ```set1:``` and ```set2:``` *Depends of the hand* For two pair or full house, ```set1:``` will contain an array of the first set of cards that form the hand and ```set2:``` will be an array of the second set of cards
  - e.g. if ```hand:``` is ```"two pair"```, ```set1:"``` could be ```["2s", "2h"]``` and ```set2:``` could be ```["5s", "5h"]``` 


### getPot(game)

Returns a number representing the pot (total of all bets so far)

## Example usage in a bot
As long as the game is still going this bot checks the hand. If it is a royal or straight flush, it goes all in. If it only has a high card, it folds. Otherwise, it calls. _Note: This bot doesn't take into account which stage the game is in and would actually fold every time it wasn't dealt a pair in the pre-flop._
```javascript
module.exports = function () {
  // Import the PokerBot Helper package
  const helper = require("pokerbot-helper");
  
  var info = {
    name: "ChallengerBot",
    email: "",
    btcWallet: ""
  };

   function update(game) {
    if (game.state !== "complete") {
      // Pass the game object to PokerBot helper and use the results to make betting decisions
      let result = helper.checkHand(game);

      if (result.hand == "royal flush" || result.hand == "straight flush") {
        // If it's a great hand, go all in
        return game.self.chips;
      }
      if (result.hand == "high") {
        // If it's a bad hand, fold
        return -1;
      }
      // Otherwise, call
      return game.betting.call;
    }
  }

  return { update: update, info: info }

}
```

## Disclaimer
I slapped this software together very quickly and it is guaranteed to have bugs that will possibly crash your code. Use at your own risk!
