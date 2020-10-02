using { managed } from '@sap/cds/common';
namespace com.my.project;

entity Employees : employeeDetails{
  key Id : Integer;
  NavToSkills : Composition of many Emp2Skill on NavToSkills.employees = $self;
}

entity Skills{
  key Id : Integer;
  title : String;
  NavToEmployees : Composition of many Emp2Skill on NavToEmployees.skills = $self;
}

@cds.autoexpose
entity Emp2Skill : employeeDetails{
  key employees : Association to Employees;
  key skills : Association to Skills;
  skill : String;
}

aspect employeeDetails{
  name : String;
  experience : Integer;
  organization : String;
  age : Integer;
  designation : String;
  project : String;
}