module.exports = (srv) => {

    const {Skills,Employees} = cds.entities;
    srv.after('READ','Employees',async (employees,req) => {
        const db = cds.transaction(req);
        const skills = await db.read(Skills);
        employees.map(each => {
            mapDesignation(each);
            mapDetails(each,skills)
        })
    })

    srv.after('READ','Skills',async (skills,req) => {
        const db = cds.transaction(req);
        const employees = await db.read(Employees);
        skills.map(each => mapDetails(each,employees))
    })

    function mapDetails(item,list){

        if(item.NavToSkills)
            item.NavToSkills.forEach(item => item.skill = list.find(value => (value.Id == item.skills_Id)).title);
        
        else if(item.NavToEmployees){
            item.NavToEmployees.forEach(item => {
                let empDetail = list.find(value => (value.Id == item.employees_Id));
                for(let key in item){
                    if(empDetail[key]) item[key] = empDetail[key];
                    item.designation = mapDesignation(item).designation;
                }
            });
        }
        return item;
    }

    function mapDesignation(employee){
        if(employee.experience > 3 && employee.experience < 7) employee.designation = 'Consultant';
        else if(employee.experience > 7) employee.designation = 'Senior Consultant';
        else employee.designation = 'Junior Consultant';
        return employee;
    }

}