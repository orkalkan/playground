sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox",
  "sap/m/MessageToast"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox, MessageToast) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.po.POApp", {

    onInit() {
      const li = (id, mat, desc, qty, uom, price, date, comment, deliveries, scheduleLines) => ({
        id, materialId: mat, description: desc, qty, uom,
        unitPrice: price, total: qty * price,
        deliveryDate: date, deliveryTime: "", comment: comment || "",
        deliveries: deliveries || [],
        scheduleLines: scheduleLines || []
      });
      const dl = (date, time, qty, comment) => ({ date, time, qty, comment });

      const data = {
        purchaseOrders: [
          {
            id: "PO-2025-0152", vendor: "Siemens AG", vendorId: "1000", purchasingGroup: "001 — Central",
            amount: 48500, currency: "EUR", status: "Pending Approval", date: "2025-03-15", items: 4,
            deliveryDate: "2025-04-10", paymentTerms: "N030", createdBy: "M. Schneider",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "PO created and forwarded", icon: "sap-icon://create" }, { step: "Line Manager", status: "Pending Approval", comment: "Awaiting approval", icon: "sap-icon://person-placeholder" }],
            lineItems: [
              li("10","EL-1042","Industrial Sensor Module",      10,"EA",2850,"2025-04-10","Handle with care", [dl("2025-04-05","10:00",5,"First partial batch"), dl("2025-04-10","14:00",5,"Final delivery")]),
              li("20","EL-2218","Control Unit Type-B",             2,"PC",5500,"2025-04-12","", [dl("2025-04-12","09:00",2,"Complete delivery")]),
              li("30","EL-3300","Mounting Frame Set",             10,"PC", 400,"2025-04-15","",  []),
              li("40","EL-4100","Cable Assembly Kit",              5,"EA",1000,"2025-04-20","With connectors", [])
            ]
          },
          {
            id: "PO-2025-0151", vendor: "SAP SE", vendorId: "1001", purchasingGroup: "002 — IT",
            amount: 12200, currency: "EUR", status: "Open", date: "2025-03-14", items: 2,
            deliveryDate: "2025-04-05", paymentTerms: "N014", createdBy: "K. Weber",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "Draft saved", icon: "sap-icon://create" }],
            lineItems: [
              li("10","SW-4001","SAP S/4HANA License",       1,"EA",9200,"2025-04-05","Annual license", []),
              li("20","SW-4002","Implementation Services",   4,"EA", 750,"2025-04-05","",                [])
            ]
          },
          {
            id: "PO-2025-0150", vendor: "BASF SE", vendorId: "1002", purchasingGroup: "001 — Central",
            amount: 7800, currency: "EUR", status: "Approved", date: "2025-03-12", items: 1,
            deliveryDate: "2025-03-28", paymentTerms: "N030", createdBy: "T. Müller",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "Initial creation", icon: "sap-icon://create" }, { step: "Line Manager", status: "Approved", comment: "Approved within budget", icon: "sap-icon://accept" }, { step: "Finance Controller", status: "Approved", comment: "Verified against cost center", icon: "sap-icon://accept" }],
            lineItems: [
              li("10","CH-5501","Chemical Compound X7", 100,"KG",78,"2025-03-28","Hazardous material", [dl("2025-03-28","08:00",100,"Full delivery")])
            ]
          },
          {
            id: "PO-2025-0149", vendor: "Bosch GmbH", vendorId: "1003", purchasingGroup: "003 — Facilities",
            amount: 23400, currency: "EUR", status: "Pending Approval", date: "2025-03-10", items: 6,
            deliveryDate: "2025-04-20", paymentTerms: "N060", createdBy: "S. Braun",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "PO submitted", icon: "sap-icon://create" }, { step: "Line Manager", status: "Pending Approval", comment: "Under review", icon: "sap-icon://person-placeholder" }],
            lineItems: [
              li("10","HW-3010","Power Drill 18V",      20,"EA", 320,"2025-04-20","",  []),
              li("20","HW-3011","Drill Bit Set",        20,"PC",  45,"2025-04-20","",  []),
              li("30","HW-3020","Angle Grinder 125mm",  10,"EA", 280,"2025-04-20","",  []),
              li("40","HW-4001","Safety Helmet EN397",  50,"EA",  38,"2025-04-20","",  []),
              li("50","HW-4002","Safety Gloves",       100,"PC",  12,"2025-04-20","",  []),
              li("60","HW-4010","Tool Cabinet",          1,"EA",4200,"2025-04-22","Lock included", [])
            ]
          },
          {
            id: "PO-2025-0148", vendor: "Daimler AG", vendorId: "1004", purchasingGroup: "001 — Central",
            amount: 156000, currency: "EUR", status: "Closed", date: "2025-03-01", items: 8,
            deliveryDate: "2025-03-15", paymentTerms: "N030", createdBy: "F. Fischer",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "High-value PO", icon: "sap-icon://create" }, { step: "Director", status: "Approved", comment: "Strategic purchase approved", icon: "sap-icon://accept" }, { step: "Goods Receipt", status: "Approved", comment: "All items received", icon: "sap-icon://accept" }],
            lineItems: [
              li("10","VH-1001","Fleet Vehicle — Sedan",   2,"EA",45000,"2025-03-15","Blue metallic", []),
              li("20","VH-1002","Fleet Vehicle — Van",     1,"EA",38000,"2025-03-15","White",         []),
              li("30","VH-2001","GPS Tracking Unit",       3,"EA",  800,"2025-03-15","",              []),
              li("40","VH-2002","Fleet Management License",3,"EA",  600,"2025-03-15","Annual",        [])
            ]
          },
          {
            id: "PO-2025-0147", vendor: "Henkel AG", vendorId: "1005", purchasingGroup: "003 — Facilities",
            amount: 3200, currency: "EUR", status: "Rejected", date: "2025-03-05", items: 3,
            deliveryDate: "2025-03-22", paymentTerms: "N030", createdBy: "A. Koch",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "PO submitted", icon: "sap-icon://create" }, { step: "Line Manager", status: "Rejected", comment: "Budget exceeded for Q1", icon: "sap-icon://decline" }],
            lineItems: [
              li("10","CL-2001","Industrial Cleaner 25L",  10,"EA",180,"2025-03-22","",  []),
              li("20","CL-2002","Disinfectant Spray 5L",   20,"EA", 65,"2025-03-22","",  []),
              li("30","CL-2010","Cleaning Cloth Pack",     50,"PC",  9,"2025-03-22","",  [])
            ]
          },
          {
            id: "PO-2025-0146", vendor: "Schneider Electric", vendorId: "1006", purchasingGroup: "002 — IT",
            amount: 18750, currency: "EUR", status: "Approved", date: "2025-03-08", items: 5,
            deliveryDate: "2025-04-15", paymentTerms: "N030", createdBy: "K. Weber",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "PO created", icon: "sap-icon://create" }, { step: "Line Manager", status: "Approved", comment: "Approved", icon: "sap-icon://accept" }],
            lineItems: [
              li("10","EL-5001","UPS 3000VA",            2,"EA",2400,"2025-04-15","",  []),
              li("20","EL-5002","Network Switch 48-port", 2,"EA",3200,"2025-04-15","",  []),
              li("30","EL-5003","Patch Panel 48-port",    4,"EA", 280,"2025-04-15","",  []),
              li("40","EL-5004","Cat6 Cable 100m",        8,"EA",  95,"2025-04-15","",  []),
              li("50","EL-5010","Rack Cabinet 42U",       1,"EA",6500,"2025-04-18","With cable management", [])
            ]
          },
          {
            id: "PO-2025-0145", vendor: "ABB Ltd.", vendorId: "1007", purchasingGroup: "001 — Central",
            amount: 62000, currency: "EUR", status: "Pending Approval", date: "2025-03-07", items: 3,
            deliveryDate: "2025-05-01", paymentTerms: "N060", createdBy: "T. Müller",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "High-value item", icon: "sap-icon://create" }, { step: "Director", status: "Pending Approval", comment: "Requires director approval", icon: "sap-icon://person-placeholder" }],
            lineItems: [
              li("10","RB-0101","Industrial Robot Arm",    1,"EA",48000,"2025-05-01","6-axis, payload 10kg", []),
              li("20","RB-0102","Robot Controller Unit",   1,"EA",11000,"2025-05-01","",  []),
              li("30","RB-0103","Integration Software",    1,"EA", 3000,"2025-05-01","License + support",    [])
            ]
          },
          {
            id: "PO-2025-0144", vendor: "Siemens AG", vendorId: "1000", purchasingGroup: "001 — Central",
            amount: 9100, currency: "EUR", status: "Open", date: "2025-03-06", items: 2,
            deliveryDate: "2025-04-01", paymentTerms: "N030", createdBy: "M. Schneider",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "Draft", icon: "sap-icon://create" }],
            lineItems: [
              li("10","EL-1100","PLC Module S7-1500",  3,"EA",2400,"2025-04-01","", []),
              li("20","EL-1101","I/O Module DI 32x24V",4,"EA", 475,"2025-04-01","", [])
            ]
          },
          {
            id: "PO-2025-0143", vendor: "SAP SE", vendorId: "1001", purchasingGroup: "002 — IT",
            amount: 55000, currency: "EUR", status: "Approved", date: "2025-02-28", items: 1,
            deliveryDate: "2025-04-30", paymentTerms: "N030", createdBy: "K. Weber",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "Annual license renewal", icon: "sap-icon://create" }, { step: "IT Manager", status: "Approved", comment: "Mandatory renewal", icon: "sap-icon://accept" }, { step: "Finance", status: "Approved", comment: "Budget allocated", icon: "sap-icon://accept" }],
            lineItems: [
              li("10","SW-4050","SAP BTP Subscription", 1,"EA",55000,"2025-04-30","12-month plan", [])
            ]
          },
          {
            id: "PO-2025-0142", vendor: "Bosch GmbH", vendorId: "1003", purchasingGroup: "003 — Facilities",
            amount: 4400, currency: "EUR", status: "Closed", date: "2025-02-20", items: 2,
            deliveryDate: "2025-03-10", paymentTerms: "N030", createdBy: "S. Braun",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "Facilities request", icon: "sap-icon://create" }, { step: "Line Manager", status: "Approved", comment: "Approved", icon: "sap-icon://accept" }, { step: "Goods Receipt", status: "Approved", comment: "Received", icon: "sap-icon://accept" }],
            lineItems: [
              li("10","HW-9001","HVAC Filter Set",  4,"EA",380,"2025-03-10","Replace quarterly", []),
              li("20","HW-9002","Air Purifier",     2,"EA",1520,"2025-03-10","",                  [])
            ]
          },
          {
            id: "PO-2025-0141", vendor: "BASF SE", vendorId: "1002", purchasingGroup: "001 — Central",
            amount: 31200, currency: "EUR", status: "Open", date: "2025-02-15", items: 7,
            deliveryDate: "2025-04-25", paymentTerms: "N060", createdBy: "F. Fischer",
            approvalHistory: [{ step: "Created", status: "Approved", comment: "Q2 materials order", icon: "sap-icon://create" }],
            lineItems: [
              li("10","CH-6001","Polymer Resin Type-A",200,"KG", 48,"2025-04-25","",  []),
              li("20","CH-6002","Hardener Component",   80,"KG", 72,"2025-04-25","",  []),
              li("30","CH-6003","Solvent IPA 99%",      50,"LT", 35,"2025-04-25","Flammable", []),
              li("40","CH-6004","Adhesive B700",        30,"KG",120,"2025-04-25","",  []),
              li("50","CH-6010","Storage Container 50L",10,"EA",210,"2025-04-25","",  []),
              li("60","CH-6011","Safety Drum Lid",      10,"EA", 45,"2025-04-25","",  []),
              li("70","CH-6020","PPE Kit",               5,"EA",380,"2025-04-25","Full set",  [])
            ]
          }
        ],
        selectedPO: null,
        selectedLineItem: null,
        editPO: null,
        confirmedPOId: "",
        newLineItem: { materialId: "", description: "", qty: 1, uom: "EA", unitPrice: 0, deliveryDate: "", deliveryTime: "", comment: "" },
        newDelivery:  { date: "", time: "", qty: 1, comment: "" },
        scheduleCanSave: false,
        vendors: [
          { key: "1000", text: "Siemens AG" },
          { key: "1001", text: "SAP SE" },
          { key: "1002", text: "BASF SE" },
          { key: "1003", text: "Bosch GmbH" },
          { key: "1004", text: "Daimler AG" },
          { key: "1005", text: "Henkel AG" },
          { key: "1006", text: "Schneider Electric" },
          { key: "1007", text: "ABB Ltd." }
        ],
        newPO: {
          vendorId: "1000",
          deliveryDate: "2025-04-15",
          items: [
            { materialId: "MAT-1042", description: "Industrial Pressure Sensor", qty: 10, uom: "EA", unitPrice: 485, total: 4850 },
            { materialId: "MAT-2118", description: "Control Unit Type-B", qty: 2, uom: "PC", unitPrice: 1200, total: 2400 },
            { materialId: "MAT-3300", description: "Mounting Bracket Set", qty: 20, uom: "PC", unitPrice: 35, total: 700 }
          ]
        }
      };
      this.getView().setModel(new JSONModel(data), "po");
    },

    onNavBack() { this.byId("poNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onCreatePress() { this.byId("poNav").to(this.byId("poCreatePage")); },

    onPORowPress(event) {
      const ctx = event.getSource().getBindingContext("po");
      const model = this.getView().getModel("po");
      const po = ctx.getObject();
      model.setProperty("/selectedPO", po);
      this._selectedPOPath = ctx.getPath();
      this.byId("poNewLineItemBtn").setEnabled(true);
      this.byId("poLineItemsTitle").setText("Line Items — " + po.id + " · " + po.vendor);
    },

    onViewPODetail(event) {
      if (event.stopPropagation) event.stopPropagation();
      const ctx = event.getSource().getBindingContext("po");
      const model = this.getView().getModel("po");
      const po = ctx.getObject();
      model.setProperty("/selectedPO", po);
      this._selectedPOPath = ctx.getPath();
      const isPending = po.status === "Pending Approval";
      this.byId("poApproveBtn").setVisible(isPending);
      this.byId("poRejectBtn").setVisible(isPending);
      this.byId("poNav").to(this.byId("poDetailPage"));
    },

    onNewLineItem() {
      const model = this.getView().getModel("po");
      model.setProperty("/newLineItem", { materialId: "", description: "", qty: 1, uom: "EA", unitPrice: 0, deliveryDate: "", deliveryTime: "", comment: "" });
      if (!this._newLineItemDialog) {
        this._newLineItemDialog = sap.ui.xmlfragment(
          this.getView().getId(),
          "ui5.fira.demos.view.apps.po.NewLineItemDialog",
          this
        );
        this.getView().addDependent(this._newLineItemDialog);
      }
      this._newLineItemDialog.open();
    },

    onCancelLineItem() {
      this._newLineItemDialog.close();
    },

    onSaveLineItem() {
      const model = this.getView().getModel("po");
      const item = model.getProperty("/newLineItem");

      if (!item.materialId || !item.description || !item.qty || !item.unitPrice) {
        MessageToast.show("Please fill in all required fields");
        return;
      }

      const selectedPO = model.getProperty("/selectedPO");
      const lineItems = selectedPO.lineItems || [];
      const nextId = String((lineItems.length + 1) * 10);

      const newItem = {
        id: nextId,
        materialId: item.materialId,
        description: item.description,
        qty: parseFloat(item.qty) || 1,
        uom: item.uom,
        unitPrice: parseFloat(item.unitPrice) || 0,
        total: (parseFloat(item.qty) || 1) * (parseFloat(item.unitPrice) || 0),
        deliveryDate: item.deliveryDate,
        deliveryTime: item.deliveryTime,
        comment: item.comment,
        deliveries: []
      };

      lineItems.push(newItem);
      model.setProperty("/selectedPO/lineItems", lineItems);

      if (this._selectedPOPath) {
        model.setProperty(this._selectedPOPath + "/lineItems", lineItems);
      }

      model.refresh(true);
      this._newLineItemDialog.close();
      MessageToast.show("Line item " + nextId + " added");
    },

    onLineItemDetailPress(event) {
      if (event.stopPropagation) event.stopPropagation();
      const ctx = event.getSource().getBindingContext("po");
      const model = this.getView().getModel("po");
      model.setProperty("/selectedLineItem", ctx.getObject());
      this._selectedLineItemPath = ctx.getPath();
      this.byId("poNav").to(this.byId("poLineItemDetailPage"));
    },

    onNewDelivery() {
      const model = this.getView().getModel("po");
      model.setProperty("/newDelivery", { date: "", time: "", qty: 1, comment: "" });
      this.byId("poNav").to(this.byId("poDeliveryCreatePage"));
    },

    onScheduleLineFieldChange() {
      this._checkScheduleSaveEnabled();
    },

    onScheduleLineRowPress(event) {
      const ctx = event.getSource().getBindingContext("po");
      if (!ctx) return;
      const model = this.getView().getModel("po");
      if (model.getProperty(ctx.getPath() + "/isEditing")) return;
      model.setProperty(ctx.getPath() + "/isEditing", true);
      this._checkScheduleSaveEnabled();
    },

    _checkScheduleSaveEnabled() {
      const model = this.getView().getModel("po");
      const lines = model.getProperty("/selectedLineItem/scheduleLines") || [];
      const allValid = lines.length > 0 && lines.every(l => l.date && l.qty > 0);
      model.setProperty("/scheduleCanSave", allValid);
    },

    onAddScheduleLine() {
      const model = this.getView().getModel("po");
      const lines = model.getProperty("/selectedLineItem/scheduleLines") || [];
      lines.push({ date: "", time: "", qty: 1, comment: "", isEditing: true });
      model.setProperty("/selectedLineItem/scheduleLines", lines);
      if (this._selectedLineItemPath) {
        model.setProperty(this._selectedLineItemPath + "/scheduleLines", lines);
      }
      model.refresh(true);
      this._checkScheduleSaveEnabled();
    },

    onDeleteScheduleLine(event) {
      const ctx = event.getSource().getBindingContext("po");
      const model = this.getView().getModel("po");
      const pathParts = ctx.getPath().split("/");
      const idx = parseInt(pathParts[pathParts.length - 1], 10);
      const lines = model.getProperty("/selectedLineItem/scheduleLines");
      lines.splice(idx, 1);
      model.setProperty("/selectedLineItem/scheduleLines", lines);
      if (this._selectedLineItemPath) {
        model.setProperty(this._selectedLineItemPath + "/scheduleLines", lines);
      }
      model.refresh(true);
      this._checkScheduleSaveEnabled();
    },

    onSaveScheduleLines() {
      const model = this.getView().getModel("po");
      const lines = model.getProperty("/selectedLineItem/scheduleLines") || [];
      const invalid = lines.some(l => !l.date || !l.qty);
      if (invalid) {
        MessageToast.show("Please fill in Date and Quantity for all rows");
        return;
      }
      lines.forEach(l => { l.isEditing = false; });
      model.setProperty("/selectedLineItem/scheduleLines", lines);
      if (this._selectedLineItemPath) {
        model.setProperty(this._selectedLineItemPath + "/scheduleLines", lines);
      }
      model.refresh(true);
      model.setProperty("/scheduleCanSave", false);
      MessageToast.show("Schedule lines saved (" + lines.length + " rows)");
    },

    onSaveDelivery() {
      const model = this.getView().getModel("po");
      const entry = model.getProperty("/newDelivery");

      if (!entry.date || !entry.qty) {
        MessageToast.show("Date and quantity are required");
        return;
      }

      const selectedLineItem = model.getProperty("/selectedLineItem");
      const deliveries = selectedLineItem.deliveries || [];

      deliveries.push({
        date: entry.date,
        time: entry.time,
        qty: parseFloat(entry.qty) || 1,
        comment: entry.comment
      });

      model.setProperty("/selectedLineItem/deliveries", deliveries);

      if (this._selectedLineItemPath) {
        model.setProperty(this._selectedLineItemPath + "/deliveries", deliveries);
      }

      model.refresh(true);
      MessageToast.show("Delivery entry saved");
      this.byId("poNav").back();
    },

    onEditPOPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("po");
      const model = this.getView().getModel("po");
      model.setProperty("/editPO", Object.assign({}, ctx.getObject()));
      this._editPOPath = ctx.getPath();
      this.byId("poNav").to(this.byId("poEditPage"));
    },

    onDeletePOPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("po");
      const po = ctx.getObject();
      MessageBox.confirm(`Delete purchase order ${po.id} — ${po.vendor}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("po");
          const orders = model.getProperty("/purchaseOrders");
          const idx = orders.indexOf(po);
          if (idx !== -1) {
            orders.splice(idx, 1);
            model.setProperty("/purchaseOrders", orders);
            model.refresh(true);
          }
          this.toast("Purchase order deleted");
        }
      });
    },

    onSavePO() {
      const model = this.getView().getModel("po");
      const editPO = model.getProperty("/editPO");
      const status = this.byId("editPoStatus").getSelectedKey();
      const deliveryDate = this.byId("editPoDeliveryDate").getValue();
      editPO.status = status;
      editPO.deliveryDate = deliveryDate;
      if (this._editPOPath) {
        model.setProperty(this._editPOPath + "/status", status);
        model.setProperty(this._editPOPath + "/deliveryDate", deliveryDate);
        model.refresh(true);
      }
      this.toast("Purchase order updated");
      this.byId("poNav").back();
    },

    onSearch(event) {
      const query = event.getParameter("query");
      const binding = this.byId("poTable").getBinding("items");
      if (!query) { binding.filter([]); return; }
      binding.filter([new Filter({ filters: [new Filter("id", FilterOperator.Contains, query), new Filter("vendor", FilterOperator.Contains, query)], and: false })]);
    },

    onFilterChange(event) {
      const key = event.getParameter("item").getKey();
      const binding = this.byId("poTable").getBinding("items");
      binding.filter(key === "all" ? [] : [new Filter("status", FilterOperator.EQ, key)]);
    },

    onAddLineItem() {
      const model = this.getView().getModel("po");
      const items = model.getProperty("/newPO/items");
      items.push({ materialId: "", description: "", qty: 1, uom: "EA", unitPrice: 0, total: 0 });
      model.setProperty("/newPO/items", items);
    },

    onSubmitPO() {
      const model = this.getView().getModel("po");
      const orders = model.getProperty("/purchaseOrders");
      const newId = `PO-2025-${String(orders.length + 153).padStart(4, "0")}`;
      model.setProperty("/confirmedPOId", `Purchase Order ${newId} created successfully`);
      orders.unshift({
        id: newId,
        vendor: "Siemens AG",
        vendorId: "1000",
        purchasingGroup: "001 — Central",
        amount: 7950,
        currency: "EUR",
        status: "Pending Approval",
        date: new Date().toISOString().split("T")[0],
        items: 3,
        deliveryDate: "2025-04-15",
        paymentTerms: "N030",
        createdBy: "Current User",
        approvalHistory: [{ step: "Created", status: "Pending Approval", comment: "PO submitted for approval", icon: "sap-icon://create" }]
      });
      model.setProperty("/purchaseOrders", orders);
      model.refresh(true);
      this.byId("poNav").to(this.byId("poConfirmPage"));
    },

    onApprovePO() {
      MessageBox.confirm("Approve this purchase order?", {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("po");
          model.setProperty("/selectedPO/status", "Approved");
          if (this._selectedPOPath) {
            model.setProperty(this._selectedPOPath + "/status", "Approved");
            model.refresh(true);
          }
          this.toast("Purchase order approved");
          this.byId("poNav").back();
        }
      });
    },

    onRejectPO() {
      MessageBox.confirm("Reject this purchase order?", {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("po");
          model.setProperty("/selectedPO/status", "Rejected");
          if (this._selectedPOPath) {
            model.setProperty(this._selectedPOPath + "/status", "Rejected");
            model.refresh(true);
          }
          this.toast("Purchase order rejected");
          this.byId("poNav").back();
        }
      });
    },

    onCreateAnother() { this.byId("poNav").backToPage(this.byId("poCreatePage")); },
    onBackToList() { this.byId("poNav").backToPage(this.byId("poListPage")); },
    onPrint() { this.toast("Sending to printer..."); },

    formatAmountState(amount) {
      return amount > 50000 ? "Warning" : "None";
    },

    formatCurrency(value) {
      if (!value) return "";
      return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
    },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatStatusState(status) {
      const map = { "Open": "None", "Pending Approval": "Warning", "Approved": "Success", "Closed": "None", "Rejected": "Error" };
      return map[status] || "None";
    }

  });
});
