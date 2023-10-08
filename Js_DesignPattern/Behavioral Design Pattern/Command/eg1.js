//abstract Command class:
class Command {
  execute() {}
}

//TurnOnPrinter command
class TurnOnPrinter extends Command {
  constructor(printingMachine) {
    super();
    this.printingMachine = printingMachine;
    this.commandName = 'turn on';
  }
  execute() {
    this.printingMachine.turnOn();
  }
}
//TurnOffPrinter command
class TurnOffPrinter extends Command {
  constructor(printingMachine) {
    super();
    this.printingMachine = printingMachine;
    this.commandName = 'turn off';
  }
  execute() {
    this.printingMachine.turnOff();
  }
}
//Print command
class Print extends Command {
  constructor(printingMachine) {
    super();
    this.printingMachine = printingMachine;
    this.commandName = 'print';
  }
  execute() {
    this.printingMachine.print();
  }
}

//Invoker
class PrinterControlPanel {
  // this is the key: pressButton accept command then execute it
  pressButton(command) {
    console.log(`Pressing ${command.commandName} button`);
    command.execute();
  }
}

//Reciever:
class PrintingMachine {
  turnOn() {
    console.log('Printing machine has been turned on');
  }
  turnOff() {
    console.log('Printing machine has been turned off');
  }
  print() {
    console.log('The printer is printing your document');
  }
}

/** --------------------------- 用例测试 ------------------------------- **/

const printingMachine = new PrintingMachine();
const turnOnCommand = new TurnOnPrinter(printingMachine);
const turnOffCommand = new TurnOffPrinter(printingMachine);
const printCommand = new Print(printingMachine);
const controlPanel = new PrinterControlPanel();
controlPanel.pressButton(turnOnCommand); //Pressing turn on button, Printing machine has been turned on
controlPanel.pressButton(turnOffCommand); //Pressing turn off button, Printing machine has been turned off
controlPanel.pressButton(printCommand); //Pressing print button, The printer is printing your document
