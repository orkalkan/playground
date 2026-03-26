sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], (BaseController, JSONModel, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.quality.QualityApp", {

    onInit() {
      const chars = [
        { name: "Wall Thickness", spec: "Quantitative", lowerLimit: "3.80", upperLimit: "4.20", measuredValue: "4.02", result: true },
        { name: "Inner Diameter", spec: "Quantitative", lowerLimit: "49.90", upperLimit: "50.10", measuredValue: "49.95", result: true },
        { name: "Surface Roughness Ra", spec: "Quantitative", lowerLimit: "0.00", upperLimit: "1.60", measuredValue: "0.92", result: true },
        { name: "Hardness HRB", spec: "Quantitative", lowerLimit: "75", upperLimit: "90", measuredValue: "88", result: true },
        { name: "Visual Inspection", spec: "Qualitative", lowerLimit: "—", upperLimit: "—", measuredValue: "", result: null },
        { name: "Marking / Labeling", spec: "Qualitative", lowerLimit: "—", upperLimit: "—", measuredValue: "", result: null }
      ];
      const data = {
        inspections: [
          { id: "QML-2025-0453", materialId: "RM-8821", materialDesc: "Steel Tube 50x4 mm", batch: "BT-2025-03-A1", quantity: 500, uom: "EA", plant: "1000", origin: "Goods Receipt", createdDate: "2025-03-15", status: "Open", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0452", materialId: "RM-4412", materialDesc: "Aluminium Sheet 2mm", batch: "BT-2025-03-A2", quantity: 200, uom: "SHT", plant: "1000", origin: "Goods Receipt", createdDate: "2025-03-14", status: "In Progress", defectCount: 1, characteristics: chars },
          { id: "QML-2025-0451", materialId: "FG-9910", materialDesc: "Finished Assembly Type X", batch: "BT-2025-03-B1", quantity: 50, uom: "PC", plant: "1000", origin: "Production Order", createdDate: "2025-03-13", status: "In Progress", defectCount: 2, characteristics: chars },
          { id: "QML-2025-0450", materialId: "RM-2201", materialDesc: "Rubber Gasket 40mm", batch: "BT-2025-03-C1", quantity: 2000, uom: "EA", plant: "1000", origin: "Goods Receipt", createdDate: "2025-03-12", status: "Open", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0449", materialId: "FG-4521", materialDesc: "Industrial Motor 22kW", batch: "BT-2025-02-D1", quantity: 10, uom: "PC", plant: "1000", origin: "Production Order", createdDate: "2025-03-10", status: "Open", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0448", materialId: "RM-6650", materialDesc: "Bearing SKF 6205-2RS", batch: "BT-2025-02-E1", quantity: 1000, uom: "EA", plant: "1000", origin: "Goods Receipt", createdDate: "2025-03-08", status: "Open", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0447", materialId: "FG-8812", materialDesc: "Pressure Valve DN50", batch: "BT-2025-03-F1", quantity: 30, uom: "PC", plant: "1000", origin: "Production Order", createdDate: "2025-03-07", status: "In Progress", defectCount: 1, characteristics: chars },
          { id: "QML-2025-0446", materialId: "RM-3310", materialDesc: "Copper Wire 2.5mm²", batch: "BT-2025-03-G1", quantity: 5000, uom: "M", plant: "1000", origin: "Goods Receipt", createdDate: "2025-03-06", status: "Open", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0440", materialId: "FG-3301", materialDesc: "Power Unit 400V/32A", batch: "BT-2025-02-H1", quantity: 15, uom: "PC", plant: "1000", origin: "Production Order", createdDate: "2025-03-01", status: "Accepted", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0435", materialId: "RM-7740", materialDesc: "Stainless Steel Bolt M12", batch: "BT-2025-02-I1", quantity: 5000, uom: "EA", plant: "1000", origin: "Goods Receipt", createdDate: "2025-02-25", status: "Rejected", defectCount: 3, characteristics: chars },
          { id: "QML-2025-0430", materialId: "RM-8821", materialDesc: "Steel Tube 50x4 mm", batch: "BT-2025-02-J1", quantity: 300, uom: "EA", plant: "1000", origin: "Goods Receipt", createdDate: "2025-02-20", status: "Accepted", defectCount: 0, characteristics: chars },
          { id: "QML-2025-0425", materialId: "FG-2210", materialDesc: "Control Cabinet Type-3", batch: "BT-2025-02-K1", quantity: 8, uom: "PC", plant: "1000", origin: "Production Order", createdDate: "2025-02-15", status: "Accepted", defectCount: 0, characteristics: chars }
        ],
        selectedInspection: null,
        notifiedParties: []
      };
      this.getView().setModel(new JSONModel(data), "quality");
    },

    onNavBack() { this.byId("qualityNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onNewInspectionPress() {
      const model = this.getView().getModel("quality");
      const inspections = model.getProperty("/inspections");
      const newId = `QML-2025-${String(inspections.length + 454).padStart(4, "0")}`;
      inspections.unshift({
        id: newId,
        materialId: "RM-0001",
        materialDesc: "New Inspection",
        batch: `BT-2025-NEW`,
        quantity: 100,
        uom: "EA",
        plant: "1000",
        origin: "Goods Receipt",
        createdDate: new Date().toISOString().split("T")[0],
        status: "Open",
        defectCount: 0,
        characteristics: [
          { name: "Visual Inspection", spec: "Qualitative", lowerLimit: "—", upperLimit: "—", measuredValue: "", result: null }
        ]
      });
      model.setProperty("/inspections", inspections);
      model.refresh(true);
      this.toast(`Inspection lot ${newId} created`);
    },

    onInspectionPress(event) {
      const ctx = event.getSource().getBindingContext("quality");
      this.getView().getModel("quality").setProperty("/selectedInspection", ctx.getObject());
      this._selectedInspectionPath = ctx.getPath();
      this.byId("qualityNav").to(this.byId("qualityRecordPage"));
    },

    onDeleteInspectionPress(event) {
      const ctx = event.getSource().getBindingContext("quality");
      const inspection = ctx.getObject();
      MessageBox.confirm(`Delete inspection lot ${inspection.id} — ${inspection.materialDesc}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("quality");
          const inspections = model.getProperty("/inspections");
          const idx = inspections.indexOf(inspection);
          if (idx !== -1) {
            inspections.splice(idx, 1);
            model.setProperty("/inspections", inspections);
            model.refresh(true);
          }
          this.toast("Inspection lot deleted");
        }
      });
    },

    onLogDefectPress() { this.byId("qualityNav").to(this.byId("qualityDefectPage")); },

    onSaveDefect() {
      const model = this.getView().getModel("quality");
      const current = model.getProperty("/selectedInspection/defectCount") || 0;
      model.setProperty("/selectedInspection/defectCount", current + 1);
      if (this._selectedInspectionPath) {
        model.setProperty(this._selectedInspectionPath + "/defectCount", current + 1);
        model.setProperty(this._selectedInspectionPath + "/status", "In Progress");
        model.refresh(true);
      }
      this.toast("Defect logged");
      this.byId("qualityNav").back();
    },

    onSaveResults() {
      if (this._selectedInspectionPath) {
        this.getView().getModel("quality").setProperty(this._selectedInspectionPath + "/status", "In Progress");
        this.getView().getModel("quality").refresh(true);
      }
      this.byId("qualityNav").to(this.byId("qualityDecisionPage"));
    },

    onPostDecision() {
      const decision = this.byId("usageDecision").getSelectedKey();
      const statusMap = { "A": "Accepted", "R": "Rejected", "P": "Accepted", "B": "In Progress" };
      const model = this.getView().getModel("quality");
      const newStatus = statusMap[decision] || "Accepted";
      model.setProperty("/selectedInspection/status", newStatus);
      if (this._selectedInspectionPath) {
        model.setProperty(this._selectedInspectionPath + "/status", newStatus);
        model.refresh(true);
      }
      this.toast("Usage decision posted");
      this.byId("qualityNav").backToPage(this.byId("qualityListPage"));
    },

    formatResultText(result) {
      if (result === null || result === undefined || result === "") return "Not recorded";
      return result ? "Pass" : "Fail";
    },

    formatResultState(result) {
      if (result === null || result === undefined || result === "") return "None";
      return result ? "Success" : "Error";
    },

    formatStatusState(status) {
      const map = { "Open": "None", "In Progress": "Warning", "Accepted": "Success", "Rejected": "Error" };
      return map[status] || "None";
    }

  });
});
