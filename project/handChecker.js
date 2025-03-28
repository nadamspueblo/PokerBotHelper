let allHands = [];

function checkHand(game) {
  const hand = game.self.cards;
  const community = game.community;
  // Check hands that are less than 5 cards
  if (community.length == 0){
    let highCard = hand[getHighCardIndex(hand)];
    let card = hasPair(hand);
    if (card) {
      return {hand: "pair", highCard};
    }
    return { hand: "high", highCard };
  }

  fillAllHands(hand.concat(community));

  // Check all hands starting with highest ranked hand
  // royal flush
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    if (hasFlush(cards) && hasStraight(cards) && getValue(highCard) == 14) {
      return {hand: "royal flush", highCard, set: cards};
    }
  }

  // straight flush
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    if (hasFlush(cards) && hasStraight(cards)) {
      return {hand: "straight flush", highCard, set: cards};
    }
  }

  // four of a kind
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    let set = hasFourKind(cards);
    if (set) {
      return {hand: "four kind", highCard, set};
    }
  }

  // full house
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    let sets = hasFullHouse(cards);
    if (sets) {
      return {hand: "full house", highCard, set1: sets[0], set2: sets[1]};
    }
  }

  // flush
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    if (hasFlush(cards)) {
      return {hand: "flush", highCard, set: cards};
    }
  }

  // straight
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    if (hasStraight(cards)) {
      return {hand: "straight", highCard, set: cards};
    }
  }

  // three of a kind
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    let set = hasThreeKind(cards);
    if (set) {
      return {hand: "three kind", highCard, set };
    }
  }

  // two pair
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    let pairs = hasTwoPair(cards);
    if (pairs) {
      return {hand: "two pair", highCard, set1: pairs[0], set2: pairs[1]};
    }
  }

  // pair
  for (let i = 0; i < allHands.length; i++) {
    let cards = allHands[i];
    let highCard = cards[getHighCardIndex(cards)];
    let pair = hasPair(cards);
    if (pair) {
      return {hand: "pair", highCard, set: pair};
    }
  }

  // high card
  let cards = hand.concat(community);
  let highCard = cards[getHighCardIndex(cards)];
  return { hand: "high", highCard };
}

function fillAllHands(cards) {
  allHands = [];
  let data = new Array(5);
  data.fill(0);
  combinationUtil(cards, cards.length, 5, 0, data, 0);
}

function combinationUtil(arr, n, r, index, data, i) {

    // Current combination is ready
    if (index == r)
    {
      let hand = [];

      for (let j = 0; j < r; j++)
          hand.push(data[j]);

      allHands.push(hand);
      return;
    }

    // When no more elements are there
    // to put in data[]
    if (i >= n)
        return;

    // current is included, put next
    // at next location
    data[index] = arr[i];
    combinationUtil(arr, n, r, index + 1,
                            data, i + 1);

    // current is excluded, replace
    // it with next (Note that i+1
    // is passed, but index is not
    // changed)
    combinationUtil(arr, n, r, index,
                            data, i + 1);
}

function hasFlush(cards) {
  let suit = getSuit(cards[0]);
  let isFlush = true;
  for (let i = 1; i < cards.length; i++) {
    isFlush = isFlush && getSuit(cards[i]) == suit;
  }
  return isFlush;
}

function hasStraight(cards) {
  sortedValues = [];
  for (let i = 0; i < cards.length; i++){
    sortedValues.push(getValue(cards[i]));
  }
  sortedValues.sort(function(a, b) {
    if (a < b) return -1;
    else if (a > b) return 1;
    else return 0;
  });

  let isStraight = true;
  for (let i = 0; i < sortedValues.length - 1; i++){
    isStraight = isStraight && sortedValues[i + 1] - sortedValues[i] == 1;
  }
  return isStraight;
}

function hasFourKind(cards) {
  for (let i = 0; i < cards.length; i++){
    const set = [];
    for (let j = 0; j < cards.length; j++){
      if (j != i){
        set.push(cards[j]);
      }
    }
    if (allSameVal(set)) return set;
  }
  return false;
}

function hasThreeKind(cards) {
  for (let i = 0; i < cards.length; i++){
    for (let k = 0; k < cards.length; k++){
      const set = [];
      for (let j = 0; j < cards.length; j++){
        if (j != i && j != k){
          set.push(cards[j]);
        }
      }
      if (allSameVal(set)) return set;
    }
  }
  return false;
}

function hasFullHouse(cards) {
  for (let i = 0; i < cards.length; i++){
    for (let k = 0; k < cards.length; k++){
      const set = [];
      let complement = [];
      if (i != k) complement = [cards[i], cards[k]];
      for (let j = 0; j < cards.length; j++){
        if (j != i && j != k){
          set.push(cards[j]);
        }
      }
      if (allSameVal(set) && allSameVal(complement)) return [set, complement];
    }
  }
  return false;
}

function hasTwoPair(cards) {
  for (let i = 0; i < cards.length; i++){
    for (let k = 0; k < cards.length; k++){
      const set = [];
      let complement = [];
      if (i != k) complement = [cards[i], cards[k]];
      for (let j = 0; j < cards.length; j++){
        if (j != i && j != k){
          set.push(cards[j]);
        }
      }
      let pair = hasPair(set);
      if (pair && allSameVal(complement)) return [pair, complement];
    }
  }
  return false;
}

function allSameVal(cards) {
  if (cards.length < 1) return false;
  if (cards.length == 0) return true;
  let val = getValue(cards[0]);
  let same = true;

  for (let i = 1; i < cards.length; i++){
    same = same && getValue(cards[i]) == val;
  }

  return same;
}

function hasPair(cards) {
  for (let i = 0; i < cards.length; i++) {
    for (let j = 1; j < cards.length; j++) {
      if (i != j && getValue(cards[i]) == getValue(cards[j])){
        return [cards[i], cards[j]];
      } 
    }
  }
  return false;
}

function getHighCardIndex(cards) {
  let max = getValue(cards[0]);
  let index = 0;
  for (let i = 0; i < cards.length; i++){
    if (getValue(cards[i]) > max) {
      max = getValue(cards[i]);
      index = i;
    }
  }
  return index;
}

function getValue(card) {
  let val = card.charAt(0);
  if (val == "T") return 10;
  else if (val == "J") return 11;
  else if (val == "Q") return 12;
  else if (val == "K") return 13;
  else if (val == "A") return 14;
  else return Number(val);
}

function getSuit(card) {
  return card.charAt(1);
}


exports.checkHand = checkHand;