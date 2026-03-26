sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.po.POApp", {

    onInit() {
      const data = {
        purchaseOrders: [
          { id: "PO-2025-0152", vendor: "Siemens AG", vendorId: "1000", purchasingGroup: "001 — Central", amount: 48500, currency: "EUR", status: "Pending Approval", date: "2025-03-15", items: 4, deliveryDate: "2025-04-10", paymentTerms: "N030", createdBy: "M. Schneider", approvalHistory: [{ step: "Created", status: "Approved", comment: "PO created and forwarded", icon: "sap-icon://create" }, { step: "Line Manager", status: "Pending Approval", comment: "Awaiting approval", icon: "sap-icon://person-placeholder" }] },
          { id: "PO-2025-0151", vendor: "SAP SE", vendorId: "1001", purchasingGroup: "002 — IT", amount: 12200, currency: "EUR", status: "Open", date: "2025-03-14", items: 2, deliveryDate: "2025-04-05", paymentTerms: "N014", createdBy: "K. Weber", approvalHistory: [{ step: "Created", status: "Approved", comment: "Draft saved", icon: "sap-icon://create" }] },
          { id: "PO-2025-0150", vendor: "BASF SE", vendorId: "1002", purchasingGroup: "001 — Central", amount: 7800, currency: "EUR", status: "Approved", date: "2025-03-12", items: 1, deliveryDate: "2025-03-28", paymentTerms: "N030", createdBy: "T. Müller", approvalHistory: [{ step: "Created", status: "Approved", comment: "Initial creation", icon: "sap-icon://create" }, { step: "Line Manager", status: "Approved", comment: "Approved within budget", icon: "sap-icon://accept" }, { step: "Finance Controller", status: "Approved", comment: "Verified against cost center", icon: "sap-icon://accept" }] },
          { id: "PO-2025-0149", vendor: "Bosch GmbH", vendorId: "1003", purchasingGroup: "003 — Facilities", amount: 23400, currency: "EUR", status: "Pending Approval", date: "2025-03-10", items: 6, deliveryDate: "2025-04-20", paymentTerms: "N060", createdBy: "S. Braun", approvalHistory: [{ step: "Created", status: "Approved", comment: "PO submitted", icon: "sap-icon://create" }, { step: "Line Manager", status: "Pending Approval", comment: "Under review", icon: "sap-icon://person-placeholder" }] },
          { id: "PO-2025-0148", vendor: "Daimler AG", vendorId: "1004", purchasingGroup: "001 — Central", amount: 156000, currency: "EUR", status: "Closed", date: "2025-03-01", items: 8, deliveryDate: "2025-03-15", paymentTerms: "N030", createdBy: "F. Fischer", approvalHistory: [{ step: "Created", status: "Approved", comment: "High-value PO", icon: "sap-icon://create" }, { step: "Director", status: "Approved", comment: "Strategic purchase approved", icon: "sap-icon://accept" }, { step: "Goods Receipt", status: "Approved", comment: "All items received", icon: "sap-icon://accept" }] },
          { id: "PO-2025-0147", vendor: "Henkel AG", vendorId: "1005", purchasingGroup: "003 — Facilities", amount: 3200, currency: "EUR", status: "Rejected", date: "2025-03-05", items: 3, deliveryDate: "2025-03-22", paymentTerms: "N030", createdBy: "A. Koch", approvalHistory: [{ step: "Created", status: "Approved", comment: "PO submitted", icon: "sap-icon://create" }, { step: "Line Manager", status: "Rejected", comment: "Budget exceeded for Q1", icon: "sap-icon://decline" }] },
          { id: "PO-2025-0146", vendor: "Schneider Electric", vendorId: "1006", purchasingGroup: "002 — IT", amount: 18750, currency: "EUR", status: "Approved", date: "2025-03-08", items: 5, deliveryDate: "2025-04-15", paymentTerms: "N030", createdBy: "K. Weber", approvalHistory: [{ step: "Created", status: "Approved", comment: "PO created", icon: "sap-icon://create" }, { step: "Line Manager", status: "Approved", comment: "Approved", icon: "sap-icon://accept" }] },
          { id: "PO-2025-0145", vendor: "ABB Ltd.", vendorId: "1007", purchasingGroup: "001 — Central", amount: 62000, currency: "EUR", status: "Pending Approval", date: "2025-03-07", items: 3, deliveryDate: "2025-05-01", paymentTerms: "N060", createdBy: "T. Müller", approvalHistory: [{ step: "Created", status: "Approved", comment: "High-value item", icon: "sap-icon://create" }, { step: "Director", status: "Pending Approval", comment: "Requires director approval", icon: "sap-icon://person-placeholder" }] },
          { id: "PO-2025-0144", vendor: "Siemens AG", vendorId: "1000", purchasingGroup: "001 — Central", amount: 9100, currency: "EUR", status: "Open", date: "2025-03-06", items: 2, deliveryDate: "2025-04-01", paymentTerms: "N030", createdBy: "M. Schneider", approvalHistory: [{ step: "Created", status: "Approved", comment: "Draft", icon: "sap-icon://create" }] },
          { id: "PO-2025-0143", vendor: "SAP SE", vendorId: "1001", purchasingGroup: "002 — IT", amount: 55000, currency: "EUR", status: "Approved", date: "2025-02-28", items: 1, deliveryDate: "2025-04-30", paymentTerms: "N030", createdBy: "K. Weber", approvalHistory: [{ step: "Created", status: "Approved", comment: "Annual license renewal", icon: "sap-icon://create" }, { step: "IT Manager", status: "Approved", comment: "Mandatory renewal", icon: "sap-icon://accept" }, { step: "Finance", status: "Approved", comment: "Budget allocated", icon: "sap-icon://accept" }] },
          { id: "PO-2025-0142", vendor: "Bosch GmbH", vendorId: "1003", purchasingGroup: "003 — Facilities", amount: 4400, currency: "EUR", status: "Closed", date: "2025-02-20", items: 2, deliveryDate: "2025-03-10", paymentTerms: "N030", createdBy: "S. Braun", approvalHistory: [{ step: "Created", status: "Approved", comment: "Facilities request", icon: "sap-icon://create" }, { step: "Line Manager", status: "Approved", comment: "Approved", icon: "sap-icon://accept" }, { step: "Goods Receipt", status: "Approved", comment: "Received", icon: "sap-icon://accept" }] },
          { id: "PO-2025-0141", vendor: "BASF SE", vendorId: "1002", purchasingGroup: "001 — Central", amount: 31200, currency: "EUR", status: "Open", date: "2025-02-15", items: 7, deliveryDate: "2025-04-25", paymentTerms: "N060", createdBy: "F. Fischer", approvalHistory: [{ step: "Created", status: "Approved", comment: "Q2 materials order", icon: "sap-icon://create" }] }
        ],
        selectedPO: null,
        editPO: null,
        confirmedPOId: "",
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
      model.setProperty("/selectedPO", ctx.getObject());
      this._selectedPOPath = ctx.getPath();
      const isPending = ctx.getProperty("status") === "Pending Approval";
      this.byId("poApproveBtn").setVisible(isPending);
      this.byId("poRejectBtn").setVisible(isPending);
      this.byId("poNav").to(this.byId("poDetailPage"));
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
