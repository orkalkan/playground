sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], (BaseController, JSONModel, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.warehouse.WarehouseApp", {

    onInit() {
      const data = {
        stockOverview: [
          { materialId: "RM-8821", description: "Steel Tube 50x4 mm", location: "WH01-A-01", unrestricted: 3200, inQuality: 500, inTransit: 0, minStock: 500, uom: "EA" },
          { materialId: "RM-4412", description: "Aluminium Sheet 2mm", location: "WH01-A-02", unrestricted: 180, inQuality: 0, inTransit: 200, minStock: 300, uom: "SHT" },
          { materialId: "FG-4521", description: "Industrial Motor 22kW", location: "WH02-B-05", unrestricted: 24, inQuality: 10, inTransit: 0, minStock: 20, uom: "PC" },
          { materialId: "FG-2210", description: "Control Cabinet Type-3", location: "WH02-B-06", unrestricted: 8, inQuality: 0, inTransit: 4, minStock: 10, uom: "PC" },
          { materialId: "RM-6650", description: "SKF Bearing 6205-2RS", location: "WH01-C-10", unrestricted: 5420, inQuality: 0, inTransit: 0, minStock: 1000, uom: "EA" },
          { materialId: "PKG-001", description: "Export Carton 60x40x40", location: "WH01-D-01", unrestricted: 420, inQuality: 0, inTransit: 0, minStock: 500, uom: "PC" },
          { materialId: "RM-2201", description: "Rubber Gasket 40mm", location: "WH01-A-05", unrestricted: 2800, inQuality: 200, inTransit: 0, minStock: 500, uom: "EA" },
          { materialId: "FG-8812", description: "Pressure Valve DN50", location: "WH02-B-08", unrestricted: 42, inQuality: 5, inTransit: 10, minStock: 30, uom: "PC" },
          { materialId: "RM-3310", description: "Copper Wire 2.5mm²", location: "WH01-B-03", unrestricted: 850, inQuality: 0, inTransit: 0, minStock: 200, uom: "M" },
          { materialId: "FG-3301", description: "Power Unit 400V/32A", location: "WH02-C-01", unrestricted: 12, inQuality: 0, inTransit: 6, minStock: 15, uom: "PC" },
          { materialId: "PKG-002", description: "Pallet 1200x800 Euro", location: "WH01-D-05", unrestricted: 280, inQuality: 0, inTransit: 0, minStock: 100, uom: "PC" },
          { materialId: "RM-7740", description: "Stainless Steel Bolt M12", location: "WH01-C-02", unrestricted: 12000, inQuality: 0, inTransit: 5000, minStock: 2000, uom: "EA" }
        ],
        grItems: [
          { item: "10", materialId: "RM-8821", description: "Steel Tube 50x4 mm", poQty: 500, deliveredQty: 500, uom: "EA", storeLoc: "0001" },
          { item: "20", materialId: "RM-2201", description: "Rubber Gasket 40mm", poQty: 1000, deliveredQty: 1000, uom: "EA", storeLoc: "0001" }
        ],
        pickLists: [
          { id: "PK-2025-0848", deliveryId: "DO-80041140", customer: "Müller Automotive GmbH", items: 4, totalWeight: 285, status: "Open", priority: false },
          { id: "PK-2025-0847", deliveryId: "DO-80041135", customer: "Schulz Maschinenbau AG", items: 2, totalWeight: 92, status: "In Picking", priority: true },
          { id: "PK-2025-0846", deliveryId: "DO-80041122", customer: "Wagner Industries KG", items: 7, totalWeight: 440, status: "Delayed", priority: false },
          { id: "PK-2025-0845", deliveryId: "DO-80041110", customer: "Fischer Components Ltd", items: 1, totalWeight: 18, status: "Picked", priority: false },
          { id: "PK-2025-0844", deliveryId: "DO-80041098", customer: "Bauer Elektrotechnik", items: 3, totalWeight: 155, status: "Open", priority: false },
          { id: "PK-2025-0843", deliveryId: "DO-80041085", customer: "Kramer Logistik GmbH", items: 5, totalWeight: 320, status: "Delayed", priority: true },
          { id: "PK-2025-0842", deliveryId: "DO-80041072", customer: "Hoffmann Group AG", items: 2, totalWeight: 68, status: "Open", priority: false },
          { id: "PK-2025-0841", deliveryId: "DO-80041060", customer: "Meier Antriebstechnik", items: 6, totalWeight: 510, status: "In Picking", priority: false }
        ],
        outboundDeliveries: [
          { id: "DO-80041140", salesOrderId: "SO-2025-10553", shipTo: "Müller Automotive GmbH", shipToCity: "Munich, Germany", carrier: "DHL Freight", weight: 285, shippingDate: "2025-03-20", status: "Ready to Ship", selected: false },
          { id: "DO-80041122", salesOrderId: "SO-2025-10551", shipTo: "Wagner Industries KG", shipToCity: "Stuttgart, Germany", carrier: "DB Schenker", weight: 440, shippingDate: "2025-03-20", status: "Ready to Ship", selected: false },
          { id: "DO-80041110", salesOrderId: "SO-2025-10548", shipTo: "Fischer Components Ltd", shipToCity: "Hamburg, Germany", carrier: "DHL Freight", weight: 18, shippingDate: "2025-03-19", status: "Ready to Ship", selected: false },
          { id: "DO-80041085", salesOrderId: "SO-2025-10545", shipTo: "Kramer Logistik GmbH", shipToCity: "Dortmund, Germany", carrier: "GLS Group", weight: 320, shippingDate: "2025-03-21", status: "Packing", selected: false }
        ]
      };
      this.getView().setModel(new JSONModel(data), "warehouse");
    },

    onNavBack() { this.byId("warehouseNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onGoodsReceiptPress() { this.byId("warehouseNav").to(this.byId("warehouseGRPage")); },
    onPickListPress() { this.byId("warehouseNav").to(this.byId("warehousePickPage")); },
    onShipmentPress() { this.byId("warehouseNav").to(this.byId("warehouseShipPage")); },

    onLoadPOItems() { this.toast("PO-2025-0150 loaded · 2 items found"); },

    onPickListItemPress() {},
    onStartPick() { this.toast("Pick task assigned to scanner station WH01-S3"); },

    onNewPickListPress() { this.toast("New pick list created"); },

    onCancelPickListPress(event) {
      const ctx = event.getSource().getBindingContext("warehouse");
      const pick = ctx.getObject();
      MessageBox.confirm(`Cancel pick list ${pick.id} for ${pick.customer}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("warehouse");
          const lists = model.getProperty("/pickLists");
          const idx = lists.indexOf(pick);
          if (idx !== -1) {
            lists.splice(idx, 1);
            model.setProperty("/pickLists", lists);
            model.refresh(true);
          }
          this.toast("Pick list cancelled");
        }
      });
    },

    onEditStockPress(event) {
      const ctx = event.getSource().getBindingContext("warehouse");
      const stock = ctx.getObject();
      this.toast(`Edit stock entry for ${stock.materialId} — feature: update quantities`);
    },

    onDeleteStockPress(event) {
      const ctx = event.getSource().getBindingContext("warehouse");
      const stock = ctx.getObject();
      MessageBox.confirm(`Remove stock entry for ${stock.materialId} — ${stock.description}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("warehouse");
          const overview = model.getProperty("/stockOverview");
          const idx = overview.indexOf(stock);
          if (idx !== -1) {
            overview.splice(idx, 1);
            model.setProperty("/stockOverview", overview);
            model.refresh(true);
          }
          this.toast("Stock entry removed");
        }
      });
    },

    onPostGR() {
      this.toast("Goods Receipt posted · Material document 5000012345 created");
      this.byId("warehouseNav").back();
    },

    onConfirmShipment() {
      this.toast("Shipment confirmed · Goods Issue posted for selected deliveries");
      this.byId("warehouseNav").back();
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatStockAlert(unrestricted, minStock) {
      if (unrestricted < minStock) return "Below Minimum";
      if (unrestricted < minStock * 1.2) return "Low Stock";
      return "OK";
    },

    formatStockState(unrestricted, minStock) {
      if (unrestricted < minStock) return "Error";
      if (unrestricted < minStock * 1.2) return "Warning";
      return "Success";
    },

    formatPickIcon(status) {
      const map = { "Open": "sap-icon://circle-task", "In Picking": "sap-icon://activity-2", "Picked": "sap-icon://accept", "Delayed": "sap-icon://warning2" };
      return map[status] || "sap-icon://circle-task";
    },

    formatPickColor(status) {
      const map = { "Open": "#0070F2", "In Picking": "#E9730C", "Picked": "#188918", "Delayed": "#BB0000" };
      return map[status] || "#8c8c8c";
    },

    formatPickState(status) {
      const map = { "Open": "None", "In Picking": "Warning", "Picked": "Success", "Delayed": "Error" };
      return map[status] || "None";
    },

    formatPickButtonType(status) {
      return status === "Picked" ? "Default" : "Emphasized";
    },

    formatShipState(status) {
      const map = { "Ready to Ship": "Success", "Packing": "Warning" };
      return map[status] || "None";
    }

  });
});
