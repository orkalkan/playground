sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], (BaseController, JSONModel, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.onboarding.OnboardingApp", {

    onInit() {
      const checklist = [
        { id: "personal", title: "Personal Information", description: "Fill in employee personal data and emergency contacts", status: "Completed" },
        { id: "docs", title: "Documents & ID Verification", description: "Upload passport, work permit, and tax documents", status: "Completed" },
        { id: "equipment", title: "Equipment Request", description: "Select laptop, phone, and accessories", status: "In Progress" },
        { id: "it", title: "IT Account Setup", description: "Create Active Directory, email, and VPN accounts", status: "Pending" },
        { id: "training", title: "Mandatory Trainings", description: "Complete compliance, safety, and data privacy trainings", status: "Pending" },
        { id: "benefits", title: "Benefits Enrollment", description: "Register for health insurance and company pension plan", status: "Pending" },
        { id: "orientation", title: "Orientation Meeting", description: "Schedule day-one introduction with HR and team lead", status: "Pending" }
      ];

      const documents = [
        { name: "Passport / National ID", description: "Government-issued photo ID", uploaded: true },
        { name: "Work Permit", description: "Required for non-EU nationals", uploaded: false },
        { name: "Tax ID Certificate", description: "Steueridentifikationsnummer", uploaded: true },
        { name: "Bank Account Details", description: "IBAN for payroll processing", uploaded: false },
        { name: "Signed Employment Contract", description: "Fully signed original contract", uploaded: true },
        { name: "Non-Disclosure Agreement", description: "Company NDA document", uploaded: false }
      ];

      const equipment = [
        { name: "Laptop — ThinkPad X1 Carbon", description: "14\" Intel Core i7, 16GB RAM", icon: "sap-icon://laptop", category: "Computing", selected: false },
        { name: "Laptop — MacBook Pro 14\"", description: "Apple M3 Pro, 18GB RAM", icon: "sap-icon://laptop", category: "Computing", selected: false },
        { name: "External Monitor 27\"", description: "Dell UltraSharp 4K USB-C", icon: "sap-icon://screen-split-two", category: "Peripherals", selected: false },
        { name: "Wireless Mouse & Keyboard", description: "Logitech MX Keys combo", icon: "sap-icon://keyboard-and-mouse", category: "Peripherals", selected: false },
        { name: "Mobile Phone — iPhone 15", description: "Company mobile plan included", icon: "sap-icon://iphone-2", category: "Mobile", selected: false },
        { name: "Mobile Phone — Samsung S24", description: "Company mobile plan included", icon: "sap-icon://iphone-2", category: "Mobile", selected: false },
        { name: "Headset — Jabra Evolve2", description: "Wireless, noise-cancelling", icon: "sap-icon://headset", category: "Audio", selected: false },
        { name: "Docking Station", description: "USB-C universal dock with 4K output", icon: "sap-icon://connected", category: "Peripherals", selected: false }
      ];

      const data = {
        newHires: [
          {
            empId: "EMP-2025-0041", name: "Laura Fischer", initials: "LF", avatarColor: "Accent1",
            firstName: "Laura", lastName: "Fischer", role: "Junior Software Engineer", department: "IT Department",
            startDate: "2025-04-01", progress: 60, status: "In Progress",
            dob: "1998-07-15", nationality: "DE", personalEmail: "laura.fischer@gmail.com",
            phone: "+49 151 23456789", emergencyContact: "Klaus Fischer +49 171 98765432",
            address: "Hauptstraße 12, 70173 Stuttgart"
          },
          {
            empId: "EMP-2025-0042", name: "Mehmet Yilmaz", initials: "MY", avatarColor: "Accent2",
            firstName: "Mehmet", lastName: "Yilmaz", role: "Sales Manager", department: "Sales Germany",
            startDate: "2025-04-07", progress: 30, status: "In Progress",
            dob: "1985-03-22", nationality: "DE", personalEmail: "m.yilmaz@hotmail.com",
            phone: "+49 162 33344455", emergencyContact: "Fatma Yilmaz +49 172 66677788",
            address: "Berliner Allee 45, 40212 Düsseldorf"
          },
          {
            empId: "EMP-2025-0043", name: "Sophie Dupont", initials: "SD", avatarColor: "Accent3",
            firstName: "Sophie", lastName: "Dupont", role: "Financial Analyst", department: "Finance & Controlling",
            startDate: "2025-04-14", progress: 10, status: "Pending",
            dob: "1992-11-08", nationality: "OTHER", personalEmail: "sophie.dupont@orange.fr",
            phone: "+33 6 12345678", emergencyContact: "Pierre Dupont +33 6 87654321",
            address: "Kaiserstraße 88, 60311 Frankfurt"
          },
          {
            empId: "EMP-2025-0044", name: "Alexander König", initials: "AK", avatarColor: "Accent4",
            firstName: "Alexander", lastName: "König", role: "Logistics Coordinator", department: "Logistics & Warehouse",
            startDate: "2025-03-17", progress: 85, status: "In Progress",
            dob: "1990-05-30", nationality: "AT", personalEmail: "alex.koenig@aon.at",
            phone: "+43 664 12345678", emergencyContact: "Maria König +43 664 87654321",
            address: "Ringstraße 3, 10115 Berlin"
          },
          {
            empId: "EMP-2025-0045", name: "Priya Sharma", initials: "PS", avatarColor: "Accent5",
            firstName: "Priya", lastName: "Sharma", role: "HR Business Partner", department: "Human Resources",
            startDate: "2025-03-24", progress: 100, status: "Completed",
            dob: "1987-09-12", nationality: "OTHER", personalEmail: "priya.sharma@gmail.com",
            phone: "+49 176 55566677", emergencyContact: "Raj Sharma +49 176 99988877",
            address: "Schillerstraße 22, 80336 München"
          },
          {
            empId: "EMP-2025-0046", name: "Thomas Bauer", initials: "TB", avatarColor: "Accent6",
            firstName: "Thomas", lastName: "Bauer", role: "Production Engineer", department: "Production",
            startDate: "2025-04-22", progress: 0, status: "Pending",
            dob: "1983-02-17", nationality: "DE", personalEmail: "tbauer@web.de",
            phone: "+49 160 44455566", emergencyContact: "Anna Bauer +49 160 33322211",
            address: "Industriestraße 7, 90411 Nürnberg"
          },
          {
            empId: "EMP-2025-0047", name: "Clara Hoffmann", initials: "CH", avatarColor: "Accent7",
            firstName: "Clara", lastName: "Hoffmann", role: "Marketing Specialist", department: "Marketing",
            startDate: "2025-04-28", progress: 0, status: "Pending",
            dob: "1995-06-03", nationality: "CH", personalEmail: "clara.hoffmann@bluewin.ch",
            phone: "+41 79 1234567", emergencyContact: "Ernst Hoffmann +41 79 7654321",
            address: "Friedrichstraße 101, 10117 Berlin"
          }
        ],
        checklist,
        documents,
        equipment,
        selectedHire: null
      };

      this.getView().setModel(new JSONModel(data), "onboarding");
    },

    onNavBack() { this.byId("onboardingNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onAddNewHirePress() {
      this.byId("onboardingNav").to(this.byId("onboardingNewHirePage"));
    },

    onNewHirePress(event) {
      const ctx = event.getSource().getBindingContext("onboarding");
      const model = this.getView().getModel("onboarding");
      model.setProperty("/selectedHire", Object.assign({}, ctx.getObject()));
      this._selectedHirePath = ctx.getPath();
      this._loadChecklistForHire(ctx.getObject());
      this.byId("onboardingNav").to(this.byId("onboardingWelcomePage"));
    },

    onEditHirePress(event) {
      event.stopPropagation();
      const ctx = event.getSource().getBindingContext("onboarding");
      const model = this.getView().getModel("onboarding");
      model.setProperty("/selectedHire", Object.assign({}, ctx.getObject()));
      this._selectedHirePath = ctx.getPath();
      this.byId("onboardingNav").to(this.byId("onboardingPersonalPage"));
    },

    onDeleteHirePress(event) {
      event.stopPropagation();
      const ctx = event.getSource().getBindingContext("onboarding");
      const hire = ctx.getObject();
      MessageBox.confirm(`Remove onboarding case for ${hire.name}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("onboarding");
          const hires = model.getProperty("/newHires");
          const idx = hires.indexOf(hire);
          if (idx !== -1) {
            hires.splice(idx, 1);
            model.setProperty("/newHires", hires);
            model.refresh(true);
          }
          this.toast("Onboarding case removed");
        }
      });
    },

    onChecklistItemPress(event) {
      const ctx = event.getSource().getBindingContext("onboarding");
      const item = ctx.getObject();
      if (item.id === "personal") {
        this.byId("onboardingNav").to(this.byId("onboardingPersonalPage"));
      } else if (item.id === "docs" || item.id === "equipment") {
        this.byId("onboardingNav").to(this.byId("onboardingDocsPage"));
      } else {
        this.toast(`Opening: ${item.title}`);
      }
    },

    onSavePersonalData() {
      const model = this.getView().getModel("onboarding");
      const updated = model.getProperty("/selectedHire");
      if (this._selectedHirePath) {
        model.setProperty(this._selectedHirePath, updated);
        model.refresh(true);
      }
      this.toast("Personal data saved");
      this.byId("onboardingNav").back();
    },

    onSaveNewHire() {
      const firstName = this.byId("newHireFirstName").getValue().trim();
      const lastName = this.byId("newHireLastName").getValue().trim();
      const role = this.byId("newHireRole").getValue().trim();
      const dept = this.byId("newHireDept").getSelectedKey();
      const deptText = this.byId("newHireDept").getSelectedItem().getText();
      const startDate = this.byId("newHireStartDate").getValue();
      const manager = this.byId("newHireManager").getValue().trim();
      const email = this.byId("newHireEmail").getValue().trim();

      if (!firstName || !lastName || !role || !startDate || !email) {
        this.toast("Please fill in all required fields");
        return;
      }

      const model = this.getView().getModel("onboarding");
      const hires = model.getProperty("/newHires");
      const newEmpId = `EMP-2025-${String(hires.length + 48).padStart(4, "0")}`;
      const initials = (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
      const colors = ["Accent1", "Accent2", "Accent3", "Accent4", "Accent5", "Accent6", "Accent7", "Accent8"];
      const avatarColor = colors[hires.length % colors.length];

      hires.push({
        empId: newEmpId,
        name: `${firstName} ${lastName}`,
        initials,
        avatarColor,
        firstName,
        lastName,
        role,
        department: deptText,
        startDate,
        progress: 0,
        status: "Pending",
        dob: "",
        nationality: "DE",
        personalEmail: email,
        phone: "",
        emergencyContact: manager,
        address: ""
      });

      model.setProperty("/newHires", hires);
      model.refresh(true);
      this.toast(`Onboarding case ${newEmpId} created`);
      this.byId("onboardingNav").backToPage(this.byId("onboardingListPage"));
    },

    onUploadDoc(event) {
      event.stopPropagation();
      const ctx = event.getSource().getBindingContext("onboarding");
      const model = this.getView().getModel("onboarding");
      model.setProperty(ctx.getPath() + "/uploaded", true);
      model.refresh(true);
      this.toast("Document uploaded");
    },

    onConfirmDocs() {
      this._updateChecklistItem("docs", "Completed");
      this._updateChecklistItem("equipment", "Completed");
      this.toast("Documents and equipment confirmed");
      this.byId("onboardingNav").back();
    },

    onEquipmentSelect(event) {
      const item = event.getParameter("listItem");
      const ctx = item.getBindingContext("onboarding");
      const model = this.getView().getModel("onboarding");
      model.setProperty(ctx.getPath() + "/selected", item.getSelected());
    },

    _loadChecklistForHire(hire) {
      const model = this.getView().getModel("onboarding");
      const progress = hire.progress || 0;
      const checklist = model.getProperty("/checklist");
      const step = 100 / checklist.length;
      checklist.forEach((item, idx) => {
        const threshold = (idx + 1) * step;
        if (progress >= threshold) {
          item.status = "Completed";
        } else if (progress >= threshold - step) {
          item.status = "In Progress";
        } else {
          item.status = "Pending";
        }
      });
      model.setProperty("/checklist", checklist);
      model.refresh(true);
    },

    _updateChecklistItem(id, status) {
      const model = this.getView().getModel("onboarding");
      const checklist = model.getProperty("/checklist");
      const item = checklist.find((c) => c.id === id);
      if (item) {
        item.status = status;
        model.setProperty("/checklist", checklist);
        model.refresh(true);
      }
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatHireState(status) {
      const map = { "Pending": "None", "In Progress": "Warning", "Completed": "Success" };
      return map[status] || "None";
    },

    formatCheckIcon(status) {
      const map = { "Completed": "sap-icon://accept", "In Progress": "sap-icon://activity-2", "Pending": "sap-icon://circle-task" };
      return map[status] || "sap-icon://circle-task";
    },

    formatCheckColor(status) {
      const map = { "Completed": "#188918", "In Progress": "#E9730C", "Pending": "#8c8c8c" };
      return map[status] || "#8c8c8c";
    },

    formatStepState(status) {
      const map = { "Completed": "Success", "In Progress": "Warning", "Pending": "None" };
      return map[status] || "None";
    },

    formatDocIcon(uploaded) { return uploaded ? "sap-icon://accept" : "sap-icon://attachment"; },
    formatDocColor(uploaded) { return uploaded ? "#188918" : "#8c8c8c"; },
    formatDocStatus(uploaded) { return uploaded ? "Uploaded" : "Pending"; },
    formatDocState(uploaded) { return uploaded ? "Success" : "None"; }

  });
});
