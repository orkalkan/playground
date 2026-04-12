sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], (BaseController, JSONModel, Filter, FilterOperator) => {
  "use strict";

  const SOURCE_ITEMS = [
    { materialId: "MAT-001", description: "Industrial Motor 22kW",       currentQty: 45,   adjQty: 0, reorderLevel: 10,  unitPrice: "4600.00",  unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-002", description: "Control Cabinet Type-3",      currentQty: 8,    adjQty: 0, reorderLevel: 15,  unitPrice: "3200.00",  unit: "EA",  statusLabel: "Low Stock",    statusState: "Warning" },
    { materialId: "MAT-003", description: "Pressure Valve DN80",          currentQty: 120,  adjQty: 0, reorderLevel: 20,  unitPrice: "185.00",   unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-004", description: "Cable Harness 3m",             currentQty: 0,    adjQty: 0, reorderLevel: 50,  unitPrice: "42.00",    unit: "EA",  statusLabel: "Out of Stock", statusState: "Error"   },
    { materialId: "MAT-005", description: "Hydraulic Oil SAE 46",         currentQty: 350,  adjQty: 0, reorderLevel: 100, unitPrice: "3.80",     unit: "L",   statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-006", description: "Sensor Array Type B",          currentQty: 22,   adjQty: 0, reorderLevel: 10,  unitPrice: "890.00",   unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-007", description: "Steel Sheet 2mm",              currentQty: 580,  adjQty: 0, reorderLevel: 200, unitPrice: "2.40",     unit: "KG",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-008", description: "Pump Unit Series-7",           currentQty: 4,    adjQty: 0, reorderLevel: 5,   unitPrice: "12400.00", unit: "EA",  statusLabel: "Low Stock",    statusState: "Warning" },
    { materialId: "MAT-009", description: "Valve Assembly Compact",       currentQty: 67,   adjQty: 0, reorderLevel: 25,  unitPrice: "320.00",   unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-010", description: "Power Unit 5kVA",              currentQty: 11,   adjQty: 0, reorderLevel: 8,   unitPrice: "7800.00",  unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-011", description: "Copper Wire 2.5mm²",           currentQty: 1200, adjQty: 0, reorderLevel: 500, unitPrice: "1.20",     unit: "M",   statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-012", description: "Safety Gloves Size L",         currentQty: 0,    adjQty: 0, reorderLevel: 24,  unitPrice: "8.50",     unit: "EA",  statusLabel: "Out of Stock", statusState: "Error"   },
    { materialId: "MAT-013", description: "Bearing SKF 6205",             currentQty: 88,   adjQty: 0, reorderLevel: 30,  unitPrice: "14.20",    unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-014", description: "Gasket Set Type-K",            currentQty: 3,    adjQty: 0, reorderLevel: 10,  unitPrice: "45.00",    unit: "BOX", statusLabel: "Low Stock",    statusState: "Warning" },
    { materialId: "MAT-015", description: "Grease Cartridge 400ml",       currentQty: 240,  adjQty: 0, reorderLevel: 50,  unitPrice: "6.20",     unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-016", description: "Terminal Block 4mm²",          currentQty: 500,  adjQty: 0, reorderLevel: 100, unitPrice: "1.80",     unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-017", description: "Filter Element Hydraulic",     currentQty: 6,    adjQty: 0, reorderLevel: 12,  unitPrice: "28.00",    unit: "EA",  statusLabel: "Low Stock",    statusState: "Warning" },
    { materialId: "MAT-018", description: "Paint Primer Grey 5L",         currentQty: 18,   adjQty: 0, reorderLevel: 10,  unitPrice: "32.00",    unit: "EA",  statusLabel: "In Stock",     statusState: "Success" },
    { materialId: "MAT-019", description: "O-Ring EPDM 50×3",             currentQty: 0,    adjQty: 0, reorderLevel: 100, unitPrice: "0.85",     unit: "EA",  statusLabel: "Out of Stock", statusState: "Error"   },
    { materialId: "MAT-020", description: "Screw M8×30 DIN 912",          currentQty: 2400, adjQty: 0, reorderLevel: 500, unitPrice: "0.12",     unit: "EA",  statusLabel: "In Stock",     statusState: "Success" }
  ];

  const deepCopy = (items) => items.map((item) => Object.assign({}, item));

  return BaseController.extend("ui5.fira.demos.controller.apps.stepinputtable.StepInputTableApp", {

    onInit() {
      this._savedItems = deepCopy(SOURCE_ITEMS);
      this.getView().setModel(new JSONModel({
        items: deepCopy(SOURCE_ITEMS),
        dirty: false,
        showSummary: false,
        summaryText: ""
      }), "sit");
    },

    onAdjustmentChange() {
      const oModel = this.getView().getModel("sit");
      if (oModel.getProperty("/dirty")) return;
      oModel.setProperty("/dirty", true);
      this.byId("changeStatus").setText("Unsaved changes");
      this.byId("changeStatus").setState("Warning");
    },

    onSave() {
      const oModel = this.getView().getModel("sit");
      const aItems = oModel.getProperty("/items");

      let changedCount = 0;
      aItems.forEach((item) => {
        if (item.adjQty !== 0) changedCount++;
        item.currentQty = Number(item.currentQty) + Number(item.adjQty);
        item.adjQty = 0;
      });

      this._savedItems = deepCopy(aItems);
      oModel.setProperty("/items", aItems);
      oModel.setProperty("/dirty", false);
      oModel.setProperty("/showSummary", true);
      oModel.setProperty("/summaryText", `${changedCount} item(s) adjusted. New quantities applied to stock.`);

      this.byId("changeStatus").setText("All changes saved");
      this.byId("changeStatus").setState("Success");
      this.toast("Changes saved.");
    },

    onDiscard() {
      const oModel = this.getView().getModel("sit");
      oModel.setProperty("/items", deepCopy(this._savedItems));
      oModel.setProperty("/dirty", false);
      oModel.setProperty("/showSummary", false);
      this.byId("changeStatus").setText("No unsaved changes");
      this.byId("changeStatus").setState("None");
      this.toast("Changes discarded.");
    },

    onReload() {
      this._savedItems = deepCopy(SOURCE_ITEMS);
      const oModel = this.getView().getModel("sit");
      oModel.setProperty("/items", deepCopy(SOURCE_ITEMS));
      oModel.setProperty("/dirty", false);
      oModel.setProperty("/showSummary", false);
      this.byId("changeStatus").setText("No unsaved changes");
      this.byId("changeStatus").setState("None");
      this.toast("Data reloaded.");
    },

    onTableSearch(oEvent) {
      this._filterTable(oEvent.getParameter("query") || "");
    },

    onTableSearchLive(oEvent) {
      this._filterTable(oEvent.getParameter("newValue") || "");
    },

    _filterTable(sQuery) {
      const oBinding = this.byId("inventoryTable").getBinding("rows");
      if (!oBinding) return;
      const aFilters = sQuery
        ? [new Filter({ filters: [
            new Filter("materialId",  FilterOperator.Contains, sQuery),
            new Filter("description", FilterOperator.Contains, sQuery)
          ], and: false })]
        : [];
      oBinding.filter(aFilters);
    },

    onRowSelect() {
      // intentional no-op — row selection is a recorded action target
    }

  });
});
