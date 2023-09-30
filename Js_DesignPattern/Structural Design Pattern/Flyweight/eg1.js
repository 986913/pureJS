/* 
  WithOUT flyweight pattern:
    imagine 1,000 users using this platform to format their .py files. 
    They will have different files, so there will be 1000 different CodeFile objects. 
    However, there will also be 1,000 instances of the PythonFormatter, which is comparatively heavier since it involves the environment setup. 
    It will be a more time-consuming task as well. Wouldn’t it be better to have control over the creation of the PythonFormatter instances? 
    This is where the flyweight pattern comes in.
 */
/*
  class CodeFile {
    constructor(codefileName) {
      this.codefileName = codefileName;
    }
  }

  class Formatter {
    format(codefile) {}
  }

  class PythonFormatter extends Formatter {
    constructor() {
      super();
      console.log('Python Formatter instance created');
    }
    format(codefileName) {
      console.log(`"Formatting the Python ${codefileName} file you uploaded.`);
    }
  }
*/

/******************************** WITH flyweight pattern **********************************/
class CodeFile {
  constructor(codefileName) {
    this.codefileName = codefileName;
  }
}

class Formatter {
  format(codefile) {}
}

class PythonFormatter extends Formatter {
  constructor() {
    super();
    console.log('Python Formatter instance created');
  }

  format(codefileName) {
    console.log(`"Formatting the Python ${codefileName} file you uploaded.`);
  }
}

class JavaFormatter extends Formatter {
  constructor() {
    super();
    console.log('Java Formatter instance created');
  }

  format(codefileName) {
    console.log(`"Formatting the Java ${codefileName} file you uploaded.`);
  }
}

class FormatterFactory {
  constructor() {
    this.myFormatterMap = new Map();
  }

  createFormatter(formatterType) {
    let formatter = this.myFormatterMap.get(formatterType);
    // if formatter not exist, then create it:
    if (formatter == null) {
      if (formatterType == 'Python') formatter = new PythonFormatter();
      else if (formatterType == 'Java') formatter = new JavaFormatter();
      this.myFormatterMap.set(formatterType, formatter);
    }
    // if formatter exist, then return it directly:
    return formatter;
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const codefile1 = new CodeFile('helloworld.py');
let formatter = new FormatterFactory();
const pythonFormatter = formatter.createFormatter('Python'); // Python Formatter instance created
pythonFormatter.format(codefile1.codefileName); // Formatting the Python helloworld.py file you uploaded.

//uploading new codefile Python file
const codefile2 = new CodeFile('test.py');
const anotherPythonFormatter = formatter.createFormatter('Python');
anotherPythonFormatter.format(codefile2.codefileName); // Formatting the Python test.py file you uploaded.
console.log(
  'Both Python Formatter instances are the same? ' +
    (anotherPythonFormatter === pythonFormatter)
); // Both Python Formatter instances are the same? true

//uploading a Java file
const codefile3 = new CodeFile('myfile.java');
const javaFormatter = formatter.createFormatter('Java'); // Java Formatter instance created
javaFormatter.format(codefile3.codefileName); // Formatting the Java myfile.java file you uploaded.
