sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel"
], (BaseController, JSONModel) => {
  "use strict";

  const INITIAL_FORM = {
    systemName:       "TestForge Staging",
    environment:      "staging",
    region:           "eu-central-1",
    adminEmail:       "admin@orklabs.io",
    maxWorkers:       4,
    testTimeoutSec:   60,
    retryAttempts:    2,
    logLevel:         "info",
    screenshotMode:   "on-failure",
    headless:         "true",
    notifyOnFailure:  "email",
    webhookUrl:       "",
    failureThreshold: 20,
    notes:            "Staging environment — mirrors production config. Do not increase workers above 4."
  };

  const FIELD_LABELS = {
    systemName:       "System Name",
    environment:      "Environment",
    region:           "Region",
    adminEmail:       "Admin Email",
    maxWorkers:       "Max Parallel Workers",
    testTimeoutSec:   "Test Timeout (sec)",
    retryAttempts:    "Retry Attempts",
    logLevel:         "Log Level",
    screenshotMode:   "Screenshot Mode",
    headless:         "Headless Mode",
    notifyOnFailure:  "Notify on Failure",
    webhookUrl:       "Webhook URL",
    failureThreshold: "Failure Threshold (%)",
    notes:            "Notes"
  };

  const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

  return BaseController.extend("ui5.fira.demos.controller.apps.inputevents.InputEventsApp", {

    onInit() {
      this._savedForm = deepCopy(INITIAL_FORM);
      this.getView().setModel(new JSONModel({
        form:            deepCopy(INITIAL_FORM),
        dirty:           false,
        showSaveConfirm: false,
        lastSaveMessage: "",
        changeLog:       []
      }), "ie");
    },

    onFieldChange() {
      const oModel = this.getView().getModel("ie");
      if (oModel.getProperty("/dirty")) return;
      oModel.setProperty("/dirty", true);
      oModel.setProperty("/showSaveConfirm", false);
    },

    onSave() {
      const oModel = this.getView().getModel("ie");
      const oCurrent = oModel.getProperty("/form");

      // Build change log: compare current values against last saved
      const aChanges = Object.keys(FIELD_LABELS).reduce((acc, key) => {
        const sFrom = String(this._savedForm[key]);
        const sTo   = String(oCurrent[key]);
        if (sFrom !== sTo) {
          acc.push({ field: FIELD_LABELS[key], from: sFrom, to: sTo });
        }
        return acc;
      }, []);

      this._savedForm = deepCopy(oCurrent);

      oModel.setProperty("/dirty",           false);
      oModel.setProperty("/showSaveConfirm", true);
      oModel.setProperty("/changeLog",       aChanges);
      oModel.setProperty("/lastSaveMessage",
        `Configuration saved — ${aChanges.length} field(s) updated.`);

      this.toast("Configuration saved.");
    },

    onDiscard() {
      const oModel = this.getView().getModel("ie");
      oModel.setProperty("/form",            deepCopy(this._savedForm));
      oModel.setProperty("/dirty",           false);
      oModel.setProperty("/showSaveConfirm", false);
      oModel.setProperty("/changeLog",       []);
      this.toast("Changes discarded.");
    }

  });
});
