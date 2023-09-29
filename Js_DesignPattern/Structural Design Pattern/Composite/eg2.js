/* implement a directory system using the composite pattern. */

class Directory {
  constructor(name, lastModified, size) {
    this.name = name;
    this.lastModified = lastModified;
    this.size = size;
  }
  getLastmodified() {}
  getSize() {}
  getName() {}
}

class File extends Directory {
  constructor(name, lastModified, size) {
    super(name, lastModified, size);
  }
  getLastmodified() {
    return this.lastModified;
  }
  getSize() {
    return this.size;
  }
  getName() {
    return this.name;
  }
}

class Folder extends Directory {
  constructor(name, lastModified, size) {
    super(name, lastModified, size);
    this.files = [];
  }
  addFile(file) {
    this.files.push(file);
  }
  removeFile(file) {
    for (var i = 0; i < this.files.length; i++) {
      if (this.files[i] == file) {
        this.files.splice(i, 1);
      }
    }
    return this.files;
  }
  getLastmodified() {
    let minLastModified = Infinity;

    this.files.forEach((item) => {
      if (item.lastModified < minLastModified) {
        minLastModified = item.lastModified;
      }
    });

    return minLastModified;
  }
  getSize() {
    return this.files.reduce((acc, cur) => acc.size + cur.size);
  }
  getName() {
    return this.files.map((item) => item.name);
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const file1 = new File('dogo.png', 2, 45);
const file2 = new File('catty.png', 4, 32);
const folder = new Folder('Pictures');
folder.addFile(file1);
folder.addFile(file2);
console.log(folder.getLastmodified()); // 2
console.log(folder.getSize()); // 77
console.log(folder.getName()); //  ['dogo.png', 'catty.png']
folder.removeFile(file2);
console.log(folder.getName()); // ['dogo.png']
console.log(folder.getSize()); // 45
const file = new File('penguiny.png', 6, 12);
console.log(file.getName()); // penguiny.png
