/*
  Without using command pattern:

    class BankAccount {
      constructor(amount) {
        this.amount = amount;
      }
      checkAmount() {
        console.log(this.amount);
      }
      withdrawMoney(withdrawamount) {
        if (withdrawamount > this.amount) {
          console.log('Not enough money');
        } else {
          this.amount -= withdrawamount;
        }
      }
      depositAmount(money) {
        this.amount += money;
      }
    }

    var account = new BankAccount(100);
    account.checkAmount(); // 100
    account.withdrawMoney(10);
    account.checkAmount(); // 90
    account.depositAmount(50);
    account.checkAmount(); // 140
 */

/* Using command Pattern:
    1. commands: WithDraw, DepositAmount, and CheckAmount
    2. receiver: BankAccount
    3. invoker: an AccountManager carrying out the operations requested using a request function
 */

//abstract Command class:
class Command {
  execute() {}
}
//CheckAmount Command
class CheckAmount extends Command {
  constructor(account) {
    super();
    this.account = account;
    this.commandName = 'check';
  }
  execute() {
    this.account.checkAmount();
  }
}
//withdrawMoney Command
class WithDrawAmount extends Command {
  constructor(account) {
    super();
    this.account = account;
    this.commandName = 'withdraw';
  }
  execute(amount) {
    this.account.withdrawMoney(amount);
  }
}
//DepositAmount Command
class DepositAmount extends Command {
  constructor(account) {
    super();
    this.account = account;
    this.commandName = 'deposit';
  }
  execute(amount) {
    this.account.depositAmount(amount);
  }
}

//Invoker:
class AccountManager {
  request(account, amount) {
    account.execute(amount);
  }
}

//Reciever:
class BankAccount {
  constructor(amount) {
    this.amount = amount;
  }
  checkAmount() {
    console.log(this.amount);
  }
  withdrawMoney(withdrawamount) {
    if (withdrawamount > this.amount) console.log('Not enough money');
    else this.amount -= withdrawamount;
  }
  depositAmount(money) {
    this.amount += money;
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const manager = new AccountManager();
const account = new BankAccount(100);
const check = new CheckAmount(account);
manager.request(check); // 100
const withdraw = new WithDrawAmount(account);
const deposit = new DepositAmount(account);
manager.request(withdraw, 10);
manager.request(check); //90
manager.request(deposit, 50);
manager.request(check); // 140
