const cds = require('@sap/cds');
module.exports = cds.service.impl(function(){

    const {Skills,Employees,SkillImages,Emp2Skill} = this.entities();
    this.after('READ','Employees',async (employees,req) => {
        const db = cds.transaction(req);
        const skills = await db.read(Skills);
        if(employees.length){
            employees.map(each => {
                mapDesignation(each);
                mapDetails(each,skills)
            })
        }
        else{
            mapDesignation(employees);
            mapDetails(employees,skills) 
        }
    })

    this.after('READ','Skills',async (skills,req) => {
        const db = cds.transaction(req);
        const employees = await db.read(Employees);
        if(skills.length)
            skills.map(each => mapDetails(each,employees))
        else
            mapDetails(skills,employees)
    })
    
    this.on('loadSkillImages', async (req) => {
        //req._.req.loggingContext.getTracer(__filename).info('Inside loadProductImages Handler')
        try {
          const fs = require("fs")
          const fileExists = require('fs').existsSync
          let skills = await cds.run(SELECT.from(Skills))
          for (let skill of skills) {
            let fileName = __dirname + `/images/${skill.Id}.jpg`
            if (fileExists(fileName)) {
              let importData = fs.readFileSync(fileName)
              await cds.run(INSERT.into(SkillImages).columns(
                'skill_Id', 'imageType', 'image'
              ).values(
                skill.Id, 'image/jpeg', importData
               ))
              //await cds.run(UPDATE(Products).set({ imageType: 'image/jpeg', image: importData }).where({ productId: product.productId }))
            }
          }
          return true
        } catch (error) {
          //req._.req.loggingContext.getLogger('/Application/loadProductImages').error(error)
          return false
        }
      })

    this.after('each', Emp2Skill, async (row) =>{
        row.imageUrl = `/employee/SkillImages(${row.skills_Id})/image`
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
        else if(employee.experience >= 7) employee.designation = 'Senior Consultant';
        else employee.designation = 'Junior Consultant';
        return employee;
    }
})