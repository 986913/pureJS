//Component
class Employee {
  constructor(name, position, progress) {
    this.name = name;
    this.position = position;
    this.progress = progress;
  }
  getProgress() {} // abstract method
}

//Leaf subclass: they have no children.
class Developers extends Employee {
  constructor(name, position, progress) {
    super(name, position, progress);
  }
  getProgress() {
    return this.progress;
  }
}

//Leaf subclass: they have no children.
class FreeLanceDev extends Employee {
  constructor(name, position, progress) {
    super(name, position, progress);
  }
  getProgress() {
    return this.progress(); // ???
  }
}

//Composite subclass:  has other developers as its children.
class DevTeamLead extends Employee {
  constructor(name, position) {
    super(name, position);
    this.teamMembers = [];
  }
  addMember(employee) {
    this.teamMembers.push(employee);
  }
  removeMember(employee) {
    for (var i = 0; i < this.teamMembers.length; i++) {
      if (this.teamMembers[i] == employee) {
        this.teamMembers.splice(i, 1);
      }
    }
    return this.teamMembers;
  }
  getProgress() {
    for (var i = 0; i < this.teamMembers.length; i++) {
      console.log(this.teamMembers[i].getProgress());
    }
  }
  showTeam() {
    for (var i = 0; i < this.teamMembers.length; i++) {
      console.log(this.teamMembers[i].name);
    }
  }
}

/** --------------------------- 用例测试 ------------------------------- **/
const seniorDev = new Developers('Rachel', 'Senior Developer', '60%');
const juniorDev = new Developers('Joey', 'Junior Developer', '50%');
const teamLead = new DevTeamLead('Regina', 'Dev Team Lead', '90%');
teamLead.addMember(seniorDev);
teamLead.addMember(juniorDev);
console.log('Team members list:');
teamLead.showTeam(); // Team members list: Rachel Joey
console.log('Get Team members progress:');
teamLead.getProgress(); // Get Team members progress: 60% 50%
console.log('Removing Rachel from team:');
teamLead.removeMember(seniorDev);
console.log('Updated team members list:');
teamLead.showTeam(); // Updated team members list: Joey

/*
	Note that the freelanceDev is not a part of the team. However, 
	his progress can be accessed the same way we access the progress for a composite subclass.
	
	Hence, with this pattern, single objects and composite objects can be treated uniformly. 
	Here, we call getProgress on a single object the same way we call it on a composite object.
*/
const freelanceDev = new Developers('Ross', 'Free Lancer', '80%');
console.log("Get freelance developer's progress:");
console.log(freelanceDev.getProgress()); //  Get freelance developer's progress: 80%s
