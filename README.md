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


## Disclaimer
This software is guaranteed to have bugs that will possibly crash your code. Use at your own risk.
