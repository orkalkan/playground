sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], (BaseController, JSONModel, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.budget.BudgetApp", {

    onInit() {
      const data = {
        departments: [
          { name: "Sales Germany", manager: "M. Richter", costCenter: "CC-1001", budgetQ1: 420000, actualSpend: 398000, remaining: 22000, utilization: 95, status: "At Risk", breakdown: [{ category: "Personnel", budget: 280000, actual: 271000, variance: 9000 }, { category: "Travel & Entertainment", budget: 80000, actual: 84000, variance: -4000 }, { category: "Marketing", budget: 45000, actual: 32000, variance: 13000 }, { category: "Other", budget: 15000, actual: 11000, variance: 4000 }] },
          { name: "IT Department", manager: "K. Hoffmann", costCenter: "CC-1002", budgetQ1: 380000, actualSpend: 414000, remaining: -34000, utilization: 109, status: "Over Budget", breakdown: [{ category: "Personnel", budget: 200000, actual: 205000, variance: -5000 }, { category: "Software Licenses", budget: 120000, actual: 148000, variance: -28000 }, { category: "Hardware", budget: 50000, actual: 52000, variance: -2000 }, { category: "External Services", budget: 10000, actual: 9000, variance: 1000 }] },
          { name: "Research & Development", manager: "Dr. P. Werner", costCenter: "CC-1003", budgetQ1: 650000, actualSpend: 512000, remaining: 138000, utilization: 79, status: "On Track", breakdown: [{ category: "Personnel", budget: 420000, actual: 390000, variance: 30000 }, { category: "Lab Materials", budget: 120000, actual: 88000, variance: 32000 }, { category: "External Research", budget: 80000, actual: 24000, variance: 56000 }, { category: "Equipment", budget: 30000, actual: 10000, variance: 20000 }] },
          { name: "Management", manager: "CEO Office", costCenter: "CC-1004", budgetQ1: 180000, actualSpend: 205000, remaining: -25000, utilization: 114, status: "Over Budget", breakdown: [{ category: "Personnel", budget: 100000, actual: 105000, variance: -5000 }, { category: "Board Meetings", budget: 40000, actual: 58000, variance: -18000 }, { category: "Legal & Advisory", budget: 30000, actual: 32000, variance: -2000 }, { category: "Other", budget: 10000, actual: 10000, variance: 0 }] },
          { name: "Logistics & Warehouse", manager: "S. Keller", costCenter: "CC-1005", budgetQ1: 290000, actualSpend: 248000, remaining: 42000, utilization: 86, status: "On Track", breakdown: [{ category: "Personnel", budget: 180000, actual: 162000, variance: 18000 }, { category: "Freight & Transport", budget: 70000, actual: 68000, variance: 2000 }, { category: "Warehouse Ops", budget: 30000, actual: 14000, variance: 16000 }, { category: "Other", budget: 10000, actual: 4000, variance: 6000 }] },
          { name: "Production", manager: "T. Baumann", costCenter: "CC-1006", budgetQ1: 920000, actualSpend: 848000, remaining: 72000, utilization: 92, status: "On Track", breakdown: [{ category: "Personnel", budget: 550000, actual: 522000, variance: 28000 }, { category: "Raw Materials", budget: 250000, actual: 238000, variance: 12000 }, { category: "Maintenance", budget: 80000, actual: 62000, variance: 18000 }, { category: "Other", budget: 40000, actual: 26000, variance: 14000 }] },
          { name: "Marketing", manager: "L. Braun", costCenter: "CC-1007", budgetQ1: 320000, actualSpend: 342000, remaining: -22000, utilization: 107, status: "Over Budget", breakdown: [{ category: "Personnel", budget: 180000, actual: 188000, variance: -8000 }, { category: "Campaigns", budget: 100000, actual: 118000, variance: -18000 }, { category: "Events", budget: 30000, actual: 28000, variance: 2000 }, { category: "Digital", budget: 10000, actual: 8000, variance: 2000 }] },
          { name: "Human Resources", manager: "A. Schneider", costCenter: "CC-1008", budgetQ1: 210000, actualSpend: 188000, remaining: 22000, utilization: 90, status: "At Risk", breakdown: [{ category: "Personnel", budget: 160000, actual: 148000, variance: 12000 }, { category: "Training", budget: 30000, actual: 28000, variance: 2000 }, { category: "Recruiting", budget: 15000, actual: 10000, variance: 5000 }, { category: "Other", budget: 5000, actual: 2000, variance: 3000 }] },
          { name: "Finance & Controlling", manager: "O. Weber", costCenter: "CC-1009", budgetQ1: 160000, actualSpend: 142000, remaining: 18000, utilization: 89, status: "On Track", breakdown: [{ category: "Personnel", budget: 120000, actual: 110000, variance: 10000 }, { category: "Audit & Compliance", budget: 25000, actual: 22000, variance: 3000 }, { category: "Systems", budget: 15000, actual: 10000, variance: 5000 }] },
          { name: "Customer Service", manager: "P. Müller", costCenter: "CC-1010", budgetQ1: 110000, actualSpend: 103000, remaining: 7000, utilization: 94, status: "At Risk", breakdown: [{ category: "Personnel", budget: 80000, actual: 76000, variance: 4000 }, { category: "Tooling", budget: 20000, actual: 18000, variance: 2000 }, { category: "Training", budget: 10000, actual: 9000, variance: 1000 }] }
        ],
        supplementRequests: [
          { id: "SUP-2025-0041", department: "IT Department", amount: 40000, type: "Supplement", submittedAt: "2025-03-10", status: "Pending" },
          { id: "SUP-2025-0040", department: "Marketing", amount: 25000, type: "Supplement", submittedAt: "2025-03-08", status: "Approved" },
          { id: "SUP-2025-0039", department: "Management", amount: 30000, type: "Reallocation", submittedAt: "2025-03-05", status: "Rejected" },
          { id: "SUP-2025-0038", department: "Sales Germany", amount: 15000, type: "Supplement", submittedAt: "2025-03-01", status: "Approved" }
        ],
        selectedDept: null,
        newRequestX: { amount: "", justification: "" }
      };
      this.getView().setModel(new JSONModel(data), "budget");
    },

    onNavBack() { this.byId("budgetNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onRequestSupplementPress() {
      this.getView().getModel("budget").setProperty("/newRequestX", { amount: "", justification: "" });
      this.byId("budgetNav").to(this.byId("budgetRequestPage"));
    },
    onViewSupplementRequestsPress() { this.byId("budgetNav").to(this.byId("budgetRequestsListPage")); },

    onDepartmentPress(event) {
      const ctx = event.getSource().getBindingContext("budget");
      this.getView().getModel("budget").setProperty("/selectedDept", ctx.getObject());
      this._selectedDeptPath = ctx.getPath();
      this.byId("budgetNav").to(this.byId("budgetDetailPage"));
    },

    onEditSelectedDeptPress() {
      this.byId("budgetNav").to(this.byId("budgetRequestPage"));
    },

    onEditDepartmentPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("budget");
      this.getView().getModel("budget").setProperty("/selectedDept", ctx.getObject());
      this._selectedDeptPath = ctx.getPath();
      this.byId("budgetNav").to(this.byId("budgetDetailPage"));
    },

    onDeleteDepartmentPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("budget");
      const dept = ctx.getObject();
      MessageBox.confirm(`Remove department "${dept.name}" (${dept.costCenter}) from this view?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("budget");
          const depts = model.getProperty("/departments");
          const idx = depts.indexOf(dept);
          if (idx !== -1) {
            depts.splice(idx, 1);
            model.setProperty("/departments", depts);
            model.refresh(true);
          }
          this.toast("Department removed");
        }
      });
    },

    onDeleteSupplementPress(event) {
      const ctx = event.getSource().getBindingContext("budget");
      const req = ctx.getObject();
      MessageBox.confirm(`Delete supplement request ${req.id}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("budget");
          const requests = model.getProperty("/supplementRequests");
          const idx = requests.indexOf(req);
          if (idx !== -1) {
            requests.splice(idx, 1);
            model.setProperty("/supplementRequests", requests);
            model.refresh(true);
          }
          this.toast("Request deleted");
        }
      });
    },

    onSubmitRequest() {
      const model = this.getView().getModel("budget");
      const requests = model.getProperty("/supplementRequests");
      // Prefer byId (regular app) — fall back to model values (X variant, ID-free)
      const newRequestX = model.getProperty("/newRequestX") ?? {};
      const amount = parseFloat(this.byId("requestAmount")?.getValue() ?? newRequestX.amount ?? "0") || 0;
      const deptKey = this.byId("requestDept")?.getSelectedKey() || "CC-1001";
      const typeKey = this.byId("requestType")?.getSelectedKey() || "supplement";
      const typeMap = { supplement: "Supplement", reallocation: "Reallocation", reserve: "Reserve Unblock" };
      const newId = `SUP-2025-${String(requests.length + 42).padStart(4, "0")}`;
      requests.unshift({
        id: newId,
        department: deptKey,
        amount,
        type: typeMap[typeKey] || typeKey,
        submittedAt: new Date().toISOString().split("T")[0],
        status: "Pending"
      });
      model.setProperty("/supplementRequests", requests);
      model.refresh(true);
      this.toast("Budget supplement request submitted for approval");
      this.byId("budgetNav").back();
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatRemainingState(remaining) {
      if (remaining < 0) return "Error";
      if (remaining < 20000) return "Warning";
      return "None";
    },

    formatVarianceState(variance) {
      if (variance < 0) return "Error";
      if (variance > 0) return "Success";
      return "None";
    },

    formatBarState(utilization) {
      if (utilization > 100) return "Error";
      if (utilization > 90) return "Critical";
      return "Good";
    },

    formatStatusState(status) {
      const map = { "On Track": "Success", "At Risk": "Warning", "Over Budget": "Error" };
      return map[status] || "None";
    },

    formatSupplementState(status) {
      const map = { "Pending": "Warning", "Approved": "Success", "Rejected": "Error" };
      return map[status] || "None";
    }

  });
});
