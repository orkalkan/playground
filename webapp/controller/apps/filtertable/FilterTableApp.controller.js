sap.ui.define([
  "ui5/fira/demos/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageBox"
], (BaseController, JSONModel, MessageBox) => {
  return BaseController.extend("ui5.fira.demos.controller.apps.filtertable.FilterTableApp", {

    onInit() {
      const orders = [
        { orderId: "PO-2025-0001", supplier: "Alpha Components GmbH",   category: "Materials",  requestor: "Anna Weber",     amount: 12450.00, status: "Approved",  orderDate: "2025-01-05" },
        { orderId: "PO-2025-0002", supplier: "Beta Industrial Supply",   category: "Equipment",  requestor: "Ben Schulz",     amount: 87300.50, status: "Pending",   orderDate: "2025-01-08" },
        { orderId: "PO-2025-0003", supplier: "Gamma Tech Solutions",     category: "IT",         requestor: "Clara Fischer",  amount: 5800.00,  status: "Open",      orderDate: "2025-01-12" },
        { orderId: "PO-2025-0004", supplier: "Delta Logistics AG",       category: "Services",   requestor: "David Müller",   amount: 3200.00,  status: "Approved",  orderDate: "2025-01-15" },
        { orderId: "PO-2025-0005", supplier: "Epsilon Materials Ltd",    category: "Materials",  requestor: "Eva Braun",      amount: 22100.75, status: "Rejected",  orderDate: "2025-01-18" },
        { orderId: "PO-2025-0006", supplier: "Zeta Office Supplies",     category: "Facilities", requestor: "Felix Keller",   amount: 1450.00,  status: "Open",      orderDate: "2025-01-22" },
        { orderId: "PO-2025-0007", supplier: "Eta Electronics Corp",     category: "IT",         requestor: "Greta Hoffmann", amount: 34900.00, status: "Pending",   orderDate: "2025-01-25" },
        { orderId: "PO-2025-0008", supplier: "Theta Facility Services",  category: "Facilities", requestor: "Hans Richter",   amount: 6750.00,  status: "Approved",  orderDate: "2025-01-28" },
        { orderId: "PO-2025-0009", supplier: "Alpha Components GmbH",   category: "Equipment",  requestor: "Anna Weber",     amount: 49800.00, status: "Open",      orderDate: "2025-02-03" },
        { orderId: "PO-2025-0010", supplier: "Beta Industrial Supply",   category: "Materials",  requestor: "Ben Schulz",     amount: 15230.25, status: "Approved",  orderDate: "2025-02-06" },
        { orderId: "PO-2025-0011", supplier: "Gamma Tech Solutions",     category: "Services",   requestor: "Clara Fischer",  amount: 9400.00,  status: "Rejected",  orderDate: "2025-02-10" },
        { orderId: "PO-2025-0012", supplier: "Delta Logistics AG",       category: "Materials",  requestor: "David Müller",   amount: 7650.00,  status: "Pending",   orderDate: "2025-02-14" },
        { orderId: "PO-2025-0013", supplier: "Epsilon Materials Ltd",    category: "IT",         requestor: "Eva Braun",      amount: 18900.00, status: "Open",      orderDate: "2025-02-18" },
        { orderId: "PO-2025-0014", supplier: "Zeta Office Supplies",     category: "Equipment",  requestor: "Felix Keller",   amount: 62400.00, status: "Approved",  orderDate: "2025-02-21" },
        { orderId: "PO-2025-0015", supplier: "Eta Electronics Corp",     category: "Facilities", requestor: "Greta Hoffmann", amount: 4100.50,  status: "Pending",   orderDate: "2025-02-25" }
      ];

      this._allOrders = orders;

      const model = new JSONModel({
        allOrders:     orders,
        filteredOrders: orders,
        rowCountText:  `${orders.length} orders`
      });
      this.getView().setModel(model, "ft");
    },

    onNavBackToLaunchpad() {
      this.navBackToLaunchpad();
    },

    onRequestorLiveChange(event) {
      const query = event.getParameter("value");
      const source = event.getSource();
      // Filter suggestion items by typed text
      const items = source.getSuggestionItems();
      items.forEach((item) => {
        item.setVisible(item.getText().toLowerCase().includes(query.toLowerCase()));
      });
      source.suggest();
    },

    onFreeTextSearch(event) {
      this._pendingFreeText = event.getParameter("query");
    },

    onSortChange() {
      this._applyFiltersAndSort();
    },

    onApplyFilters() {
      this._applyFiltersAndSort();
    },

    onResetFilters() {
      this.byId("statusFilter").setSelectedKey("all");
      this.byId("supplierFilter").setValue("").setSelectedKey("");
      this.byId("categoryFilter").setSelectedKeys([]);
      this.byId("requestorFilter").setValue("");
      this.byId("dateRangeFilter").setValue("");
      this.byId("freeTextSearch").setValue("");
      this.byId("sortBySelect").setSelectedKey("orderDate");
      this._pendingFreeText = "";

      const model = this.getView().getModel("ft");
      model.setProperty("/filteredOrders", this._allOrders.slice());
      model.setProperty("/rowCountText", `${this._allOrders.length} orders`);
    },

    _applyFiltersAndSort() {
      const statusKey    = this.byId("statusFilter").getSelectedKey();
      const supplierVal  = this.byId("supplierFilter").getValue().toLowerCase();
      const categories   = this.byId("categoryFilter").getSelectedKeys();
      const requestorVal = this.byId("requestorFilter").getValue().toLowerCase();
      const freeText     = (this._pendingFreeText || this.byId("freeTextSearch").getValue()).toLowerCase();
      const sortKey      = this.byId("sortBySelect").getSelectedKey();

      const dateRange    = this.byId("dateRangeFilter");
      const dateFrom     = dateRange.getDateValue();
      const dateTo       = dateRange.getSecondDateValue();

      let filtered = this._allOrders.filter((order) => {
        if (statusKey !== "all" && order.status !== statusKey) return false;
        if (supplierVal && !order.supplier.toLowerCase().includes(supplierVal)) return false;
        if (categories.length > 0 && !categories.includes(order.category)) return false;
        if (requestorVal && !order.requestor.toLowerCase().includes(requestorVal)) return false;

        if (dateFrom || dateTo) {
          const orderDateObj = new Date(order.orderDate);
          if (dateFrom && orderDateObj < dateFrom) return false;
          if (dateTo   && orderDateObj > dateTo)   return false;
        }

        if (freeText) {
          const searchable = [order.orderId, order.supplier, order.category, order.requestor, order.status].join(" ").toLowerCase();
          if (!searchable.includes(freeText)) return false;
        }

        return true;
      });

      filtered = filtered.sort((a, b) => {
        if (sortKey === "amount")    return b.amount - a.amount;
        if (sortKey === "supplier")  return a.supplier.localeCompare(b.supplier);
        if (sortKey === "status")    return a.status.localeCompare(b.status);
        // default: orderDate descending
        return new Date(b.orderDate) - new Date(a.orderDate);
      });

      const model = this.getView().getModel("ft");
      model.setProperty("/filteredOrders", filtered);
      model.setProperty("/rowCountText", `${filtered.length} of ${this._allOrders.length} orders`);
    },

    onApproveRow(event) {
      const ctx   = event.getSource().getBindingContext("ft");
      const order = ctx.getObject();
      if (order.status === "Approved") {
        this.toast(`${order.orderId} is already approved`);
        return;
      }
      const model = this.getView().getModel("ft");
      const path  = ctx.getPath();
      model.setProperty(path + "/status", "Approved");
      this.toast(`${order.orderId} approved`);
    },

    onRejectRow(event) {
      const ctx   = event.getSource().getBindingContext("ft");
      const order = ctx.getObject();
      if (order.status === "Rejected") {
        this.toast(`${order.orderId} is already rejected`);
        return;
      }
      const model = this.getView().getModel("ft");
      const path  = ctx.getPath();
      model.setProperty(path + "/status", "Rejected");
      this.toast(`${order.orderId} rejected`);
    },

    onExportSelected() {
      const table         = this.byId("poTable");
      const selectedIndices = table.getSelectedIndices();
      if (selectedIndices.length === 0) {
        MessageBox.information("Please select at least one row to export.");
        return;
      }
      const model  = this.getView().getModel("ft");
      const orders = model.getProperty("/filteredOrders");
      const selected = selectedIndices.map((idx) => orders[idx]).filter(Boolean);
      this.toast(`Exporting ${selected.length} order(s)...`);
    },

    formatAmount(value) {
      if (value === undefined || value === null) return "";
      return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(value);
    },

    formatOrderStatusState(status) {
      const map = { "Approved": "Success", "Rejected": "Error", "Pending": "Warning", "Open": "None" };
      return map[status] || "None";
    }

  });
});
