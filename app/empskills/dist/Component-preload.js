//@ui5-bundle myproject/empskills/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"myproject/empskills/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("myproject.empskills.Component",{metadata:{manifest:"json"}})});
},
	"myproject/empskills/i18n/i18n.properties":'# This is the resource bundle for empskills\r\n\r\n#Texts for manifest.json\r\n\r\n#XTIT: Application name\r\nappTitle=Employee Skills\r\n\r\n#YDES: Application description\r\nappDescription=A Fiori application.\r\n',
	"myproject/empskills/manifest.json":'{"_version":"1.32.0","sap.app":{"id":"myproject.empskills","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"1.0.0"},"title":"{{appTitle}}","description":"{{appDescription}}","dataSources":{"mainService":{"uri":"employee/","type":"OData","settings":{"odataVersion":"4.0"}}},"offline":false,"resources":"resources.json","sourceTemplate":{"id":"ui5template.fiorielements.v4.lrop","version":"1.0.0"},"crossNavigation":{"inbounds":{"intent1":{"signature":{"parameters":{},"additionalParameters":"allowed"},"semanticObject":"Dynamic","action":"display"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"resources":{"js":[],"css":[]},"dependencies":{"minUI5Version":"1.99.0","libs":{"sap.ui.core":{},"sap.fe.templates":{}}},"models":{"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"},"i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}}},"routing":{"routes":[{"pattern":":?query:","name":"EmployeesList","target":"EmployeesList"},{"pattern":"Employees({key}):?query:","name":"EmployeesObjectPage","target":"EmployeesObjectPage"},{"pattern":"Employees({key})/NavToSkills({key2}):?query:","name":"Emp2SkillObjectPage","target":"Emp2SkillObjectPage"}],"targets":{"EmployeesList":{"type":"Component","id":"EmployeesList","name":"sap.fe.templates.ListReport","options":{"settings":{"entitySet":"Employees","variantManagement":"Page","navigation":{"Employees":{"detail":{"route":"EmployeesObjectPage"}}}}}},"EmployeesObjectPage":{"type":"Component","id":"EmployeesObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"entitySet":"Employees","navigation":{"NavToSkills":{"detail":{"route":"Emp2SkillObjectPage"}}}}}},"Emp2SkillObjectPage":{"type":"Component","id":"Emp2SkillObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"entitySet":"Emp2Skill"}}}}},"contentDensities":{"compact":true,"cozy":true}},"sap.platform.abap":{"_version":"1.1.0","uri":""},"sap.platform.hcp":{"_version":"1.1.0","uri":""},"sap.fiori":{"_version":"1.1.0","registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"myproject.EmpSkills"}}'
}});