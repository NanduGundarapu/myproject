using { com.my.project as my } from '../db/schema';

service EmployeeService {

  @odata.draft.enabled
  entity Employees as projection on my.Employees;

  entity Skills as projection on my.Skills;
      
}

annotate EmployeeService.Employees with @(
   UI : {
      Identification: [{Value: name}],
      HeaderInfo: {
        TypeName: 'Employee',
        TypeNamePlural: 'Employees',
        Title: {Value: name }
      },
      SelectionFields : [name,organization,designation,project],
      LineItem: [
        {$Type: 'UI.DataField', Value: Id},
        {$Type: 'UI.DataField', Value: name},
        {$Type: 'UI.DataField', Value: experience},
        {$Type: 'UI.DataField', Value: organization},
        {$Type: 'UI.DataField', Value: designation},
        {$Type: 'UI.DataField', Value: project}
      ],
      HeaderFacets: [
			  {$Type: 'UI.ReferenceFacet', Label: 'Experience', Target: '@UI.FieldGroup#ExpDesignation'},
        {$Type: 'UI.ReferenceFacet', Label: 'Project', Target: '@UI.FieldGroup#Project'},
		  ],
      Facets: [
        {$Type: 'UI.ReferenceFacet', Label: 'Experience', Target: '@UI.FieldGroup#ExpDesignation'},
        {$Type: 'UI.ReferenceFacet', Label: 'Project', Target: '@UI.FieldGroup#Project'},
        {$Type: 'UI.ReferenceFacet', Label: 'All Details', Target: '@UI.FieldGroup#OtherDetails'},
      ],
      FieldGroup#ExpDesignation: {
        Data: [
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
          {Value: experience},
          {Value: organization},
          {Value: designation},
          {Value: age},
          {Value: project}
        ]
      }
   }
)
{
  //name @ValueList.entity:'Employees';
}


annotate EmployeeService.Employees with {
  Id @( Common: { Label: 'ID'} );
  name @( Common.Label: 'Employee Name' );
  experience @( Common.Label: 'Experience');
  organization @( Common.Label: 'Organization');
  designation @( Common.Label: 'Designation');
  age @( Common.Label: 'Age');
  project @( Common.Label: 'Project');
}