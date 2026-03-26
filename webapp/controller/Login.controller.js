sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (Controller) => {
  return Controller.extend("ui5.fira.demos.controller.Login", {

    onInit() {
      // If already authenticated, skip login
      if (sessionStorage.getItem("fira_auth")) {
        this._navToLaunchpad();
      }
    },

    onLogin() {
      const email    = this.byId("loginEmail").getValue().trim();
      const password = this.byId("loginPassword").getValue();

      if (email === "admin@demo.com" && password === "password123") {
        sessionStorage.setItem("fira_auth", JSON.stringify({
          email,
          name: "Admin User",
          initials: "OR",
          loggedInAt: new Date().toISOString()
        }));
        this._navToLaunchpad();
      } else {
        this.byId("loginError").setVisible(true);
        this.byId("loginPassword").setValue("");
        this.byId("loginPassword").focus();
      }
    },

    _navToLaunchpad() {
      this.getOwnerComponent().getRouter().navTo("launchpad", {}, true);
    }

  });
});
