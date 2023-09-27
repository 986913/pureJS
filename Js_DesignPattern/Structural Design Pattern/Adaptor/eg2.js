// old interface
class TruthAndDare {
  constructor() {
    this.turn = Math.floor(Math.random() * 2) + 1;
  }
  Getturn() {
    if (this.turn == 1) this.turn = 2;
    else this.turn = 1;
    return this.turn;
  }
  playGame(playerOnename, playerTwoname) {
    if (this.Getturn() == 1) return `${playerOnename}'s turn`;
    else return `${playerTwoname}'s turn`;
  }
}

// new interface
class NewTruthAndDare {
  constructor(randomValue) {
    this.turn = randomValue;
  }
  newplayGame(playerOnename, playerTwoname) {
    if (this.turn % 2 == 0) return `${playerOnename}'s turn`;
    else return `${playerTwoname}'s turn`;
  }
}

// Adapter Class
class Adapter {
  constructor(randomValue) {
    const newGame = new NewTruthAndDare(randomValue);
    this.playGame = function (playerOnename, playerTwoname) {
      return newGame.newplayGame(playerOnename, playerTwoname);
    };
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const obj = new Adapter(6);
obj.playGame('Ross', 'Channdler'); // "sRoss's turn"  (`obj.playGame` will execute `newplayGame`s)
