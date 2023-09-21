class Assignment {
  make(builder) {
    builder.step1();
    builder.step2();
    builder.step3();
    builder.step4();
    return builder.get();
  }
}

class AssignmentBuilder {
  constructor(subject, level, dueDate) {
    this.assignment = null;
    this.subject = subject;
    this.level = level;
    this.dueDate = dueDate;
  }
  step1() {
    this.assignment = new Task();
  }
  step2() {
    this.assignment.addSubject(this.subject);
  }
  step3() {
    this.assignment.addLevel(this.level);
  }
  step4() {
    this.assignment.addDuedate(this.dueDate);
  }
  get() {
    return this.assignment;
  }
}

class Task {
  constructor() {
    this.subject = null;
    this.level = null;
    this.dueDate = null;
  }
  addSubject(subject) {
    this.subject = subject;
  }
  addLevel(level) {
    this.level = level;
  }
  addDuedate(dueDate) {
    this.dueDate = dueDate;
  }
  announcement() {
    console.log(
      `Your ${this.subject} assignment's difficulty level is: ${this.level}. It is due on ${this.dueDate}.`
    );
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
try {
  var assignment = new Assignment(); // Assignment class is for define steps
  var assignmentBuilder = new AssignmentBuilder( // AssignmentBuilder class is for define each step
    'Math',
    'Hard',
    '12th June, 2020'
  );
  var mathAssignment = assignment.make(assignmentBuilder);
  mathAssignment.announcement(); // Your Math assignment's difficulty level is: Hard. It is due on 12th June, 2020.
} catch (e) {
  console.log(e);
}
