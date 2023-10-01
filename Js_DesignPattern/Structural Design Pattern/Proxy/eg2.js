class LibraryKiosk {
  open(app) {
    console.log(`Opening ${app}`);
  }
  connectTo(website) {
    console.log('Connecting to ' + website);
  }
}

/**
  Your task is to implement the proxy pattern so that it restricts access to a few apps/websites for students. 
  You need to implement the functions such that the student cannot open the following apps:
      camera, photos, music, and settings
  Similarly, the student should not be able to connect to the following websites:
      fb.com, instagram.com, snapchat.com, google.com, and gmail.com
  Apart from the apps mentioned above and websites, the student can access the rest.
 **/
class ProxyLibraryKiosk {
  constructor() {
    this.kiosk = new LibraryKiosk();
    this.disableApps = ['camera', 'photos', 'music', 'settings'];
    this.disableWebsites = [
      'fb.com',
      'instagram.com',
      'snapchat.com',
      'google.com',
      'gmail.com',
    ];
  }
  open(app) {
    if (this.disableApps.includes(app))
      console.log(`You can't access the ${app}`);
    else this.kiosk.open(app);
  }
  connectTo(website) {
    if (this.disableWebsites.includes(website))
      console.log(`Access to ${website} denied`);
    else this.kiosk.connectTo(website);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
var libraryKiosk = new ProxyLibraryKiosk();
libraryKiosk.open('photos'); // "You can't access the photos"
libraryKiosk.open('music'); // "You can't access the music"
libraryKiosk.open('Chrome'); // "Opening Chrome"
libraryKiosk.connectTo('booksportal.com'); // "Connecting to booksportal.com"
libraryKiosk.connectTo('google.com'); // "Access to google.com denied"
libraryKiosk.connectTo('fb.com'); // "Access to fb.com denied"
