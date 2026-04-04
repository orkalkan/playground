sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  "sap/ui/model/Sorter",
  "sap/m/MessageToast"
], (Controller, Filter, FilterOperator, Sorter, MessageToast) => {
  "use strict";

  return Controller.extend("ui5.fira.playground.controller.sections.TableControls", {

    onInit() {
      const treeModel = this.getOwnerComponent().getModel("tree");
      if (treeModel) {
        this.getView().setModel(treeModel, "tree");
      }

      const table = this.byId("tt-table");
      if (table) {
        const treeData = this.getOwnerComponent().getModel("mockdata");
        if (treeData) {
          table.setModel(treeData);
          table.bindRows({ path: "/treeData", parameters: { arrayNames: ["children"] } });
        }
      }
    },

    onTableSearch(event) {
      const query = event.getParameter("query");
      const table = this.byId("mt-table");
      const binding = table.getBinding("items");
      if (query) {
        binding.filter([
          new Filter({
            filters: [
              new Filter("CustomerID", FilterOperator.Contains, query),
              new Filter("CompanyName", FilterOperator.Contains, query),
              new Filter("Country", FilterOperator.Contains, query)
            ],
            and: false
          })
        ]);
      } else {
        binding.filter([]);
      }
      this._appendLog(`MT-O-002 $filter applied: "${query}"`);
    },

    onTableSort() {
      const table = this.byId("mt-table");
      const binding = table.getBinding("items");
      binding.sort(new Sorter("CompanyName", false));
      this._appendLog("MT-O-003 $orderby: CompanyName asc");
      MessageToast.show("Sorted by Company Name");
    },

    onTableSelectionChange(event) {
      const item = event.getParameter("listItem");
      const selected = event.getParameter("selected");
      this._appendLog(`MT-E-001 selectionChange: "${item.getCells()[0].getTitle()}", selected=${selected}`);
    },

    onTableItemPress(event) {
      const item = event.getSource();
      const cells = item.getCells ? item.getCells() : [];
      const id = cells[0]?.getTitle ? cells[0].getTitle() : "";
      this._appendLog(`MT-E-002 itemPress: CustomerID="${id}"`);
    },

    onCellChange(event) {
      const value = event.getParameter("value");
      const ctx = event.getSource().getBindingContext();
      const id = ctx?.getProperty("CustomerID") ?? "?";
      this._appendLog(`MT-E-004 Input change: CustomerID="${id}" newValue="${value}"`);
    },

    onCountryChange(event) {
      const key = event.getParameter("selectedItem").getKey();
      const ctx = event.getSource().getBindingContext();
      const id = ctx?.getProperty("CustomerID") ?? "?";
      this._appendLog(`MT-E-005 Country select: CustomerID="${id}" country="${key}"`);
    },

    onStatusChange(event) {
      const key = event.getParameter("selectedItem").getKey();
      const ctx = event.getSource().getBindingContext();
      const id = ctx?.getProperty("CustomerID") ?? "?";
      this._appendLog(`MT-E-006 Status select: CustomerID="${id}" status="${key}"`);
    },

    onRevenueChange(event) {
      const value = event.getParameter("value");
      const ctx = event.getSource().getBindingContext();
      const id = ctx?.getProperty("CustomerID") ?? "?";
      this._appendLog(`MT-E-007 StepInput change: CustomerID="${id}" revenue=${value}`);
    },

    onDiscountChange(event) {
      const value = event.getParameter("value");
      const ctx = event.getSource().getBindingContext();
      const id = ctx?.getProperty("CustomerID") ?? "?";
      this._appendLog(`MT-E-008 StepInput change: CustomerID="${id}" value=${value}`);
    },

    onCellSelectChange(event) {
      const key = event.getParameter("selectedItem").getKey();
      const ctx = event.getSource().getBindingContext();
      const id = ctx?.getProperty("CustomerID") ?? "?";
      this._appendLog(`MT-E-009 Select change: CustomerID="${id}" key="${key}"`);
    },

    onTableUpdateFinished(event) {
      const total = event.getParameter("total");
      const actual = event.getParameter("actual");
      this._appendLog(`MT-E-003 updateFinished: actual=${actual}, total=${total}`);
    },

    onGridRowSelect(event) {
      const indices = event.getParameter("rowIndices");
      this._appendLog(`GT-E-001 rowSelectionChange: indices=[${indices}]`);
    },

    onGridCellClick(event) {
      const rowIndex = event.getParameter("rowIndex");
      this._appendLog(`GT-E-006 cellClick: rowIndex=${rowIndex}`);
    },

    onGridRowAction(event) {
      const row = event.getParameter("row");
      this._appendLog(`GT-E-007 rowAction Navigation: rowIndex=${row.getIndex()}`);
      MessageToast.show(`Navigate to Order #${row.getBindingContext()?.getProperty("OrderID")}`);
    },

    onTreeToggle(event) {
      const rowIndex = event.getParameter("rowIndex");
      const expanded = event.getParameter("expanded");
      this._appendLog(`TT-E-001 toggleOpenState: rowIndex=${rowIndex}, expanded=${expanded}`);
    },

    onClearLog() {
      this.byId("tbl-events-log").setValue("");
    },

    _appendLog(message) {
      const logArea = this.byId("tbl-events-log");
      if (!logArea) return;
      const timestamp = new Date().toLocaleTimeString();
      logArea.setValue(`[${timestamp}] ${message}\n${logArea.getValue()}`);
    }
  });
});
