/*
Below is before refactor:

  class Applications {
    constructor(name, type) {
      this.name = name;
      this.type = type;
    }
    display() {}
    displayMode() {}
  }
  class FacebookLightMode extends Applications {
    constructor(name, type) {
      super(name, type);
    }
    display() {
      console.log(`Welcome to Facebook for ${this.type}.`);
    }
    displayMode() {
      console.log('You are using facebook in light mode.');
    }
  }
  class FacebookDarkMode extends Applications {
    constructor(name, type) {
      super(name, type);
    }
    display() {
      console.log(`Welcome to Facebook for ${this.type}.`);
    }
    displayMode() {
      console.log('You are using facebook in dark mode.');
    }
  }
  class WhatsAppLightMode extends Applications {
    constructor(name, type) {
      super(name, type);
    }
    display() {
      console.log(`Welcome to Whatsapp for ${this.type}.`);
    }
    displayMode() {
      console.log('You are using whatsapp in light mode.');
    }
  }
  class WhatsAppDarkMode extends Applications {
    constructor(name, type) {
      super(name, type);
    }
    display() {
      console.log(`Welcome to Whatsapp for ${this.type}.`);
    }
    displayMode() {
      console.log('You are using whatsapp in dark mode.');
    }
  }
*/

/**
 * So, why should we apply the bridge pattern? 
    In the code above, we had to make a different class for each mode, dark and light. 
    Now imagine doing this for 1000 other applications. It would be better to have a separate interface for the modes of application
 */

// this is looks after Bridge pattern

class Mode {
  constructor(app) {
    this.app = app;
    this.lightMode = function () {
      this.app.setLightMode();
    };
    this.darkMode = function () {
      this.app.setDarkMode();
    };
  }
}

class Applications {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
  display() {}
  displayMode() {}
}
class Facebook extends Applications {
  constructor(name, type) {
    super(name, type);
    this.mode = 'light';
    this.setLightMode = function () {
      this.mode = 'light';
    };
    this.setDarkMode = function () {
      this.mode = 'dark';
    };
  }
  display() {
    console.log(`Welcome to Facebook for ${this.type}.`);
  }
  displayMode() {
    console.log(`You are using facebook in ${this.mode} mode.`);
  }
}
class WhatsApp extends Applications {
  constructor(name, type) {
    super(name, type);
    this.setLightMode = function () {
      this.mode = 'light';
    };
    this.setDarkMode = function () {
      this.mode = 'dark';
    };
  }
  display() {
    console.log(`Welcome to Whatsapp for ${this.type}.`);
  }
  displayMode() {
    console.log(`You are using whatsapp in ${this.mode} mode.`);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const fb = new Facebook('Facebook', 'Social Networking');
const mode = new Mode(fb);
mode.darkMode();
fb.displayMode();

const whatsapp = new WhatsApp('Whatsapp', 'Chatting');
const mode2 = new Mode(whatsapp);
mode2.lightMode();
whatsapp.displayMode();
