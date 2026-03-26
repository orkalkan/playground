sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel"
], (BaseController, JSONModel) => {
  return BaseController.extend("ui5.fira.demos.controller.Launchpad", {

    onInit() {
      const auth = JSON.parse(sessionStorage.getItem("fira_auth") || "{}");
      this.getView().setModel(new JSONModel({ user: auth }), "auth");
    },

    onTilePress(event) {
      const route = event.getSource().getCustomData()[0].getValue();
      this.navTo(route);
    },

    onLogout() {
      sessionStorage.removeItem("fira_auth");
      this.getOwnerComponent().getRouter().navTo("login", {}, true);
    }

  });
});
