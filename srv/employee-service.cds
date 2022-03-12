using { com.my.project as my } from '../db/schema';
using { FLIGHT  } from '../db/SFLIGHT';
//using { USERDATA_USER_LOCAL } from '../db/User';

service EmployeeService {

  @odata.draft.enabled
  @requires : 'authenticated-user'
  entity Employees as projection on my.Employees;

  entity Skills as projection on my.Skills;

  entity Emp2Skill as projection on my.Emp2Skill;

  entity SkillImages as projection on my.SkillImages {
    * , skill : redirected to Skills
  };

  function loadSkillImages() returns Boolean;

}

service FlightService{

    entity SFlight as projection on FLIGHT.SflightView;

    entity SFlightExt as projection on FLIGHT.SFlightExt;
    
}

// service UserService {

//     entity User as projection on USERDATA_USER_LOCAL;

// }

annotate EmployeeService.Employees with @(
   UI : {
      Identification: [{Value: name}],
      HeaderInfo: {
        TypeName: 'Employee',
        TypeNamePlural: 'Employees',
        Title: {Value: name }
      },
      SelectionFields : [Id,organization,designation,project],
      LineItem: [
        {$Type: 'UI.DataField', Value: Id},
        {$Type: 'UI.DataField', Value: name},
        {$Type: 'UI.DataField', Value: experience},
        {$Type: 'UI.DataField', Value: organization},
        {$Type: 'UI.DataField', Value: designation},
        {$Type: 'UI.DataField', Value: project}
      ],
      HeaderFacets: [
		// {$Type: 'UI.ReferenceFacet', Label: 'Experience', Target: '@UI.FieldGroup#ExpDesignation'},
        // {$Type: 'UI.ReferenceFacet', Label: 'Project', Target: '@UI.FieldGroup#Project'},
	  ],
      Facets: [
        {$Type: 'UI.ReferenceFacet', Label: 'Experience', Target: '@UI.FieldGroup#ExpDesignation'},
        {$Type: 'UI.ReferenceFacet', Label: 'Project', Target: '@UI.FieldGroup#Project'},
        {$Type: 'UI.ReferenceFacet', Label: 'All Details', Target: '@UI.FieldGroup#OtherDetails'},
        {$Type: 'UI.ReferenceFacet', Label: 'Skills', Target: 'NavToSkills/@UI.LineItem'}
      ],
      FieldGroup#ExpDesignation: {
        Data: [
          {Value: Id},
          {Value: name},
          {Value: experience},
          {Value: designation}
        ] 
      },
      FieldGroup#Project: {
        Data: [
          {Value: organization},
          {Value: project}
        ] 
      },
      FieldGroup#OtherDetails: {
        Data: [
          {Value: age}
        ]
      }
   }
)
{
  Id @ValueList.entity:'Employees';
  organization @ValueList.entity : 'OrganizationVH';
}


annotate EmployeeService.Emp2Skill with @(
    UI : {
        LineItem: [
        {$Type: 'UI.DataField', Value: skills_Id , Label : 'Skill ID'},
        {$Type: 'UI.DataField', Value: skills.title, Label : 'Skill'},
        {$Type: 'UI.DataField', Value: imageUrl, Label : 'Image'}
      ]
    }
){}

annotate EmployeeService.Employees with {
  Id @( Common: { Label: 'Employee Id'} );
  name @( Common.Label: 'Employee Name' );
  experience @( Common.Label: 'Experience');
  organization @( Common.Label: 'Organization');
  designation @( Common.Label: 'Designation');
  age @( Common.Label: 'Age');
  project @( Common.Label: 'Project');
}