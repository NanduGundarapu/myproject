using {
    managed,
    cuid
} from '@sap/cds/common';


namespace com.my.project;

entity Employees : employeeDetails {
    key Id          : Integer;
        NavToSkills : Composition of many Emp2Skill
                          on NavToSkills.employees = $self;
}

entity Skills {
    key Id             : Integer @(Common : {Label : 'ID'});
        title          : String  @(Common.Label : 'Skill')  @readonly;
        @cascade : {all}
        image          : Composition of one SkillImages;
        NavToEmployees : Composition of many Emp2Skill
                             on NavToEmployees.skills = $self;
}

entity Emp2Skill : cuid {
    employees : Association to Employees;
    skills    : Association to Skills;
    imageUrl       : String  @(UI : {
        IsImageURL,
        HiddenFilter
    });
}

aspect employeeDetails {
    name         : String;
    experience   : Integer;
    organization : String;
    age          : Integer;
    designation  : String @readonly;
    project      : String;
}

entity SkillImages {
    key skill     : Association to Skills;
        image     : LargeBinary @Core.MediaType : imageType;
        imageType : String      @Core.IsMediaType;
}
