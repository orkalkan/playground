sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, JSONModel) => {
  return Controller.extend("ui5.fira.demos.controller.BaseController", {

    getRouter() {
      return this.getOwnerComponent().getRouter();
    },

    navTo(routeName, params) {
      this.getRouter().navTo(routeName, params || {});
    },

    navBackToLaunchpad() {
      this.navTo("launchpad");
    },

    getAppNav(navContainerId) {
      return this.byId(navContainerId);
    },

    toast(message) {
      MessageToast.show(message);
    },

    formatStatusState(status) {
      const map = {
        "Open": "None",
        "Pending Approval": "Warning",
        "Approved": "Success",
        "Closed": "None",
        "Rejected": "Error",
        "In Progress": "Warning",
        "Resolved": "Success",
        "New": "None",
        "Active": "Success",
        "Inactive": "None",
        "On Order": "Warning",
        "In Repair": "Warning",
        "Retired": "None"
      };
      return map[status] || "None";
    },

    formatCurrency(value, currency) {
      if (!value) return "";
      return new Intl.NumberFormat("de-DE", { style: "currency", currency: currency || "EUR" }).format(value);
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    }

  });
});
