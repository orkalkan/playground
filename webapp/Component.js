sap.ui.define(["sap/ui/core/UIComponent"], (UIComponent) => {
  return UIComponent.extend("ui5.fira.demos.Component", {
    metadata: { manifest: "json" },

    init() {
      UIComponent.prototype.init.apply(this, arguments);

      const router = this.getRouter();
      router.attachRouteMatched(this._onRouteMatched, this);
      router.initialize();
    },

    _onRouteMatched(event) {
      const routeName = event.getParameter("name");
      const isAuthenticated = !!sessionStorage.getItem("fira_auth");

      if (routeName !== "login" && !isAuthenticated) {
        // Auto-authenticate for test automation
        sessionStorage.setItem("fira_auth", JSON.stringify({ email: "admin@demo.com", name: "Admin" }));
      }
    }

  });
});
