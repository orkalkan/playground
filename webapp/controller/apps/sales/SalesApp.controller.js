sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/m/MessageBox"
], (BaseController, JSONModel, Filter, FilterOperator, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.sales.SalesApp", {

    onInit() {
      const data = {
        orders: [
          { id: "SO-2025-10553", customer: "Müller Automotive GmbH", customerId: "C-10042", orderType: "Standard Order", mainMaterial: "FG-4521 Motor 22kW", netValue: 28400, currency: "EUR", status: "In Progress", requestedDate: "2025-04-15" },
          { id: "SO-2025-10552", customer: "Schulz Maschinenbau AG", customerId: "C-10018", orderType: "Rush Order", mainMaterial: "FG-2210 Control Cabinet", netValue: 7200, currency: "EUR", status: "New", requestedDate: "2025-03-22" },
          { id: "SO-2025-10551", customer: "Wagner Industries KG", customerId: "C-10067", orderType: "Standard Order", mainMaterial: "FG-8812 Pressure Valve", netValue: 14600, currency: "EUR", status: "Delivered", requestedDate: "2025-03-10" },
          { id: "SO-2025-10550", customer: "Bauer Elektrotechnik", customerId: "C-10091", orderType: "Standard Order", mainMaterial: "FG-3301 Power Unit", netValue: 52000, currency: "EUR", status: "On Hold", requestedDate: "2025-04-30" },
          { id: "SO-2025-10549", customer: "Kramer Logistik GmbH", customerId: "C-10055", orderType: "Standard Order", mainMaterial: "FG-0089 Cable Harness", netValue: 3800, currency: "EUR", status: "Delivered", requestedDate: "2025-03-05" },
          { id: "SO-2025-10548", customer: "Fischer Components Ltd", customerId: "C-10033", orderType: "Standard Order", mainMaterial: "FG-7700 Sensor Array", netValue: 9100, currency: "EUR", status: "Cancelled", requestedDate: "2025-02-28" },
          { id: "SO-2025-10547", customer: "Hoffmann Group AG", customerId: "C-10021", orderType: "Standard Order", mainMaterial: "FG-5512 Pump Unit", netValue: 18500, currency: "EUR", status: "In Progress", requestedDate: "2025-04-20" },
          { id: "SO-2025-10546", customer: "Meier Antriebstechnik", customerId: "C-10078", orderType: "Rush Order", mainMaterial: "FG-4521 Motor 22kW", netValue: 46000, currency: "EUR", status: "New", requestedDate: "2025-04-05" },
          { id: "SO-2025-10545", customer: "Richter Systemtechnik", customerId: "C-10099", orderType: "Standard Order", mainMaterial: "FG-9901 Valve Assembly", netValue: 6200, currency: "EUR", status: "Delivered", requestedDate: "2025-02-20" },
          { id: "SO-2025-10544", customer: "Müller Automotive GmbH", customerId: "C-10042", orderType: "Standard Order", mainMaterial: "FG-2210 Control Cabinet", netValue: 21600, currency: "EUR", status: "In Progress", requestedDate: "2025-05-10" },
          { id: "SO-2025-10543", customer: "Wagner Industries KG", customerId: "C-10067", orderType: "Standard Order", mainMaterial: "FG-3301 Power Unit", netValue: 78000, currency: "EUR", status: "On Hold", requestedDate: "2025-05-30" },
          { id: "SO-2025-10542", customer: "Schulz Maschinenbau AG", customerId: "C-10018", orderType: "Standard Order", mainMaterial: "FG-0089 Cable Harness", netValue: 5400, currency: "EUR", status: "Delivered", requestedDate: "2025-02-15" }
        ],
        customers: [
          { id: "C-10042", name: "Müller Automotive GmbH" },
          { id: "C-10018", name: "Schulz Maschinenbau AG" },
          { id: "C-10067", name: "Wagner Industries KG" },
          { id: "C-10091", name: "Bauer Elektrotechnik" },
          { id: "C-10055", name: "Kramer Logistik GmbH" },
          { id: "C-10021", name: "Hoffmann Group AG" },
          { id: "C-10078", name: "Meier Antriebstechnik" },
          { id: "C-10099", name: "Richter Systemtechnik" }
        ],
        newOrder: {
          items: [
            { materialId: "FG-4521", description: "Industrial Motor 22kW", qty: 4, uom: "EA", price: 4600, plant: "1000" },
            { materialId: "FG-2210", description: "Control Cabinet Type-3", qty: 2, uom: "PC", price: 3600, plant: "1000" }
          ]
        },
        selectedOrder: null,
        confirmedOrderId: "",
        newOrderX: { customerId: "", deliveryDate: "" }
      };
      this.getView().setModel(new JSONModel(data), "sales");
    },

    onNavBack() { this.byId("salesNav").back(); },
    onNavBackToLaunchpad() { this.navBackToLaunchpad(); },

    onNewOrderPress() {
      this.getView().getModel("sales").setProperty("/newOrderX", { customerId: "", deliveryDate: "" });
      this.byId("salesNav").to(this.byId("salesCreatePage"));
    },

    onOrderPress(event) {
      const ctx = event.getSource().getBindingContext("sales");
      const model = this.getView().getModel("sales");
      model.setProperty("/selectedOrder", ctx.getObject());
      this._selectedOrderPath = ctx.getPath();
      this.byId("salesNav").to(this.byId("salesDetailPage"));
    },

    onEditSelectedOrderPress() {
      this.byId("salesNav").to(this.byId("salesCreatePage"));
    },

    onEditOrderPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("sales");
      const model = this.getView().getModel("sales");
      model.setProperty("/selectedOrder", ctx.getObject());
      this._selectedOrderPath = ctx.getPath();
      this.byId("salesNav").to(this.byId("salesDetailPage"));
    },

    onDeleteSelectedOrderPress() {
      const model = this.getView().getModel("sales");
      const order = model.getProperty("/selectedOrder");
      MessageBox.confirm(`Delete sales order ${order.id} for ${order.customer}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const orders = model.getProperty("/orders");
          const idx = orders.indexOf(order);
          if (idx !== -1) {
            orders.splice(idx, 1);
            model.setProperty("/orders", orders);
            model.refresh(true);
          }
          this.toast("Sales order deleted");
          this.byId("salesNav").backToPage(this.byId("salesListPage"));
        }
      });
    },

    onDeleteOrderPress(event) {
      event.stopPropagation ? event.stopPropagation() : null;
      const ctx = event.getSource().getBindingContext("sales");
      const order = ctx.getObject();
      MessageBox.confirm(`Delete sales order ${order.id} for ${order.customer}?`, {
        onClose: (action) => {
          if (action !== MessageBox.Action.OK) return;
          const model = this.getView().getModel("sales");
          const orders = model.getProperty("/orders");
          const idx = orders.indexOf(order);
          if (idx !== -1) {
            orders.splice(idx, 1);
            model.setProperty("/orders", orders);
            model.refresh(true);
          }
          this.toast("Sales order deleted");
        }
      });
    },

    onSearch(event) {
      const query = event.getParameter("query");
      const binding = this.byId("salesTable").getBinding("items");
      binding.filter(!query ? [] : [new Filter({ filters: [new Filter("id", FilterOperator.Contains, query), new Filter("customer", FilterOperator.Contains, query)], and: false })]);
    },

    onStatusFilterChange(event) {
      const key = event.getParameter("selectedItem").getKey();
      const binding = this.byId("salesTable").getBinding("items");
      binding.filter(key === "all" ? [] : [new Filter("status", FilterOperator.EQ, key)]);
    },

    onAddItem() {
      const model = this.getView().getModel("sales");
      const items = model.getProperty("/newOrder/items");
      items.push({ materialId: "", description: "", qty: 1, uom: "EA", price: 0, plant: "1000" });
      model.setProperty("/newOrder/items", items);
    },

    onReviewPress() { this.byId("salesNav").to(this.byId("salesReviewPage")); },

    onConfirmOrder() {
      const model = this.getView().getModel("sales");
      const orders = model.getProperty("/orders");
      const newId = `SO-2025-${Math.floor(Math.random() * 90000) + 10000}`;
      model.setProperty("/confirmedOrderId", `Order Number: ${newId}`);
      orders.unshift({
        id: newId,
        customer: "Müller Automotive GmbH",
        customerId: "C-10042",
        orderType: "Standard Order",
        mainMaterial: "FG-4521 Motor 22kW",
        netValue: 28400,
        currency: "EUR",
        status: "New",
        requestedDate: "2025-04-15"
      });
      model.setProperty("/orders", orders);
      model.refresh(true);
      this.byId("salesNav").to(this.byId("salesConfirmPage"));
    },

    onNewOrderAfterConfirm() { this.byId("salesNav").backToPage(this.byId("salesCreatePage")); },
    onBackToList() { this.byId("salesNav").backToPage(this.byId("salesListPage")); },
    onPrint() { this.toast("Printing order confirmation..."); },

    formatDate(dateStr) {
      if (!dateStr) return "";
      return new Date(dateStr).toLocaleDateString("de-DE");
    },

    formatStatusState(status) {
      const map = { "New": "None", "In Progress": "Warning", "Delivered": "Success", "On Hold": "Error", "Cancelled": "None" };
      return map[status] || "None";
    }

  });
});
