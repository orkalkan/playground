sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.assets.AssetApp", {

    onInit() {
      const data = {
        assets: [
          { id: "AST-10048", serialNo: "SN-C02XK1JFGTFN", description: "MacBook Pro 16\" M3 Pro", category: "IT", location: "HQ · Floor 3", locationKey: "HQ-F3", assignedTo: "M. Schneider", costCenter: "CC-1002 — IT", vendor: "Apple Inc.", purchaseDate: "2024-09-01", acquisitionValue: 3200, accumulatedDepr: 533, netBookValue: 2667, usefulLife: 5, deprecMethod: "Straight-line", deprecRate: 20, fullyDepreciated: false, status: "Active", maintenanceHistory: [{ type: "Software Update", description: "macOS Sequoia 15.2 installed", date: "2025-01-15", icon: "sap-icon://update" }] },
          { id: "AST-10047", serialNo: "SN-DELL-7760-001", description: "Dell Precision 7760 Workstation", category: "IT", location: "HQ · Floor 2", locationKey: "HQ-F2", assignedTo: "K. Weber", costCenter: "CC-1002 — IT", vendor: "Dell Technologies", purchaseDate: "2023-05-15", acquisitionValue: 2800, accumulatedDepr: 840, netBookValue: 1960, usefulLife: 5, deprecMethod: "Straight-line", deprecRate: 20, fullyDepreciated: false, status: "Active", maintenanceHistory: [] },
          { id: "AST-10046", serialNo: "JH8-2245-VKL-998", description: "Forklift Clark C25 — 2.5t", category: "Vehicles", location: "Warehouse 01", locationKey: "WH-01", assignedTo: "Warehouse Team", costCenter: "CC-1005 — Logistics", vendor: "Clark Europe GmbH", purchaseDate: "2022-03-15", acquisitionValue: 28000, accumulatedDepr: 16800, netBookValue: 11200, usefulLife: 7, deprecMethod: "Straight-line", deprecRate: 14.3, fullyDepreciated: false, status: "Active", maintenanceHistory: [{ type: "Annual Service", description: "Complete maintenance incl. oil change, brake inspection", date: "2025-02-01", icon: "sap-icon://wrench" }] },
          { id: "AST-10045", serialNo: "VAN-FD-2022-001", description: "Ford Transit Van — Load 1350kg", category: "Vehicles", location: "Warehouse 02", locationKey: "WH-02", assignedTo: "Logistics Team", costCenter: "CC-1005 — Logistics", vendor: "Ford Motor Company", purchaseDate: "2022-06-20", acquisitionValue: 45000, accumulatedDepr: 22500, netBookValue: 22500, usefulLife: 8, deprecMethod: "Straight-line", deprecRate: 12.5, fullyDepreciated: false, status: "Active", maintenanceHistory: [] },
          { id: "AST-10044", serialNo: "BG-8871-PRESS-01", description: "Hydraulic Press 200T — Schuler", category: "Machinery", location: "Production Hall B", locationKey: "PROD-B", assignedTo: "Production Dept.", costCenter: "CC-1006 — Production", vendor: "Schuler Group AG", purchaseDate: "2018-06-01", acquisitionValue: 185000, accumulatedDepr: 148000, netBookValue: 37000, usefulLife: 10, deprecMethod: "Straight-line", deprecRate: 10, fullyDepreciated: false, status: "In Repair", maintenanceHistory: [{ type: "Emergency Repair", description: "Hydraulic pump failure — replacement in progress", date: "2025-03-10", icon: "sap-icon://alert" }] },
          { id: "AST-10043", serialNo: "CNC-MZ-2020-A", description: "CNC Milling Machine — MZ 500", category: "Machinery", location: "Production Hall A", locationKey: "PROD-A", assignedTo: "Production Dept.", costCenter: "CC-1006 — Production", vendor: "DMG Mori AG", purchaseDate: "2020-04-10", acquisitionValue: 320000, accumulatedDepr: 128000, netBookValue: 192000, usefulLife: 10, deprecMethod: "Straight-line", deprecRate: 10, fullyDepreciated: false, status: "Active", maintenanceHistory: [{ type: "Annual Inspection", description: "TÜV inspection passed", date: "2024-06-01", icon: "sap-icon://accept" }] },
          { id: "AST-10042", serialNo: "OFC-DESK-0042", description: "Executive Desk + Chair Set", category: "Furniture", location: "HQ · Floor 1", locationKey: "HQ-F1", assignedTo: "CEO Office", costCenter: "CC-1004 — Management", vendor: "VITRA GmbH", purchaseDate: "2020-01-15", acquisitionValue: 4500, accumulatedDepr: 4500, netBookValue: 0, usefulLife: 5, deprecMethod: "Straight-line", deprecRate: 20, fullyDepreciated: true, status: "Active", maintenanceHistory: [] },
          { id: "AST-10041", serialNo: "OFC-CONF-0012", description: "Conference Room Chairs (12 pcs)", category: "Furniture", location: "HQ · Floor 2", locationKey: "HQ-F2", assignedTo: "Facilities", costCenter: "CC-1004 — Management", vendor: "Steelcase Inc.", purchaseDate: "2021-08-01", acquisitionValue: 6000, accumulatedDepr: 2400, netBookValue: 3600, usefulLife: 10, deprecMethod: "Straight-line", deprecRate: 10, fullyDepreciated: false, status: "Active", maintenanceHistory: [] },
          { id: "AST-10040", serialNo: "N/A", description: "Server Room — Building C Annex", category: "Buildings", location: "HQ · Building C", locationKey: "HQ-F1", assignedTo: "IT Infrastructure", costCenter: "CC-1002 — IT", vendor: "Custom Build", purchaseDate: "2015-04-01", acquisitionValue: 950000, accumulatedDepr: 285000, netBookValue: 665000, usefulLife: 40, deprecMethod: "Straight-line", deprecRate: 2.5, fullyDepreciated: false, status: "Active", maintenanceHistory: [{ type: "HVAC Service", description: "Cooling system annual maintenance", date: "2025-01-20", icon: "sap-icon://wrench" }] },
          { id: "AST-10039", serialNo: "SRV-HPE-2023-01", description: "HPE ProLiant DL380 Server", category: "IT", location: "HQ · Floor 1", locationKey: "HQ-F1", assignedTo: "IT Infrastructure", costCenter: "CC-1002 — IT", vendor: "Hewlett Packard Enterprise", purchaseDate: "2023-11-10", acquisitionValue: 12000, accumulatedDepr: 2400, netBookValue: 9600, usefulLife: 5, deprecMethod: "Straight-line", deprecRate: 20, fullyDepreciated: false, status: "Active", maintenanceHistory: [] },
          { id: "AST-10038", serialNo: "PLT-TR-2019-02", description: "Electric Pallet Truck — BT LWE", category: "Vehicles", location: "Warehouse 01", locationKey: "WH-01", assignedTo: "Warehouse Team", costCenter: "CC-1005 — Logistics", vendor: "Toyota Material Handling", purchaseDate: "2019-09-01", acquisitionValue: 8500, accumulatedDepr: 7200, netBookValue: 1300, usefulLife: 8, deprecMethod: "Straight-line", deprecRate: 12.5, fullyDepreciated: false, status: "Active", maintenanceHistory: [] },
          { id: "AST-10037", serialNo: "GEN-DEUT-2021-A", description: "Diesel Generator 250kVA", category: "Machinery", location: "Warehouse 02", locationKey: "WH-02", assignedTo: "Facilities", costCenter: "CC-1005 — Logistics", vendor: "Deutz AG", purchaseDate: "2021-02-15", acquisitionValue: 35000, accumulatedDepr: 14000, netBookValue: 21000, usefulLife: 10, deprecMethod: "Straight-line", deprecRate: 10, fullyDepreciated: false, status: "Inactive", maintenanceHistory: [] }
        ],
        selectedAsset: null,
        editAsset: null
      };
      this.getView().setModel(new JSONModel(data), "assets");
    },

    onNavBack() { this.byId("assetNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onRegisterPress() {
      this.getView().getModel("assets").setProperty("/editAsset", {
        description: "", category: "IT", serialNo: "", vendor: "", purchaseDate: "",
        acquisitionValue: 0, usefulLife: 5, locationKey: "HQ-F3", location: "HQ · Floor 3", assignedTo: ""
      });
      this._editAssetPath = null;
      this.byId("assetNav").to(this.byId("assetRegisterPage"));
    },

    onAssetPress(event) {
      const ctx = event.getSource().getBindingContext("assets");
      this.getView().getModel("assets").setProperty("/selectedAsset", ctx.getObject());
      this._selectedAssetPath = ctx.getPath();
      this.byId("assetNav").to(this.byId("assetDetailPage"));
    },

    onEditSelectedAssetPress() {
      const model = this.getView().getModel("assets");
      model.setProperty("/editAsset", Object.assign({}, model.getProperty("/selectedAsset")));
      this._editAssetPath = this._selectedAssetPath;
      this.byId("assetNav").to(this.byId("assetRegisterPage"));
    },

    onEditAssetPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("assets");
      const model = this.getView().getModel("assets");
      model.setProperty("/editAsset", Object.assign({}, ctx.getObject()));
      this._editAssetPath = ctx.getPath();
      this.byId("assetNav").to(this.byId("assetRegisterPage"));
    },

    onDeleteAssetPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("assets");
      const asset = ctx.getObject();
      MessageBox.confirm(`Delete asset ${asset.id}: "${asset.description}"?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("assets");
          const assets = model.getProperty("/assets");
          const idx = assets.indexOf(asset);
          if (idx !== -1) {
            assets.splice(idx, 1);
            model.setProperty("/assets", assets);
            model.refresh(true);
          }
          this.toast("Asset deleted");
        }
      });
    },

    onSaveAsset() {
      const model = this.getView().getModel("assets");
      const editAsset = model.getProperty("/editAsset");
      if (this._editAssetPath) {
        const assets = model.getProperty("/assets");
        const existing = model.getProperty(this._editAssetPath);
        Object.assign(existing, editAsset);
        model.setProperty("/assets", assets);
        model.setProperty("/selectedAsset", existing);
        model.refresh(true);
        this.toast("Asset updated successfully");
      } else {
        const assets = model.getProperty("/assets");
        const newId = `AST-${String(10049 + assets.length)}`;
        editAsset.id = newId;
        editAsset.accumulatedDepr = 0;
        editAsset.netBookValue = editAsset.acquisitionValue;
        editAsset.deprecMethod = "Straight-line";
        editAsset.deprecRate = editAsset.usefulLife > 0 ? Math.round(100 / editAsset.usefulLife * 10) / 10 : 20;
        editAsset.fullyDepreciated = false;
        editAsset.status = "Active";
        editAsset.maintenanceHistory = [];
        assets.unshift(editAsset);
        model.setProperty("/assets", assets);
        model.refresh(true);
        this.toast(`Asset ${newId} registered successfully`);
      }
      this.byId("assetNav").back();
    },

    onMaintenanceRequestPress() {
      this.byId("assetNav").to(this.byId("assetMaintenancePage"));
    },

    onSubmitMaintenance() {
      const model = this.getView().getModel("assets");
      const asset = model.getProperty("/selectedAsset");
      const type = this.byId("maintenanceType").getSelectedKey();
      const description = this.byId("maintenanceDescription").getValue() || "Maintenance request";
      const history = asset.maintenanceHistory || [];
      history.unshift({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        description,
        date: new Date().toISOString().split("T")[0],
        icon: "sap-icon://wrench"
      });
      model.setProperty("/selectedAsset/maintenanceHistory", history);
      model.setProperty("/selectedAsset/status", "In Repair");
      if (this._selectedAssetPath) {
        model.setProperty(this._selectedAssetPath + "/status", "In Repair");
        model.refresh(true);
      }
      this.toast("Maintenance request submitted to facilities team");
      this.byId("assetNav").back();
    },

    onSearch(event) {
      const query = event.getParameter("query");
      const binding = this.byId("assetTable").getBinding("items");
      binding.filter(!query ? [] : [new Filter({ filters: [new Filter("id", FilterOperator.Contains, query), new Filter("description", FilterOperator.Contains, query)], and: false })]);
    },

    onCategoryFilter(event) {
      const key = event.getParameter("selectedItem").getKey();
      const binding = this.byId("assetTable").getBinding("items");
      binding.filter(key === "all" ? [] : [new Filter("category", FilterOperator.EQ, key)]);
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatBookValueState(netBookValue) {
      if (netBookValue === 0) return "None";
      return netBookValue < 1000 ? "Warning" : "None";
    },

    formatBoolean(val) { return val ? "Yes" : "No"; },

    formatStatusState(status) {
      const map = { "Active": "Success", "In Repair": "Warning", "Inactive": "None", "Retired": "None", "Disposed": "None" };
      return map[status] || "None";
    }

  });
});
