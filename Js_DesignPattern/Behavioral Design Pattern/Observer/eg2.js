class Auctioneer {
  constructor() {
    this.bidderList = [];
  }
  registerBidder(bidder) {
    this.bidderList.push(bidder);
  }
  announceNewBidderPrice() {
    this.notifyBidders();
  }
  notifyBidders() {
    // key point: each observer has thier own "update" implemention
    this.bidderList.forEach((bidder) => bidder.update());
  }
}

class Bidder {
  constructor(name) {
    this.name = name;
    this.bidPrice = null;
  }
  giveNewPrice(price) {
    this.bidPrice = price;
  }
  update() {
    // key point:
    console.log(`${this.name} is offering ${this.bidPrice} dollars`);
    if (this.bidPrice > 500) console.log(`Sold to ${this.name}`);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const auctioneer = new Auctioneer();
const bidder1 = new Bidder('Ross');
const bidder2 = new Bidder('Joey');

auctioneer.registerBidder(bidder1);
auctioneer.registerBidder(bidder2);

bidder1.giveNewPrice(400);
bidder2.giveNewPrice(550);

auctioneer.announceNewBidderPrice(); // "Ross is offering 400 dollars", "Joey is offering 550 dollars", "Sold to Joey"
