sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.empform.EmpFormApp", {

    onInit() {
      const nationalities = [
        { name: "German" }, { name: "Turkish" }, { name: "French" },
        { name: "British" }, { name: "American" }, { name: "Dutch" },
        { name: "Spanish" }, { name: "Italian" }, { name: "Polish" },
        { name: "Portuguese" }, { name: "Swedish" }, { name: "Norwegian" },
        { name: "Danish" }, { name: "Finnish" }, { name: "Belgian" },
        { name: "Austrian" }, { name: "Swiss" }, { name: "Czech" },
        { name: "Hungarian" }, { name: "Romanian" }
      ];

      const offices = [
        { name: "Berlin HQ",       address: "Unter den Linden 10, 10117 Berlin" },
        { name: "Hamburg Office",  address: "Mönckebergstraße 7, 20095 Hamburg" },
        { name: "Munich Office",   address: "Marienplatz 1, 80331 Munich" },
        { name: "Frankfurt Office",address: "Zeil 80, 60313 Frankfurt" },
        { name: "Stuttgart Office",address: "Königstraße 5, 70173 Stuttgart" },
        { name: "Cologne Office",  address: "Hohe Straße 41, 50667 Cologne" },
        { name: "Remote",          address: "Remote / Home Office" }
      ];

      const jobTitlesByDepartment = {
        Engineering:  ["Software Engineer", "Senior Engineer", "Tech Lead", "Architect", "DevOps Engineer", "QA Engineer"],
        Marketing:    ["Marketing Manager", "Content Strategist", "SEO Specialist", "Brand Manager", "Campaign Manager"],
        Finance:      ["Financial Analyst", "Controller", "Accountant", "CFO", "Treasury Specialist"],
        HR:           ["HR Business Partner", "Recruiter", "HR Manager", "People Operations Specialist"],
        Operations:   ["Operations Manager", "Supply Chain Analyst", "Logistics Coordinator", "Process Engineer"],
        Legal:        ["Legal Counsel", "Compliance Officer", "Contract Manager", "Paralegal"],
        IT:           ["IT Manager", "System Administrator", "Network Engineer", "IT Support Specialist", "Security Analyst"],
        Sales:        ["Account Executive", "Sales Manager", "Business Development Manager", "Sales Engineer"]
      };

      this._jobTitlesByDepartment = jobTitlesByDepartment;

      const model = new JSONModel({
        // Form field values (reflected for review step)
        firstName:         "",
        lastName:          "",
        dateOfBirth:       "",
        salutation:        "Mr.",
        nationality:       "",
        email:             "",
        phone:             "",
        department:        "",
        employmentType:    "Full-Time",
        jobTitle:          "",
        startDate:         "",
        officeLocation:    "",
        seniorityLevel:    "Mid",
        requiredSkillsText:"",
        annualSalaryText:  "",
        // Wizard state
        step1Valid:        false,
        step2Valid:        false,
        submitEnabled:     false,
        // Dialog data
        nationalities,
        offices,
        allNationalities:  nationalities,
        allOffices:        offices
      });

      this.getView().setModel(model, "empform");
    },

    onNavBackToLaunchpad() {
      this.navBackToLaunchpad();
    },

    // ── Step 1 validation ──────────────────────────────────────

    onStep1Change() {
      const firstName = this.byId("firstName").getValue().trim();
      const lastName  = this.byId("lastName").getValue().trim();
      const email     = this.byId("email").getValue().trim();
      const isValid   = firstName.length > 0 && lastName.length > 0 && this._isValidEmail(email);

      const model = this.getView().getModel("empform");
      model.setProperty("/step1Valid", isValid);

      if (isValid) {
        model.setProperty("/firstName",   firstName);
        model.setProperty("/lastName",    lastName);
        model.setProperty("/email",       email);
        model.setProperty("/phone",       this.byId("phone").getValue());
        model.setProperty("/nationality", this.byId("nationalityInput").getValue());
        model.setProperty("/dateOfBirth", this.byId("dateOfBirth").getValue());

        const salutationKey = this.byId("salutation").getSelectedKey();
        const salutationMap = { mr: "Mr.", ms: "Ms.", mx: "Mx.", dr: "Dr." };
        model.setProperty("/salutation", salutationMap[salutationKey] || salutationKey);
      }
    },

    _isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // ── Step 2 validation ──────────────────────────────────────

    onDepartmentChange() {
      this.onStep2Change();
    },

    onStep2Change() {
      const department  = this.byId("department").getValue().trim();
      const jobTitle    = this.byId("jobTitle").getValue().trim();
      const startDate   = this.byId("startDate").getValue().trim();
      const office      = this.byId("officeLocation").getValue().trim();
      const isValid     = department.length > 0 && jobTitle.length > 0 && startDate.length > 0 && office.length > 0;

      const model = this.getView().getModel("empform");
      model.setProperty("/step2Valid", isValid);

      if (isValid) {
        const employmentTypeKey = this.byId("employmentType").getSelectedKey();
        const employmentTypeMap = { FullTime: "Full-Time", PartTime: "Part-Time", Contract: "Contract", Internship: "Internship" };
        const selectedSkills    = this.byId("requiredSkills").getSelectedKeys();
        const skillsText        = selectedSkills.length > 0 ? selectedSkills.join(", ") : "None";
        const salary            = this.byId("annualSalary").getValue();
        const salaryText        = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(salary);

        model.setProperty("/department",        department);
        model.setProperty("/employmentType",    employmentTypeMap[employmentTypeKey] || employmentTypeKey);
        model.setProperty("/jobTitle",          jobTitle);
        model.setProperty("/startDate",         startDate);
        model.setProperty("/officeLocation",    office);
        model.setProperty("/seniorityLevel",    this.byId("seniorityLevel").getSelectedKey());
        model.setProperty("/requiredSkillsText",skillsText);
        model.setProperty("/annualSalaryText",  salaryText);
      }
    },

    // ── Nationality suggestions & value help ───────────────────

    onNationalitySuggest(event) {
      const query = event.getParameter("suggestValue").toLowerCase();
      const items = this.byId("nationalityInput").getSuggestionItems();
      items.forEach((item) => {
        item.setVisible(item.getText().toLowerCase().includes(query));
      });
      this.byId("nationalityInput").suggest();
    },

    onNationalityValueHelp() {
      const model = this.getView().getModel("empform");
      model.setProperty("/nationalities", model.getProperty("/allNationalities"));
      this.byId("nationalityDialog").open();
    },

    onNationalitySearch(event) {
      const query   = event.getParameter("value").toLowerCase();
      const all     = this.getView().getModel("empform").getProperty("/allNationalities");
      const binding = this.byId("nationalityDialog").getBinding("items");
      binding.filter(query ? [new Filter("name", FilterOperator.Contains, query)] : []);
    },

    onNationalityConfirm(event) {
      const selected = event.getParameter("selectedItem");
      if (selected) {
        this.byId("nationalityInput").setValue(selected.getTitle());
        this.getView().getModel("empform").setProperty("/nationality", selected.getTitle());
        this.onStep1Change();
      }
    },

    // ── Office location value help ─────────────────────────────

    onOfficeValueHelp() {
      const model = this.getView().getModel("empform");
      model.setProperty("/offices", model.getProperty("/allOffices"));
      this.byId("officeDialog").open();
    },

    onOfficeSearch(event) {
      const query   = event.getParameter("value").toLowerCase();
      const binding = this.byId("officeDialog").getBinding("items");
      binding.filter(query ? [new Filter("name", FilterOperator.Contains, query)] : []);
    },

    onOfficeConfirm(event) {
      const selected = event.getParameter("selectedItem");
      if (selected) {
        this.byId("officeLocation").setValue(selected.getTitle());
        this.getView().getModel("empform").setProperty("/officeLocation", selected.getTitle());
        this.onStep2Change();
      }
    },

    onSelectDialogCancel() {
      // Nothing to do — dialog closes itself
    },

    // ── Job title suggestions per department ──────────────────

    onJobTitleSuggest(event) {
      const query      = event.getParameter("suggestValue").toLowerCase();
      const department = this.byId("department").getValue();
      const titles     = this._jobTitlesByDepartment[department] || Object.values(this._jobTitlesByDepartment).flat();
      const source     = event.getSource();

      source.destroySuggestionItems();
      titles
        .filter((title) => title.toLowerCase().includes(query))
        .forEach((title) => {
          source.addSuggestionItem(new sap.ui.core.Item({ text: title }));
        });
      source.suggest();
    },

    // ── Step 3: Confirm & Submit ───────────────────────────────

    onWizardComplete() {
      this._syncReviewData();
    },

    _syncReviewData() {
      const model = this.getView().getModel("empform");
      // Sync step2 summary in case wizard complete fires before last change event
      const employmentTypeKey = this.byId("employmentType").getSelectedKey();
      const employmentTypeMap = { FullTime: "Full-Time", PartTime: "Part-Time", Contract: "Contract", Internship: "Internship" };
      const selectedSkills    = this.byId("requiredSkills").getSelectedKeys();
      const skillsText        = selectedSkills.length > 0 ? selectedSkills.join(", ") : "None";
      const salary            = this.byId("annualSalary").getValue();
      const salaryText        = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(salary);

      model.setProperty("/department",        this.byId("department").getValue());
      model.setProperty("/employmentType",    employmentTypeMap[employmentTypeKey] || employmentTypeKey);
      model.setProperty("/jobTitle",          this.byId("jobTitle").getValue());
      model.setProperty("/startDate",         this.byId("startDate").getValue());
      model.setProperty("/officeLocation",    this.byId("officeLocation").getValue());
      model.setProperty("/seniorityLevel",    this.byId("seniorityLevel").getSelectedKey());
      model.setProperty("/requiredSkillsText",skillsText);
      model.setProperty("/annualSalaryText",  salaryText);

      const salutationKey = this.byId("salutation").getSelectedKey();
      const salutationMap = { mr: "Mr.", ms: "Ms.", mx: "Mx.", dr: "Dr." };
      model.setProperty("/salutation",   salutationMap[salutationKey] || salutationKey);
      model.setProperty("/nationality",  this.byId("nationalityInput").getValue());
      model.setProperty("/dateOfBirth",  this.byId("dateOfBirth").getValue());
      model.setProperty("/phone",        this.byId("phone").getValue());
    },

    onConfirmCheck(event) {
      const checked = event.getParameter("selected");
      this.getView().getModel("empform").setProperty("/submitEnabled", checked);
    },

    onSubmit() {
      const model    = this.getView().getModel("empform");
      const firstName = model.getProperty("/firstName");
      const lastName  = model.getProperty("/lastName");
      const dept      = model.getProperty("/department");

      MessageBox.success(
        `Onboarding request for ${firstName} ${lastName} (${dept}) has been submitted successfully.\n\nHR will contact the candidate within 2 business days.`,
        {
          title: "Onboarding Request Submitted",
          onClose: () => {
            this._resetWizard();
          }
        }
      );
    },

    _resetWizard() {
      const wizard = this.byId("onboardingWizard");
      wizard.discardProgress(this.byId("step1Personal"));

      this.byId("firstName").setValue("").setValueState("None");
      this.byId("lastName").setValue("").setValueState("None");
      this.byId("dateOfBirth").setValue("");
      this.byId("salutation").setSelectedKey("mr");
      this.byId("nationalityInput").setValue("");
      this.byId("email").setValue("").setValueState("None");
      this.byId("phone").setValue("");

      this.byId("department").setValue("").setSelectedKey("");
      this.byId("employmentType").setSelectedKey("FullTime");
      this.byId("jobTitle").setValue("");
      this.byId("startDate").setValue("");
      this.byId("officeLocation").setValue("").setValueState("None");
      this.byId("seniorityLevel").setSelectedKey("Mid");
      this.byId("requiredSkills").setSelectedKeys([]);
      this.byId("annualSalary").setValue(50000);

      this.byId("confirmCheck").setSelected(false);

      const model = this.getView().getModel("empform");
      model.setProperty("/step1Valid",     false);
      model.setProperty("/step2Valid",     false);
      model.setProperty("/submitEnabled",  false);
    }

  });
});
